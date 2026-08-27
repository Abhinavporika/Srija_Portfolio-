# SRIJA — Video Creator & Editor · Portfolio

A cinematic, one-page portfolio for **Srija** — dark, editorial, motion-rich, and
built around her video work. Single long-scrolling page. No categories, no filters,
no fluff — just the films and a direct line to Srija.

![Stack](https://img.shields.io/badge/React_19-Vite_7-Tailwind_v4) ![Motion](https://img.shields.io/badge/Framer_Motion-TypeScript-blue)

---

## Contents

1. [Quick start](#quick-start)
2. [Configure Srija's details](#configure-srijas-details)
3. [Add videos (Google Drive)](#add-videos-google-drive)
4. [Contact form → Google Sheets](#contact-form--google-sheets)
5. [Local development](#local-development)
6. [Production deployment](#production-deployment)
7. [Project structure](#project-structure)
8. [Design & performance notes](#design--performance-notes)
9. [Troubleshooting](#troubleshooting)

---

## Quick start

```bash
npm install
npm run dev        # → http://localhost:5173
```

Production build:

```bash
npm run build      # type-checks + outputs to dist/
npm run preview    # serve the production build locally
```

> The site works immediately with elegant "media pending" placeholders.
> Fill in real content using the two steps below.

---

## Configure Srija's details

Everything personal lives in **one file**: [`src/config/site.ts`](src/config/site.ts)

```ts
export const siteConfig = {
  name: 'Srija',
  role: 'Video Creator & Editor',
  tagline: 'Creating stories through the lens and the edit.',
  phone: 'PHONE_NUMBER',        // ← shown publicly, opens dialer on mobile
  whatsapp: 'WHATSAPP_NUMBER',  // ← international format, e.g. 919876543210
  email: 'EMAIL_ADDRESS',
  social: { instagram: '…', youtube: '…', linkedin: '…' },
  ...
}
```

Unconfigured values are simply hidden from the UI (e.g. missing social links
don't render). Media URLs accept either a **direct URL** or any public
**Google Drive link / file-id**.

---

## Add videos (Google Drive)

All films live in **[`src/data/videos.ts`](src/data/videos.ts)** — add, remove or
reorder entries freely; the layout cycles automatically through hand-picked
editorial compositions (full-bleed → offset portrait → split editorial → wide).
There are no categories and no filters by design.

```ts
{
  id: '01',
  title: 'First Light',
  description: 'One evocative sentence about the film.',
  videoUrl: 'https://drive.google.com/file/d/<FILE_ID>/view',
  thumbnailUrl: 'https://drive.google.com/file/d/<THUMB_ID>/view',
}
```

### Setting up each Drive file (once per file)

1. Upload the video / thumbnail to Google Drive.
2. Right-click → **Share → General access → Anyone with the link → Viewer**.
3. Copy the share link into `videoUrl` / `thumbnailUrl`.

That's it. The app converts Drive links automatically:

| You paste | Site uses |
|---|---|
| Share link (`…/file/d/ID/view`) | Streamable download endpoint |
| Bare file ID (`1AbC…`) | Same |
| Any direct URL (`https://…mp4`, `…jpg`) | Used as-is |

Thumbnails use Drive's server-side image endpoint (works even for video files —
Drive generates a poster frame), are lazy-loaded, and the actual video only
downloads when a visitor presses play.

**Storage note:** large files stay in your ~5 TB Drive; nothing is committed to
the repository. See [Troubleshooting](#troubleshooting) for files > 100 MB.

The hero video is configured in the same config file
(`siteConfig.hero.videoUrl` / `posterUrl`), or via env vars — see
[`.env.example`](.env.example).

---

## Contact form → Google Sheets

Enquiries flow **Website → Apps Script Web App → your Google Sheet**.
No API keys, no service accounts, no secrets in the frontend.

### One-time setup (~5 minutes)

1. Create a new **Google Sheet** — this becomes your enquiry inbox.
2. In the sheet: **Extensions → Apps Script**, delete the default code and paste
   the contents of [`scripts/apps-script.gs`](scripts/apps-script.gs).
3. Click **Deploy → New deployment → Web app** and set:
   - *Execute as*: **Me**
   - *Who has access*: **Anyone**
4. Approve the permission prompt, then copy the web-app URL (ends in `/exec`).
5. Create your local env file and paste the URL:

   ```bash
   cp .env.example .env
   # then set:
   # VITE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/XXXX/exec
   ```

6. Test: open the `/exec` URL in a browser → you should see `{"ok":true,…}` —
   then submit the form once and watch the row appear.

Each submission records: **Timestamp, Name, Phone, Email, Project, Message,
Preferred Contact**. The script includes rate-limiting via a lock, length caps,
and a honeypot check happens client-side before anything is sent.

**Security model:** credentials live only inside your Google account (the
script runs as *you*). The browser only ever talks to the anonymous web-app URL.
Never put API keys or tokens anywhere in this frontend.

If you redeploy the script later ("Deploy → Manage deployments → Edit → New
version"), the URL stays the same.

---

## Local development

```bash
npm install
cp .env.example .env    # optional but recommended
npm run dev
```

- Hot reload via Vite; Tailwind v4 compiles through `@tailwindcss/vite`.
- Type-checking runs as part of every build (`tsc -b`).

---

## Production deployment

Any static host works — the site is a pure SPA after `npm run build`.

**Vercel**

```bash
npx vercel            # framework: Vite · build: npm run build · output: dist
```

Add `VITE_SHEETS_WEBAPP_URL` (and any media overrides) under
*Project → Settings → Environment Variables*.

**Netlify**

- Build command: `npm run build`
- Publish directory: `dist`
- Add the same environment variable under *Site settings → Environment*.

After launch, update the canonical URL / OG tags in `index.html`,
`public/robots.txt` and `public/sitemap.xml` (replace `SITE_URL_PLACEHOLDER`),
and drop a 1200×630 `og-cover.jpg` into `public/` for social previews.

---

## Project structure

```
src/
├── components/          Reusable pieces
│   ├── Navbar.tsx           sticky nav + full-screen mobile menu
│   ├── Hero.tsx             cinematic opening (configurable video)
│   ├── LoadingScreen.tsx    brief name-reveal preloader
│   ├── CustomCursor.tsx     desktop cursor: dot → PLAY/VIEW/OPEN states
│   ├── Magnetic.tsx         magnetic hover wrapper
│   ├── Reveal.tsx           word reveals, fades, line draws
│   ├── ProjectCard.tsx      editorial card layouts + parallax
│   ├── VideoLightbox.tsx    fullscreen player w/ custom controls
│   └── …
├── sections/            Page sections in scroll order
│   ├── Intro.tsx  Showcase.tsx (#work)
│   ├── Craft.tsx  About.tsx (#about)
│   └── Contact.tsx (#contact) + ContactForm.tsx
├── data/videos.ts       ← ADD / EDIT FILMS HERE
├── config/site.ts       ← EDIT SRIJA'S DETAILS HERE
├── lib/drive.ts         Google Drive URL resolution
├── hooks/               small shared hooks
└── styles/global.css    Tailwind v4 theme + cinematic flourishes
```

---

## Design & performance notes

- **Performance:** poster-first hero (video attaches after first paint),
  lazy-loaded thumbnails, videos fetched only on play, IntersectionObserver-driven
  animations, zero images/videos bundled in the repo.
- **Accessibility:** semantic landmarks, keyboard-navigable player
  (`Space` play/pause, `←/→` seek ±5s, `M` mute, `Esc` close), visible focus
  rings, labelled controls, honours `prefers-reduced-motion` throughout.
- **Mobile-first:** `svh` hero, touch-friendly CTAs, tap-to-call / WhatsApp deep
  links, no horizontal scroll, custom cursor disabled on touch devices.

---

## Troubleshooting

**Video won't play from Drive?**
Check the file is shared *Anyone with the link → Viewer*. Files **over ~100 MB**
can hit Google's virus-scan interstitial, which blocks direct streaming. Fixes:
keep showcase cuts ≤ 100 MB (1080p H.264 is ideal for the web), or point
`videoUrl` at a direct-hosted MP4 — thumbnails can still live in Drive.
For very heavy archives, services like Cloudflare Stream / Vimeo sit happily on
top of the same config (paste their direct/embed-safe URLs).

**Form says "Something went wrong"?**
Almost always a missing/mistaken `VITE_SHEETS_WEBAPP_URL` (rebuild after editing
`.env`) or the deployment's access isn't set to *Anyone*.

**Changed `.env` but nothing happened?** Restart `npm run dev` — Vite bakes env
vars in at startup/build time.
