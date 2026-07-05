import { useState, type CSSProperties, type FormEvent } from 'react';

/* Team-only invite-code generator (#/codes). Shared password → generate
   codes with metadata (who assigned, for whom), see redemption status,
   and review received registrations. */

interface InviteCode {
  code: string;
  assignedBy: string;
  assignedTo?: string;
  createdAt: string;
  redeemed?: { name: string; email: string; at: string };
}

interface Registration {
  id: string;
  code: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  role?: string;
  location?: string;
  industry?: string;
  expertise?: string;
  linkedin?: string;
  instagram?: string;
  x?: string;
  website?: string;
  publicDirectory: boolean;
}

const field: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px 14px',
  background: 'rgba(20,18,40,0.55)',
  border: '1px solid rgba(255,255,255,0.24)',
  borderRadius: 'var(--radius-house)',
  color: '#fff',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
};

const th: CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  color: 'rgba(244,241,235,0.55)',
  fontSize: '0.64rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontFamily: 'var(--font-sans)',
  borderBottom: '1px solid rgba(255,255,255,0.14)',
  whiteSpace: 'nowrap',
};

const td: CSSProperties = {
  padding: '12px',
  color: 'rgba(244,241,235,0.85)',
  fontSize: '0.85rem',
  fontFamily: 'var(--font-sans)',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  verticalAlign: 'top',
};

const btn: CSSProperties = {
  padding: '12px 22px',
  border: 'none',
  cursor: 'pointer',
  color: '#fff',
  background: 'var(--aniwa-terracotta)',
  borderRadius: 'var(--radius-house)',
  whiteSpace: 'nowrap',
};

async function api(key: string, body: Record<string, unknown>) {
  const r = await fetch('/.netlify/functions/codes', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-admin-key': key },
    body: JSON.stringify(body),
  });
  const d = await r.json();
  if (!r.ok) throw new Error((d as { error?: string }).error ?? 'Request failed');
  return d;
}

export function AdminCodesPage() {
  const [key, setKey] = useState(sessionStorage.getItem('aniwa-admin-key') ?? '');
  const [unlocked, setUnlocked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [codes, setCodes] = useState<InviteCode[]>([]);
  const [regs, setRegs] = useState<Registration[]>([]);
  const [justCreated, setJustCreated] = useState<InviteCode[]>([]);
  const [copied, setCopied] = useState('');

  const refresh = async (k: string) => {
    const d = (await api(k, { action: 'list' })) as { codes: InviteCode[]; registrations: Registration[] };
    setCodes(d.codes);
    setRegs(d.registrations);
  };

  const unlock = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg('');
    try {
      await refresh(key);
      sessionStorage.setItem('aniwa-admin-key', key);
      setUnlocked(true);
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Wrong password.');
    }
    setBusy(false);
  };

  const generate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setMsg('');
    const fd = new FormData(e.currentTarget);
    try {
      const d = (await api(key, {
        action: 'generate',
        assignedBy: fd.get('assignedBy'),
        assignedTo: fd.get('assignedTo'),
        count: Number(fd.get('count') ?? 1),
      })) as { created: InviteCode[] };
      setJustCreated(d.created);
      await refresh(key);
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed to generate.');
    }
    setBusy(false);
  };

  const copy = (text: string) => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(''), 1500);
    });
  };

  const fmt = (iso: string) => new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

  return (
    <section style={{ minHeight: '100vh', background: '#15132A', padding: '60px 24px 120px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <a href="#" onClick={() => (window.location.hash = '')} style={{ textDecoration: 'none' }}>
          <img src="/assets/aniwa-logo.webp" alt="Aniwa" width={40} height={30} style={{ height: 30, width: 'auto', filter: 'brightness(2.2)' }} />
        </a>
        <h1 className="disp" style={{ color: '#F4F1EB', fontSize: 'clamp(2rem, 4.5vw, 3rem)', margin: '26px 0 0' }}>
          Invite Codes
        </h1>

        {!unlocked ? (
          <form onSubmit={unlock} className="invite-form" style={{ display: 'flex', gap: 12, marginTop: 30, maxWidth: 440 }}>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Team password"
              aria-label="Team password"
              style={field}
            />
            <button type="submit" disabled={busy || !key} className="eye ember" style={btn}>
              {busy ? 'Checking…' : 'Enter →'}
            </button>
          </form>
        ) : (
          <>
            <form
              onSubmit={generate}
              style={{
                marginTop: 34,
                padding: '24px 26px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 'var(--radius-house)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 110px auto',
                gap: 14,
                alignItems: 'end',
              }}
              className="codes-gen-form"
            >
              <div>
                <div className="eye" style={{ color: 'var(--aniwa-gold)', fontSize: '0.6rem', marginBottom: 8 }}>
                  Assigned by (you) *
                </div>
                <input name="assignedBy" required style={field} placeholder="Your name" />
              </div>
              <div>
                <div className="eye" style={{ color: 'var(--aniwa-gold)', fontSize: '0.6rem', marginBottom: 8 }}>
                  For (guest / note)
                </div>
                <input name="assignedTo" style={field} placeholder="Who this code is for" />
              </div>
              <div>
                <div className="eye" style={{ color: 'var(--aniwa-gold)', fontSize: '0.6rem', marginBottom: 8 }}>
                  Count
                </div>
                <input name="count" type="number" min={1} max={25} defaultValue={1} style={field} />
              </div>
              <button type="submit" disabled={busy} className="eye ember" style={btn}>
                {busy ? 'Working…' : 'Generate →'}
              </button>
            </form>

            {justCreated.length > 0 && (
              <div
                style={{
                  marginTop: 18,
                  padding: '18px 22px',
                  background: 'rgba(184,148,92,0.1)',
                  border: '1px solid rgba(184,148,92,0.4)',
                  borderRadius: 'var(--radius-house)',
                }}
              >
                <div className="eye" style={{ color: 'var(--aniwa-gold)', fontSize: '0.6rem', marginBottom: 10 }}>
                  New codes — click to copy
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {justCreated.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => copy(c.code)}
                      style={{
                        ...btn,
                        background: copied === c.code ? 'var(--aniwa-gold)' : 'rgba(20,18,40,0.7)',
                        border: '1px solid rgba(184,148,92,0.5)',
                        fontFamily: 'var(--font-sans)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {copied === c.code ? 'Copied ✓' : c.code}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {msg && (
              <p className="bd" style={{ color: '#E2A184', marginTop: 16 }}>
                {msg}
              </p>
            )}

            <h2 className="disp" style={{ color: '#F4F1EB', fontSize: '1.5rem', margin: '48px 0 0' }}>
              All codes ({codes.length})
            </h2>
            <div style={{ overflowX: 'auto', marginTop: 14 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={th}>Code</th>
                    <th style={th}>Assigned by</th>
                    <th style={th}>For</th>
                    <th style={th}>Created</th>
                    <th style={th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((c) => (
                    <tr key={c.code}>
                      <td style={{ ...td, letterSpacing: '0.08em', whiteSpace: 'nowrap', cursor: 'pointer' }} onClick={() => copy(c.code)} title="Click to copy">
                        {copied === c.code ? 'Copied ✓' : c.code}
                      </td>
                      <td style={td}>{c.assignedBy}</td>
                      <td style={td}>{c.assignedTo ?? '—'}</td>
                      <td style={{ ...td, whiteSpace: 'nowrap' }}>{fmt(c.createdAt)}</td>
                      <td style={{ ...td, whiteSpace: 'nowrap' }}>
                        {c.redeemed ? (
                          <span style={{ color: 'var(--aniwa-gold)' }}>
                            Redeemed — {c.redeemed.name} · {fmt(c.redeemed.at)}
                          </span>
                        ) : (
                          <span style={{ color: '#9DBE8F' }}>Available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {codes.length === 0 && (
                    <tr>
                      <td style={td} colSpan={5}>
                        No codes yet — generate the first one above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <h2 className="disp" style={{ color: '#F4F1EB', fontSize: '1.5rem', margin: '48px 0 0' }}>
              Registrations ({regs.length})
            </h2>
            <div style={{ overflowX: 'auto', marginTop: 14 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={th}>Received</th>
                    <th style={th}>Name</th>
                    <th style={th}>Contact</th>
                    <th style={th}>Org / role</th>
                    <th style={th}>Industry</th>
                    <th style={th}>Directory</th>
                    <th style={th}>Code</th>
                  </tr>
                </thead>
                <tbody>
                  {regs.map((r) => (
                    <tr key={r.id}>
                      <td style={{ ...td, whiteSpace: 'nowrap' }}>{fmt(r.submittedAt)}</td>
                      <td style={td}>
                        {r.fullName}
                        {r.location ? <div style={{ color: 'rgba(244,241,235,0.5)', fontSize: '0.75rem' }}>{r.location}</div> : null}
                      </td>
                      <td style={td}>
                        {r.email}
                        {r.phone ? <div style={{ color: 'rgba(244,241,235,0.5)', fontSize: '0.75rem' }}>{r.phone}</div> : null}
                      </td>
                      <td style={td}>
                        {r.organization ?? '—'}
                        {r.role ? <div style={{ color: 'rgba(244,241,235,0.5)', fontSize: '0.75rem' }}>{r.role}</div> : null}
                      </td>
                      <td style={td}>{r.industry ?? '—'}</td>
                      <td style={td}>{r.publicDirectory ? 'Public' : 'Private'}</td>
                      <td style={{ ...td, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{r.code}</td>
                    </tr>
                  ))}
                  {regs.length === 0 && (
                    <tr>
                      <td style={td} colSpan={7}>
                        No registrations yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
