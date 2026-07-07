/* Invite-code + registration backend lives on Netlify (functions + Blobs),
   while the site itself may be served from Hostinger. Always call the
   functions at their absolute Netlify URL so both origins work. */
export const FN_BASE = 'https://aniwa-changemakers-summit.netlify.app/.netlify/functions';

export const fnUrl = (name: string): string => `${FN_BASE}/${name}`;
