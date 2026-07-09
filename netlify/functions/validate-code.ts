import { codesStore, json, normalizeCode, preflight, type InviteCode } from './_shared';

/* Public: POST {code} → validity + return-visit info for redeemed codes. */
export default async function handler(req: Request): Promise<Response> {
  const pf = preflight(req);
  if (pf) return pf;
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  let body: { code?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Bad request' }, 400);
  }
  const code = normalizeCode(body.code ?? '');
  if (!code) return json({ valid: false, redeemed: false });

  const rec = (await codesStore().get(code, { type: 'json' })) as InviteCode | null;
  if (!rec) return json({ valid: false, redeemed: false });

  if (rec.redeemed?.name) {
    return json({
      valid: false,
      redeemed: true,
      registered: true,
      fullName: rec.redeemed.name,
    });
  }

  return json({ valid: !rec.redeemed, redeemed: !!rec.redeemed });
}
