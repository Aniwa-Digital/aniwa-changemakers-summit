# Aniwa Changemakers Summit — Project Handoff

A complete guide to running, deploying, and maintaining the Aniwa Changemakers Summit website. Written for the team specifically Mona

---

## 0. Secrets

There is exactly **one** secret in the whole system — an admin key for the invite-code backend — and it lives in Netlify's dashboard settings, not in a file. It's covered in Section 6. Any account logins (Hostinger, Netlify, Formspree, the domain registrar) will be shared with you **separately and securely** — never in this document or over plain email.

---



## 1. What this is

Site for the **Aniwa Changemakers Summit** (October 23–25, 2026) — a private, by-invitation gathering where Indigenous wisdom keepers meet frontier-technology builders. A nonprofit initiative of Aniwa & the Huya Aniwa Foundation.

- **Live site:** [https://darkslateblue-dunlin-103060.hostingersite.com](https://darkslateblue-dunlin-103060.hostingersite.com) (temporary Hostinger address; a custom domain is pending — see Section 7)
- **Team contact on the site:** [summit@huyaaniwa.org](mailto:summit@huyaaniwa.org)

The site is a single scrolling page with heavy visual choreography (a WebGL hero, a three.js starfield/fire scene, scroll-driven animation). It has three interactive pieces: an **applications form**, a **Founders Circle nomination modal**, and a small **invite-code / registration** flow.

---



## 2. Tech stack


| Layer         | Technology                                                                      |
| ------------- | ------------------------------------------------------------------------------- |
| Build tool    | Vite 6                                                                          |
| Framework     | React 19 + TypeScript                                                           |
| Styling       | Tailwind v4 (design tokens as CSS custom properties)                            |
| 3D / graphics | three.js 0.160 + a raw WebGL2 hero shader                                       |
| Routing       | Hash router (`#/apply`, `#/codes`) — no server rewrites needed                  |
| Tests         | Vitest (covers the pure logic: choreography math, roster pools, ring placement) |
| Backend       | Netlify Functions + Netlify Blobs (invite codes & registration only)            |
| Forms         | Formspree (applications + nominations)                                          |
| Hosting       | Hostinger (static files)                                                        |


The repository is the `aniwa-summit-app` folder. A `README.md` inside it has additional architecture notes for developers.

---



## 3. Running it locally

You need Node.js (v18+ recommended). From inside `aniwa-summit-app`:

```bash
npm install
npm run dev       # local dev server at http://localhost:5180
npm run build     # type-check + production build into dist/
npm test          # run unit tests
npm run preview   # preview the production build locally
```

No environment variables are required for any of these.

---



## 4. How the site is hosted (important — this is unusual)

The setup has **two moving parts that live in different places**. Understanding this split is the single most important thing in this handoff.

### The front end lives on Hostinger

The visible website is a set of static files (HTML, JavaScript, images) served from Hostinger's `public_html` folder.

**Hostinger has NO automatic connection to the code.** There is no git integration, no CI/CD. Every change has to be **built and manually uploaded** to Hostinger. This is the key gotcha:

> **Updating the repo does NOT update the live site.** A change only goes live when the freshly built files are uploaded to Hostinger.



### The backend lives on Netlify

The invite-code and registration features run on **Netlify Functions** (serverless functions) with **Netlify Blobs** (Netlify's key-value storage) as the database. The front end calls these functions cross-origin at their absolute Netlify URL.

**Because of this, the Netlify site and account must stay alive** even though the public site is on Hostinger. Don't decommission Netlify. The Netlify site (`aniwa-changemakers-summit.netlify.app`) also still auto-deploys from the git repo on every push to `main` — that's how backend/function changes go live.

### Summary of the two deploy paths


| You changed...                                           | To make it live you...                                                                                          |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Front-end code (design, content, layout)                 | Build, then **manually upload to Hostinger** (Section 5). Optionally also push to git to keep the repo current. |
| Backend code (Netlify functions in `netlify/functions/`) | **Push to git.** Netlify auto-builds and deploys it. No Hostinger upload needed.                                |


---



## 5. Deploying front-end changes to Hostinger

1. **Build** the site: `npm run build` (output lands in `dist/`).
2. **Log in** to hPanel at hpanel.hostinger.com → open the summit site → **Dashboard** → **File manager**.
3. **Upload** the built files into `public_html`:
  - **Full deploy:** zip the contents of `dist/` (~9 MB), upload the zip, extract it on the server, and move the contents into `public_html`. Hostinger caps uploads at **10 MB** each, which is why a full deploy is zipped.
  - **Partial deploy (the usual case):** upload only the files that changed — typically `index.html` plus the changed hashed files in `assets/`. Note that Vite's chunk hashes cascade: when the main bundle changes, several other chunk files get renamed too, so compare the old and new `dist/` to catch every file that needs re-uploading. A half-old / half-new mix will break the site.
4. **When deleting old files:** Hostinger's delete dialog defaults to "Skip trash bin" — **uncheck it** so nothing is permanently lost by accident.
5. **Verify:** hard-reload the live site (Cmd/Ctrl+Shift+R) and confirm your change is actually being served. The page is client-rendered, so give it a moment to load.

There's **no propagation wait** for a Hostinger upload — once files are up and confirmed, it's live immediately. (That's different from a domain change, Section 7, which does wait.)

> Old hashed files harmlessly accumulate in `assets/` over time. A periodic cleanup is fine but not urgent.

---



## 6. The backend: invite codes & registration

This powers the `#/codes` admin page and the registration flow. It's ~220 lines of TypeScript in `aniwa-summit-app/netlify/functions/`:

- `validate-code.ts` — **public.** Checks whether an invite code is valid/unredeemed.
- `register.ts` — **public.** Records a registration against a code.
- `codes.ts` — **admin only.** Generates and lists invite codes. Protected by an admin key (see below).
- `_shared.ts` — shared helpers, types, CORS config, and the admin-key check.

Data is stored in two Netlify Blobs stores: `invite-codes` and `registrations`.

### The one secret: `ANIWA_ADMIN_KEY`

The admin endpoint is protected by an environment variable named `ANIWA_ADMIN_KEY`, set in **Netlify → Site settings → Environment variables** (not in any file). To use the admin page you send this key; the function compares it in constant time.

**When you take over the backend, set your own value** for `ANIWA_ADMIN_KEY` in Netlify's dashboard rather than reusing the existing one. The current value will not be shared in this document — if you need it during transition, it'll be handed over securely and separately.

### CORS

Because the front end (Hostinger) and backend (Netlify) are on different origins, the functions answer cross-origin requests. CORS is set to allow any origin (`*`) for `POST`/`OPTIONS` with `content-type` and `x-admin-key` headers. This is why connecting a custom domain needs **no backend change** — any origin can already talk to the functions. The public endpoints are safe to leave open; the admin endpoint is still gated by the key.

### If you ever want off Netlify entirely

Port the functions to PHP + MySQL on Hostinger and migrate the Blobs data. Low priority — the current setup works and is nearly free at this scale.

---



## 7. The custom domain

The site currently answers only at the temporary Hostinger address. To put it on the real domain (expected to be **huyaaniwa.org** — confirm before starting), you point the domain's DNS at Hostinger.

The short version:

1. In hPanel → the summit site → **Connect domain** → enter the domain. Hostinger gives you either **nameservers** (recommended) or an **A record IP**.
2. At the domain registrar (the domain is at **GoDaddy**), either switch the nameservers to Hostinger's, or set the A record (`@`) and `www` CNAME to what Hostinger specified.
3. Wait for DNS propagation (30 min – a few hours, occasionally up to 48).
4. In hPanel, confirm **SSL** is active for the domain so you get the `https://` padlock before sharing it publicly.

A full step-by-step, plain-language version lives in `GUIDE-connect-godaddy-domain-to-hostinger.md` in this folder.

Connecting the domain changes nothing on Netlify and requires no code change.

---



## 8. Forms & where submissions go

The two public forms post to different backends:


| Form                       | Where it appears | Backend                                       |
| -------------------------- | ---------------- | --------------------------------------------- |
| Applications               | `#/apply` page   | **Netlify Forms** (form name `applications`)  |
| Founders Circle nomination | open-seat modal  | Formspree "Founder Nomination" (`f/xpqgnvpw`) |


**Applications flow (Netlify → Zapier → Airtable + Brevo):**

- The `#/apply` form submits to the **Netlify Forms** `applications` form. It's registered by the hidden static `<form name="applications">` in `index.html` — leave that in place; it's what makes Netlify capture the AJAX submission.
- A **Zapier** Zap triggers on each new Netlify Forms submission and automatically:
  1. Adds a row to an **Airtable** base, and
  2. Sends a notification **email via Brevo** to the designated recipient address configured in the Zap.
- Every submission is also visible in the Netlify dashboard under **Forms → `applications`**.

**Other submissions:**

- The Founders Circle nomination form still lands in the **Formspree account** (currently on a paid plan, ~100 submissions/month, project "ANIWA"). Access will be transferred separately.
- Registration notifications from the invite-code flow are stored in Netlify Blobs (Section 6), separate from the above.

---



## 9. Accounts & services checklist

You'll need access to each of these to fully own the project. **Logins are transferred separately and securely, not in this doc.**


| Service                        | Used for                                                       | Notes                                                 |
| ------------------------------ | -------------------------------------------------------------- | ----------------------------------------------------- |
| **Git repository**             | Source of truth for the code; auto-deploys the Netlify backend | Hosted on GitHub                                      |
| **Hostinger**                  | Public site hosting (`public_html`)                            | Single plan; renews ~Aug 7, 2026 — confirm auto-renew |
| **Netlify**                    | Invite-code / registration backend (Functions + Blobs)         | Must stay live; hosts `ANIWA_ADMIN_KEY` env var       |
| **Formspree**                  | Both public form submissions                                   | Paid plan, project "ANIWA"                            |
| **Domain registrar (GoDaddy)** | The domain name (huyaaniwa.org)                                | Needed for the DNS change in Section 7                |


---



## 10. Open items / to-dos

1. **Connect the custom domain** — pending domain confirmation (Section 7).
2. **Confirm Hostinger plan auto-renews** — the Single plan renews around Aug 7, 2026.
3. **Rotate** `ANIWA_ADMIN_KEY` to your own value once you own the Netlify account.
4. **Optional cleanup:** delete the live-test form entries (named "TEST — Claude (please ignore)") in Formspree, and periodically clear stale hashed files from Hostinger's `assets/`.
5. **Content gaps in the Founders Circle** — a few members are missing LinkedIn links, and one member bio was still pending at handoff. Check with the content owner.

---



## 11. Where to look in the repo


| File / folder                                     | What's there                                         |
| ------------------------------------------------- | ---------------------------------------------------- |
| `aniwa-summit-app/README.md`                      | Developer-facing stack & architecture notes          |
| `aniwa-summit-app/src/lib/content.ts`             | All page content (text is static here)               |
| `aniwa-summit-app/src/lib/scroll-choreography.ts` | The single animation loop driving all scroll effects |
| `aniwa-summit-app/netlify/functions/`             | The backend (invite codes, registration, admin)      |
| `aniwa-summit-app/docs/`                          | Implementation plan and revision history             |
| `GUIDE-connect-godaddy-domain-to-hostinger.md`    | Full domain-connection walkthrough                   |
| `GUIDE-deploy-changes-to-hostinger.md`            | Full deploy walkthrough                              |


---

*Dante 8084436134*