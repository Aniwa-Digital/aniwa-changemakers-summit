import { codesStore, regsStore, isAdmin, json, makeCode, preflight, type InviteCode, type Registration } from './_shared';

/* Team-only endpoint (x-admin-key header):
   POST {action:"generate", assignedBy, assignedTo?, count?} → new codes
   POST {action:"list"} → all codes + all registrations */
export default async function handler(req: Request): Promise<Response> {
  const pf = preflight(req);
  if (pf) return pf;
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!isAdmin(req)) return json({ error: 'Invalid team password' }, 401);

  let body: { action?: string; assignedBy?: string; assignedTo?: string; count?: number };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Bad request' }, 400);
  }

  const codes = codesStore();

  if (body.action === 'generate') {
    const assignedBy = (body.assignedBy ?? '').trim();
    if (!assignedBy) return json({ error: 'assignedBy is required' }, 400);
    const count = Math.max(1, Math.min(25, Math.floor(body.count ?? 1)));
    const created: InviteCode[] = [];
    for (let i = 0; i < count; i++) {
      const record: InviteCode = {
        code: makeCode(),
        assignedBy,
        assignedTo: (body.assignedTo ?? '').trim() || undefined,
        createdAt: new Date().toISOString(),
      };
      await codes.setJSON(record.code, record);
      created.push(record);
    }
    return json({ created });
  }

  if (body.action === 'list') {
    const out: InviteCode[] = [];
    const { blobs } = await codes.list();
    for (const b of blobs) {
      const rec = (await codes.get(b.key, { type: 'json' })) as InviteCode | null;
      if (rec) out.push(rec);
    }
    out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const regs = regsStore();
    const regsOut: Registration[] = [];
    const regList = await regs.list();
    for (const b of regList.blobs) {
      const rec = (await regs.get(b.key, { type: 'json' })) as Registration | null;
      if (rec) regsOut.push(rec);
    }
    regsOut.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));

    return json({ codes: out, registrations: regsOut });
  }

  return json({ error: 'Unknown action' }, 400);
}
