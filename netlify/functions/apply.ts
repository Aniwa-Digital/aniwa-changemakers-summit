import { appsStore, json, preflight, type Application } from './_shared';

/* Public: POST open application (no invite code). Stores in the Netlify
   Blobs store "applications" and forwards a copy to the Netlify Form
   "applications" so the team can review + get notified — same pattern as
   register.ts. The SPA cannot POST to "/" for Forms because the live site
   is on Hostinger; this function runs on Netlify. */
export default async function handler(req: Request): Promise<Response> {
  const pf = preflight(req);
  if (pf) return pf;
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let b: Record<string, unknown>;
  try {
    b = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'Bad request' }, 400);
  }

  const str = (k: string): string => (typeof b[k] === 'string' ? (b[k] as string).trim() : '');
  const name = str('name');
  const email = str('email');
  const about = str('about');
  const whyJoin = str('whyJoin');
  const contribution = str('contribution');
  const donationReady = str('donationReady');

  if (!name || !email) return json({ error: 'Name and email are required.' }, 400);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: 'That email address doesn’t look right.' }, 400);
  }
  if (!about || !whyJoin || !contribution || !donationReady) {
    return json({ error: 'Please complete all required fields.' }, 400);
  }

  const application: Application = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
    name,
    email,
    linkedin: str('linkedin') || undefined,
    organization: str('organization') || undefined,
    title: str('title') || undefined,
    about,
    whyJoin,
    contribution,
    donationReady,
  };

  await appsStore().setJSON(application.id, application);

  /* Forward to Netlify Forms for dashboard + email. Best-effort —
     the application is already stored in Blobs either way. */
  try {
    const site = process.env.URL;
    if (site) {
      const form = new URLSearchParams();
      form.set('form-name', 'applications');
      for (const [k, v] of Object.entries(application)) {
        if (typeof v === 'string') form.set(k, v);
      }
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
