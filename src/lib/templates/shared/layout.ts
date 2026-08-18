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
    position: relative;
    min-height: 100vh;
  }
  .doc-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 2px solid ${BRAND.headerTeal};
    padding-bottom: 10px;
    margin-bottom: 18px;
  }
  .doc-header img { height: 46px; }
  .doc-header .company-info {
    text-align: right;
    color: ${BRAND.headingTeal};
    font-size: 9.5px;
    line-height: 1.6;
  }
  .doc-header .company-info strong { color: #1a1a1a; font-size: 10.5px; }
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
  .footer-band {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 34px;
    background: linear-gradient(90deg, ${BRAND.headerTeal}22, ${BRAND.headerTeal}55);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 16px;
  }
  .footer-band img { height: 26px; margin-right: 8px; }
  .footer-band span { font-size: 9px; color: ${BRAND.headingTeal}; font-weight: 700; }
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
     "clause 14.2" or "Item 4". Native <ol>/<li> markers are replaced with
     generated counters so nested lists compound correctly instead of each
     one restarting at "1."/"a." on its own. */
  .legal-doc ol { list-style: none; margin: 6px 0; padding: 0; }
  /* Reference Schedule table uses a bare <ol><li></li></ol> per row just to
     print the Item number in the left column - restore native numbering
     there since it's outside the clause-numbering scheme above. */
  .legal-doc table ol { list-style: decimal; padding-left: 14px; margin: 0; }
  .legal-doc table ol > li::before { content: none; }
  .legal-doc ol > li { position: relative; margin-bottom: 8px; }
  .legal-doc ol > li > p:first-child strong { color: ${BRAND.headingTeal}; }
  .legal-doc li > p { margin: 0 0 4px 0; }

  /* Level 1 - top-level clauses: "1." "2." ... Uses the native counter so
     start="" attributes (continuing the sequence after the plain 19.1/20.1
     paragraphs below) keep working automatically. */
  .legal-doc > ol { margin: 10px 0; }
  .legal-doc > ol > li { padding-left: 26px; margin-bottom: 10px; }
  .legal-doc > ol > li::before {
    content: counter(list-item) ".";
    position: absolute;
    left: 0;
    top: 0;
    font-weight: 700;
    color: ${BRAND.headingTeal};
  }

  /* Level 2 - sub-clauses nested one level in: "1.1." "1.2." (compound of
     parent + own position, via counters()). */
  .legal-doc li ol[type="1"] { margin: 4px 0; }
  .legal-doc li ol[type="1"] > li { padding-left: 42px; margin-bottom: 6px; }
  .legal-doc li ol[type="1"] > li::before {
    content: counters(list-item, ".") ".";
    position: absolute;
    left: 0;
    top: 0;
    font-weight: 600;
  }

  /* Level 3 - lettered sub-points: "(a)" "(b)" */
  .legal-doc ol[type="a"] { padding-left: 42px; margin: 4px 0; }
  .legal-doc ol[type="a"] > li { padding-left: 22px; margin-bottom: 5px; }
  .legal-doc ol[type="a"] > li::before {
    content: "(" counter(list-item, lower-alpha) ")";
    position: absolute;
    left: 0;
    top: 0;
  }

  /* Level 4 - roman-numeral sub-points: "(i)" "(ii)" */
  .legal-doc ol[type="i"] { padding-left: 58px; margin: 4px 0; }
  .legal-doc ol[type="i"] > li { padding-left: 26px; margin-bottom: 5px; }
  .legal-doc ol[type="i"] > li::before {
    content: "(" counter(list-item, lower-roman) ")";
    position: absolute;
    left: 0;
    top: 0;
  }

  /* Word's deeper-indented paragraphs came through pandoc as <blockquote>.
     They're indented body text, not quotations, so drop the quote-style
     left rule and just align them under their level. */
  .legal-doc blockquote { margin: 0 0 4px 0; padding: 0; border-left: none; color: inherit; }
  .legal-doc > ol > blockquote { margin: 4px 0 8px 26px; color: #333; }
  .legal-doc > ol + p, .legal-doc > ol + blockquote { margin: 4px 0 12px 42px; color: #333; }
  .legal-doc u { text-decoration: underline; color: ${BRAND.headingTeal}; }
  .commitment-doc { font-size: 10.5px; }
  .commitment-doc > p:first-child { color: ${BRAND.headingTeal}; font-size: 13px; font-weight: 700; }
  .commitment-doc table { width: 100%; border-collapse: collapse; margin-top: 10px; }
  .commitment-doc table th { border: 1px solid #999; padding: 6px 8px; text-align: left; font-weight: 700; background: #f7f7f7; width: 26%; }

  /* "COMMERCIAL CLEANING SERVICES CONTRACT" divider — always starts its own
     page (it introduces the Terms & Conditions that follow), styled as a
     deliberate title page rather than a stray trailing line. */
  .contract-divider {
    page-break-before: always;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 70vh;
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
  <div class="doc-header">
    <img src="${assets.logo}" alt="Innova Services Group" />
    <div class="company-info">
      <strong>INNOVA SERVICES GROUP</strong><br/>
      ABN 29 614 885 951<br/>
      1300 183 344<br/>
      hello@innovaservicesgroup.com.au<br/>
      www.innovaservicesgroup.com.au
    </div>
  </div>`;
}

export function docFooter(assets: { badge: string }) {
  return `
  <div class="footer-band">
    <img src="${assets.badge}" alt="" />
    <span>30 YEARS IN THE INDUSTRY</span>
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
