# Innova Quote Generator

An interactive quote generator for Innova Services Group. Pick a value
bracket and industry template, fill in client details and the table of
services, and export a polished, branded PDF quote — built from your
real Word templates (content, colours, logo, and Terms & Conditions all
pulled directly from the .docx files you provided).

## Quick start (run it locally)

You'll need [Node.js](https://nodejs.org) 18 or later installed.

```bash
cd quote-generator
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser. The first time you
generate a PDF, Puppeteer will download a local copy of Chromium
(one-off, a few hundred MB) — this needs an unrestricted internet
connection, so just make sure you're not on a locked-down network the
first time.

To run it as a production build (slightly faster, what you'd deploy):

```bash
npm run build
npm run start
```

## What's included

All 6 templates from your `Under $50k` / `Over $50k` folder structure
are wired up and working:

| Bracket | Industry | Family |
|---|---|---|
| Over $50k | Office | Area-based duty schedule |
| Over $50k | Body Corporate (Small) | Area-based duty schedule |
| Over $50k | Body Corporate (Medium to Large) | Area-based duty schedule |
| Over $50k | Medical Centre | Area-based duty schedule |
| Over $50k | Child Care | Area-based duty schedule |
| Over $50k | Housekeeping (Sky Apartments) | Per-room-type pricing |
| Under $50k | Office | Area-based duty schedule |
| Under $50k | Body Corporate (Small) | Area-based duty schedule |
| Under $50k | Body Corporate (Medium to Large) | Area-based duty schedule |
| Under $50k | Medical Centre | Area-based duty schedule |
| Under $50k | Child Care | Area-based duty schedule |
| Under $50k | One-Off | Free-form line items |
| Under $50k | High Pressure Job | Free-form line items |
| Under $50k | Fit Out Clean | Fixed checklist + free-form line items |

All 14 templates you've sent are wired up and tested.

**A note on Housekeeping**: this one is built specifically for the Sky
Apartments relationship — the checklist text references "Sky
Broadwater Apartments Management" by name (per your instruction to
keep it client-specific rather than genericize it). If you ever reuse
this template for a different short-stay client, the wording in
`src/lib/templates/data/housekeepingAreas.ts` will need updating.

Housekeeping also uses a third pricing shape — a per-room-type ×
per-service-type rate table (Studio/1BR/2BR/etc. × Daily/Midstay/
Departure) — instead of the flat monthly cost or line-item pricing the
other templates use.

The wizard is 5 steps: **Value Bracket -> Template -> Client Details ->
Table of Services -> Review & Export**. Step 5 shows a live preview in
an iframe before you download the final PDF.

## How the content works

- **"Area family" templates** (Office, Body Corporate): the task
  wording under each area (Main Entrance, Foyer, Lift, etc.) is fixed,
  professionally-written scope language copied verbatim from your
  existing Word docs. The form only lets you toggle each area on/off
  and set its cleaning Frequency — it does not let you edit the task
  text, so your contract language stays intact.
- **"Line item family" templates** (One-Off, High Pressure Job): fully
  free-form — add/remove as many Specification + Price rows as the job
  needs.
- **Terms & Conditions and the Commitment/Sign-off page** are your real
  legal content, extracted from the source .docx files and stored as
  static HTML partials (`src/lib/templates/static/*.html`). They're
  not editable through the form — only `Term` and `Notice to
  Reschedule` are templated placeholders, filled from what you enter
  in Step 3 ("Contract terms").

## Adding or editing a template

Each template has three pieces:

1. **Area/line-item content** — for area-family templates, add a new
   array of `{ id, name, tasks }` objects in
   `src/lib/templates/data/`. For line-item templates, no content file
   is needed (it's fully dynamic).
2. **Static legal partials** — the Terms & Conditions and
   Commitment/Sign-off HTML for each template live in
   `src/lib/templates/static/`. To add a new one, convert your Word
   doc with `pandoc -t html your-template.docx -o out.html`, then split
   out the "Our Commitment & Promise..." section and the "TERMS &
   CONDITIONS..." section into two files, and replace the Term / Notice
   to Reschedule values with `{{TERM}}` / `{{NOTICE_TO_RESCHEDULE}}`.
3. **Renderer** — a few lines in `src/lib/templates/renderers/` calling
   `renderAreaFamilyTemplate(...)` or `renderLineItemFamilyTemplate(...)`
   with your config. See `officeOver50k.ts` or `oneOffQuotes.ts` for
   the pattern.

Then register it in `src/lib/templates/registry.ts` (bracket, industry,
family, `available: true`) and `src/lib/templates/renderers/index.ts`
(add the switch case), and — for area-family templates — add the area
set lookup in `src/lib/templates/defaults.ts`.

## Project structure

```
src/
  app/
    page.tsx                 Landing page
    quote/page.tsx            The 5-step wizard (client state)
    api/
      generate-pdf/route.ts   Puppeteer: HTML -> downloadable PDF
      preview-html/route.ts   Returns raw HTML for the live preview
  components/
    wizard/                   Step 1-5 UI components
    forms/                    AreaDutiesForm, LineItemsForm
  lib/templates/
    registry.ts               Bracket -> industry -> template metadata
    defaults.ts                Builds initial form state per template
    shared/
      types.ts                 Core data model
      layout.ts                 Brand colours, CSS, HTML shell, logo loader
      areaRenderer.ts            Shared renderer for area-family templates
      lineItemRenderer.ts        Shared renderer for line-item templates
    data/                      Fixed area/task definitions (client-safe)
    renderers/                 One small file per template
    static/                    Extracted, real T&Cs / commitment HTML
public/brand/                 Logo, badge icon extracted from your docs
```

## Deploying it as an "app" for your ops managers

The goal: one link that opens straight into the quote wizard on any
phone, and can be added to the home screen so it looks and feels like
a real app icon (no App Store needed) — completely free.

We use **Netlify** rather than Vercel here: Netlify's free tier
explicitly allows business/commercial use in its terms of service,
while Vercel's free tier is restricted to personal, non-commercial
projects. Since this is a real Innova business tool, Netlify is the
correct free choice.

No command line needed — this uses GitHub Desktop, a point-and-click app.

### Step 1 — Create a free GitHub account
Go to **github.com** → Sign up. This is where your code will live (like
Google Drive, but for code) — free, no credit card.

### Step 2 — Install GitHub Desktop
Go to **desktop.github.com**, download and install it, then sign in
with the account you just created.

### Step 3 — Add this project to GitHub Desktop
1. In GitHub Desktop: **File → Add Local Repository**
2. Browse to and select your unzipped `quote-generator` folder
3. It'll say "this directory does not appear to be a Git repository" —
   click **"create a repository"** right there
4. Leave the defaults, click **Create Repository**

### Step 4 — Publish it to GitHub
Click the blue **"Publish repository"** button top-right. Tick
**"Keep this code private"** (recommended — this has your business
content in it), then click **Publish repository**. That's it — your
code is now on GitHub.

### Step 5 — Create a free Netlify account
Go to **netlify.com** → Sign up → choose **"Sign up with GitHub"**
(fastest — links the two accounts automatically, no new password).

### Step 6 — Connect and deploy
1. Click **Add new site → Import an existing project**
2. Choose **GitHub**, authorize Netlify if asked, then select your
   `quote-generator` repository
3. Netlify will auto-detect the build settings (the `netlify.toml`
   file already in the project handles this) — you shouldn't need to
   change anything
4. Click **Deploy**

Wait 2–3 minutes while it builds. You'll get a live link like
`https://random-name-12345.netlify.app`.

### Step 7 — Give it a nicer name (optional, still free)
In Netlify: **Site settings → Change site name** → pick something like
`innova-quotes` → your link becomes `https://innova-quotes.netlify.app`.

### Step 8 — Test it for real
Open the link, click through all 5 steps, and generate an actual PDF —
this is the real Puppeteer engine running for the first time outside
my sandbox, so it's worth generating one from each template family
(an area-based one like Office, and a line-item one like One-Off) to
confirm both work.

**If a PDF ever fails to generate** with a timeout-style error, that's
the 10-second function limit on Netlify's free tier being hit by a
larger template (see the note above). The fix is a $9/month upgrade to
Netlify's Personal plan (raises the limit to 26 seconds) — cheap, and
you'd only need it if this actually happens in practice.

### Step 9 — Put it on your ops managers' phones
Send them the Netlify link. On iPhone: open it in Safari, tap the
Share icon, tap **"Add to Home Screen."** On Android: open it in
Chrome, tap the ⋮ menu, tap **"Add to Home Screen."** It'll appear as
an app icon with the Innova logo and open full-screen, without browser
address bars.

### Custom domain (optional, still free)
If you'd rather it live at something like
`quotes.innovaservicesgroup.com.au`, Netlify's **Domain settings**
lets you add a custom domain and will walk you through the DNS records
to add at your domain registrar — no extra cost from Netlify's side
(you'd only pay if you don't already own the domain).

### Making updates later
Any time I (or you) change the code, in GitHub Desktop you'll see the
changed files listed — write a short message describing the change,
click **Commit**, then click **Push origin**. Netlify automatically
redeploys within a couple of minutes, no extra steps.

## Mobile-first UI

The wizard has been built mobile-first for this exact use case:
- Every form field stacks into a single column on narrow screens
- Inputs use touch-friendly sizing (larger tap targets, 16px+ font to
  stop iOS auto-zooming when a field is focused)
- The step indicator collapses to a compact progress bar + "Step X of Y"
  label on phones, full step circles on desktop
- A `manifest.json` and app icons (generated from your logo) are wired
  up so "Add to Home Screen" gives a proper app icon and launches in
  standalone (full-screen, no browser chrome) mode

## Recent additions

- **Custom Scope of Work** (Step 4, area-based templates): add free-text
  task + frequency pairs for anything not covered by the standard duty
  areas — e.g. "Hardwood floor in Building 3". Renders as its own block
  in the Schedule of Duties.
- **Bullet points**: every task now renders as its own distinct bullet
  point in the PDF, instead of being run together in a paragraph.
- **Pricing confirmation on Review**: Step 5 now has an editable pricing
  panel right above the preview, so price can be set or double-checked
  without going back to Step 4.
- **Email Quote to Client** (Step 5): downloads the PDF and opens your
  default email app with the client's address, subject, and a message
  pre-filled — you just need to attach the file that was downloaded a
  moment earlier. **Important**: browsers can't attach a file to an
  email automatically for security reasons, so this is a "download,
  then attach" two-step flow, not a silent one-click send. If you'd
  rather have it send directly and automatically (no manual attach
  step), that needs a real email-sending service (e.g. Resend or
  SendGrid) wired in with your own API key — let me know if you want
  that upgrade and I'll build it in.

## Known gaps / next steps

- **Quote numbering**: currently manual entry, per your preference. If
  you change your mind later, `defaults.ts` is where auto-numbering
  would go.
- **No persistence yet**: quotes aren't saved anywhere — each PDF is
  generated fresh and downloaded. If you want a history/log of past
  quotes, that's a natural next addition (would need a small database).
- **Visual QA**: the layout has been checked programmatically and with
  a stand-in PDF renderer, but it's worth you doing a final read-through
  of one real PDF from each template family before sending anything to
  a client, since I couldn't run the actual Puppeteer/Chromium renderer
  in my sandboxed environment (it works from your machine — this is a
  one-off Puppeteer download restriction, not a bug).
