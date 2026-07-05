import { codesStore, regsStore, json, normalizeCode, type InviteCode, type Registration } from './_shared';

/* Public: POST full registration. Validates + redeems the invite code
   (single-use), stores the registration, and forwards a copy to the
   Netlify Form "registrations" so the team gets an email notification. */
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let b: Record<string, unknown>;
  try {
    b = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'Bad request' }, 400);
  }

  const str = (k: string): string => (typeof b[k] === 'string' ? (b[k] as string).trim() : '');
  const code = normalizeCode(str('code'));
  const fullName = str('fullName');
  const email = str('email');

  if (!code) return json({ error: 'Missing invite code.' }, 400);
  if (!fullName || !email) return json({ error: 'Name and email are required.' }, 400);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: 'That email address doesn’t look right.' }, 400);

  const codes = codesStore();
  const rec = (await codes.get(code, { type: 'json' })) as InviteCode | null;
  if (!rec) return json({ error: 'That invite code isn’t valid.' }, 400);
  if (rec.redeemed) return json({ error: 'That invite code has already been used.' }, 400);

  const registration: Registration = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    code,
    submittedAt: new Date().toISOString(),
    fullName,
    email,
    phone: str('phone') || undefined,
    organization: str('organization') || undefined,
    role: str('role') || undefined,
    location: str('location') || undefined,
    industry: str('industry') || undefined,
    expertise: str('expertise') || undefined,
    linkedin: str('linkedin') || undefined,
    instagram: str('instagram') || undefined,
    x: str('x') || undefined,
    website: str('website') || undefined,
    publicDirectory: b.publicDirectory === true,
  };

  await regsStore().setJSON(registration.id, registration);

  rec.redeemed = { name: fullName, email, at: registration.submittedAt };
  await codes.setJSON(code, rec);

  /* Forward to Netlify Forms for the email notification. Best-effort —
     the registration is already stored either way. */
  try {
    const site = process.env.URL;
    if (site) {
      const form = new URLSearchParams();
      form.set('form-name', 'registrations');
      form.set('invite-code', code);
      form.set('assigned-by', rec.assignedBy);
      for (const [k, v] of Object.entries(registration)) {
        if (typeof v === 'string') form.set(k, v);
      }
      form.set('publicDirectory', registration.publicDirectory ? 'yes' : 'no');
      await fetch(site + '/', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: form.toString(),
      });
    }
  } catch {
    /* non-fatal */
  }

  return json({ ok: true });
}
