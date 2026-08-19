import {
  logoDataUri,
  badgeDataUri,
  badgeIconDataUri,
  signaturePascalDataUri,
  signatureCeliaDataUri,
} from "./brandAssets";
import { STATIC_PARTIALS } from "./staticPartials";

// Colors extracted directly from Innova's existing Word templates
// (word/theme + w:fill / w:color values in document.xml).
export const BRAND = {
  headerTeal: "#40aac4",
  accentTeal: "#08a4b4",
  headingTeal: "#006b86",
  darkSlate: "#44546a",
  greyShade: "#d9d9d9",
  white: "#ffffff",
};

export function getBrandAssets() {
  return {
    logo: logoDataUri,
    badge: badgeDataUri,
    badgeIcon: badgeIconDataUri,
    signaturePascal: signaturePascalDataUri,
    signatureCelia: signatureCeliaDataUri,
  };
}

export function signatureImageFor(rep: string, assets: { signaturePascal: string; signatureCelia: string }) {
  return rep === "Celia Dufroux" ? assets.signatureCelia : assets.signaturePascal;
}

export const sharedStyles = `
  * { box-sizing: border-box; }
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #1a1a1a;
    margin: 0;
    padding: 0;
    font-size: 11px;
    line-height: 1.5;
  }
  .page {
    padding: 28px 36px 60px 36px;
  }
  .doc-header-table { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
  .doc-header-table td {
    border: none;
    border-bottom: 2px solid ${BRAND.headerTeal};
    padding: 0 0 10px 0;
    vertical-align: top;
  }
  .doc-header-table .dh-logo { width: 50%; }
  .doc-header-table .dh-logo img { height: 46px; }
  .doc-header-table .dh-info {
    width: 50%;
    text-align: right;
    color: ${BRAND.headingTeal};
    font-size: 9.5px;
    line-height: 1.6;
  }
  .doc-header-table .dh-info strong { color: #1a1a1a; font-size: 10.5px; }
  h1.doc-title {
    text-align: center;
    font-size: 15px;
    letter-spacing: 0.5px;
    margin: 4px 0 2px 0;
    color: #1a1a1a;
  }
  h2.doc-subtitle {
    text-align: center;
    font-size: 12px;
    color: ${BRAND.headingTeal};
    margin: 0 0 16px 0;
    letter-spacing: 0.5px;
  }
  h3.section-title {
    color: ${BRAND.headingTeal};
    font-size: 12px;
    margin: 22px 0 8px 0;
  }
  table.kv-table, table.data-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 4px;
  }
  table.kv-table td {
    border: 1px solid #999;
    padding: 6px 8px;
    vertical-align: top;
  }
  table.kv-table td.k {
    font-weight: 700;
    width: 28%;
    background: #f7f7f7;
  }
  .checkmark-cell { width: 8%; text-align: center; }
  .col-narrow { width: 22%; }
  table.data-table th {
    background: ${BRAND.headerTeal};
    color: #fff;
    text-align: left;
    padding: 6px 8px;
    font-size: 10.5px;
  }
  table.data-table td {
    border: 1px solid #ccc;
    padding: 6px 8px;
    vertical-align: top;
  }
  table.area-block { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
  table.area-block .area-name {
    background: ${BRAND.headerTeal};
    color: #fff;
    font-weight: 700;
    padding: 6px 8px;
  }
  table.area-block th {
    background: #eef7f9;
    color: ${BRAND.headingTeal};
    text-align: left;
    padding: 5px 8px;
    border: 1px solid #ccc;
    font-size: 10px;
  }
  table.area-block td {
    border: 1px solid #ccc;
    padding: 5px 8px;
    font-size: 10.5px;
  }
  table.area-block td.freq { width: 18%; font-weight: 600; }
  ul.task-list { margin: 2px 0; padding-left: 16px; }
  ul.task-list li { margin-bottom: 5px; }
  ul.task-list li:last-child { margin-bottom: 0; }
  .pricing-table td.label { font-weight: 700; width: 40%; background: #f7f7f7; }
  .pricing-table td { border: 1px solid #999; padding: 8px; }
  .note { font-size: 9.5px; color: #555; margin: 6px 0; }
  /* Footer badge band — a plain table row in normal document flow rather
     than absolutely-positioned + gradient-filled. Word has no concept of
     CSS position:absolute or linear-gradient(); using those (previously)
     meant this band silently disappeared in the Word export, and may have
     contributed to the "unreadable content" corruption warning some users
     saw. A table with a solid background colour is natively understood by
     both the PDF renderer and the Word converter. */
  .footer-band-table { width: 100%; border-collapse: collapse; margin-top: 18px; }
  .footer-band-table .fb-cell {
    border: none;
    background: #dcf0f4;
    text-align: right;
    padding: 8px 16px;
  }
  .footer-band-table img { height: 22px; vertical-align: middle; margin-right: 8px; }
  .footer-band-table span { font-size: 9px; color: ${BRAND.headingTeal}; font-weight: 700; vertical-align: middle; }
  .page-break { page-break-before: always; }
  ul.tight { margin: 4px 0; padding-left: 18px; }

  /* Styling for pandoc-generated static legal/commitment partials */
  .legal-doc { font-size: 10px; line-height: 1.55; }
  .legal-doc > p:first-child { color: ${BRAND.headingTeal}; font-size: 13px; font-weight: 700; margin-top: 0; }
  .legal-doc table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 14px 0;
  }
  .legal-doc table th, .legal-doc table td {
    border: 1px solid #bbb;
    padding: 5px 7px;
    text-align: left;
    font-weight: 400;
    vertical-align: top;
    font-size: 9.5px;
  }
  .legal-doc table thead tr:first-child th { background: ${BRAND.headerTeal}; color: #fff; font-weight: 700; }
  /* Multi-level clause numbering (1 / 1.1 / (a) / (i)), matching the Word
     template's outline numbering and the in-body cross-references like
     "clause 14.2" or "Item 4".

     IMPORTANT: the actual "1." / "1.1." / "(a)" / "(i)" marker text below
     is literal text baked into the HTML (see the generated *-terms.html
     files) as the first inline word of each clause's opening paragraph —
     NOT CSS-generated content, and not laid out via flexbox. That's
     deliberate: this same HTML also gets converted to a Word document
     (via html-to-docx for the "Download Word" button), and Word has no
     concept of CSS ::before / counter() content or flexbox — it can only
     show text that's actually in the document, flowing normally. The
     numbers looked correct in the PDF but were entirely missing in Word.
     Baking them in as real inline text means both exports show the same
     correct numbering with zero special layout needed. This CSS just
     handles indent/styling. */
  .legal-doc .clause-content > p:first-child { margin-top: 0; }
  .legal-doc .clause-content > p { margin: 0 0 4px 0; }

  /* Level 1 - top-level clauses: "1." "2." ... */
  .legal-doc .clause.lvl1 { margin: 10px 0; }
  .legal-doc .clause-row-lvl1 .marker {
    font-weight: 700;
    color: ${BRAND.headingTeal};
  }
  .legal-doc .clause-row-lvl1 .clause-content > p:first-child strong { color: ${BRAND.headingTeal}; }

  /* Level 2 - sub-clauses: "1.1." "1.2." */
  .legal-doc .clause.lvl2 { margin: 4px 0 4px 26px; }
  .legal-doc .clause.lvl2 .marker { font-weight: 600; }
  .legal-doc .clause.lvl2.clause-body-only { margin-left: 26px; }

  /* Level 3 - lettered sub-points: "(a)" "(b)" */
  .legal-doc .clause.lvl3 { margin: 4px 0 4px 16px; }

  /* Level 4 - roman-numeral sub-points: "(i)" "(ii)" */
  .legal-doc .clause.lvl4 { margin: 4px 0 4px 16px; }

  /* Reference Schedule table's Item numbers are also literal text now
     (same cross-renderer reasoning as above) — just needs a little
     left-padding since it no longer has a native list marker. */
  .legal-doc table th:first-child { padding-left: 10px; }

  /* Word's deeper-indented paragraphs came through pandoc as <blockquote>.
     They're indented body text, not quotations, so drop the quote-style
     left rule. */
  .legal-doc blockquote { margin: 0 0 4px 0; padding: 0; border-left: none; color: inherit; }
  .legal-doc u { text-decoration: underline; color: ${BRAND.headingTeal}; }
  .commitment-doc { font-size: 10.5px; }
  .commitment-doc > p:first-child { color: ${BRAND.headingTeal}; font-size: 13px; font-weight: 700; }
  .commitment-doc table { width: 100%; border-collapse: collapse; margin-top: 10px; }
  .commitment-doc table th { border: 1px solid #999; padding: 6px 8px; text-align: left; font-weight: 700; background: #f7f7f7; width: 26%; }

  /* "COMMERCIAL CLEANING SERVICES CONTRACT" divider — always starts its own
     page (it introduces the Terms & Conditions that follow), styled as a
     deliberate title page rather than a stray trailing line.
     Uses padding-top instead of flex+min-height:70vh to vertically
     center — Word has no concept of flexbox or viewport units (vh), so
     the old version rendered as plain top-left text with no centering
     at all in the Word export. Padding is a plain block-level property
     both renderers understand identically. */
  .contract-divider {
    text-align: center;
    padding-top: 140px;
  }
  .contract-divider-title {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: ${BRAND.headingTeal};
    margin: 0 0 10px 0;
  }
  .contract-divider-sub {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${BRAND.darkSlate};
    margin: 0;
  }
`;

export function loadStaticPartial(
  fileName: string,
  replacements: Record<string, string> = {},
  rawReplacements: Record<string, string> = {}
): string {
  const html = STATIC_PARTIALS[fileName];
  if (html === undefined) {
    throw new Error(`Unknown static partial: ${fileName}`);
  }
  let result = html;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.split(`{{${key}}}`).join(escapeHtml(value));
  }
  for (const [key, value] of Object.entries(rawReplacements)) {
    result = result.split(`{{${key}}}`).join(value);
  }
  return result;
}

export function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function docHeader(assets: { logo: string }) {
  return `
  <table class="doc-header-table"><tr>
    <td class="dh-logo"><img src="${assets.logo}" alt="Innova Services Group" /></td>
    <td class="dh-info">
      <strong>INNOVA SERVICES GROUP</strong><br/>
      ABN 29 614 885 951<br/>
      1300 183 344<br/>
      hello@innovaservicesgroup.com.au<br/>
      www.innovaservicesgroup.com.au
    </td>
  </tr></table>`;
}

export function docFooter(assets: { badge: string }) {
  return `
  <table class="footer-band-table"><tr>
    <td class="fb-cell"><img src="${assets.badge}" alt="" /><span>30 YEARS IN THE INDUSTRY</span></td>
  </tr></table>`;
}

export function contractDividerPage(assets: { logo: string; badge: string }): string {
  return `
  <div class="page page-break">
    ${docHeader(assets)}
    <div class="contract-divider">
      <p class="contract-divider-title">COMMERCIAL CLEANING SERVICES CONTRACT</p>
      <p class="contract-divider-sub">30 Years in the Industry</p>
    </div>
    ${docFooter(assets)}
  </div>`;
}

export function wrapDocument(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<style>${sharedStyles}</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}
