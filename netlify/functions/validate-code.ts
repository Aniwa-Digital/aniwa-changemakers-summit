import { codesStore, json, normalizeCode, type InviteCode } from './_shared';

/* Public: POST {code} → {valid, redeemed} (no metadata leaks). */
export default async function handler(req: Request): Promise<Response> {
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
  return json({ valid: !rec.redeemed, redeemed: !!rec.redeemed });
}
