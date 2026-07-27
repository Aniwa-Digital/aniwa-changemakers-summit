import { getStore } from '@netlify/blobs';

/* Shared helpers for the invite-code + registration functions. */

export interface Redemption {
  name: string;
  email: string;
  at: string; // ISO timestamp
}

export interface InviteCode {
  code: string;
  assignedBy: string; // team member who generated it
  assignedTo?: string; // intended recipient / note
  createdAt: string; // ISO timestamp
  redeemed?: Redemption; // set once, single-use
}

export interface Registration {
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

export interface Application {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  linkedin?: string;
  organization?: string;
  title?: string;
  about: string;
  whyJoin: string;
  contribution: string;
  donationReady: string;
}

export const codesStore = () => getStore({ name: 'invite-codes', consistency: 'strong' });
export const regsStore = () => getStore({ name: 'registrations', consistency: 'strong' });
export const appsStore = () => getStore({ name: 'applications', consistency: 'strong' });

export const normalizeCode = (raw: string): string => raw.trim().toUpperCase().replace(/\s+/g, '');

/* Unambiguous alphabet — no 0/O, 1/I/L. */
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function makeCode(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  let s = '';
  for (let i = 0; i < 6; i++) s += ALPHABET[bytes[i] % ALPHABET.length];
  return s;
}

export function isAdmin(req: Request): boolean {
  const key = process.env.ANIWA_ADMIN_KEY;
  const given = req.headers.get('x-admin-key') ?? '';
  if (!key || !given || given.length !== key.length) return false;
  let diff = 0;
  for (let i = 0; i < key.length; i++) diff |= key.charCodeAt(i) ^ given.charCodeAt(i);
  return diff === 0;
}

/* CORS: the site is also served from Hostinger (different origin), so the
   functions must answer cross-origin requests. Endpoints are safe to open:
   validate-code, register, and apply are public; codes requires x-admin-key. */
export const CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'content-type, x-admin-key',
} as const;

export const preflight = (req: Request): Response | null =>
  req.method === 'OPTIONS' ? new Response(null, { status: 204, headers: CORS_HEADERS }) : null;

export const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...CORS_HEADERS },
  });
