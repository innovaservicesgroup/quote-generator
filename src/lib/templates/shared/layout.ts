import fs from "fs";
import path from "path";

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

let _cache: { logo?: string; badge?: string } = {};

function toDataUri(fileName: string): string {
  const filePath = path.join(process.cwd(), "public", "brand", fileName);
  const buf = fs.readFileSync(filePath);
  return `data:image/png;base64,${buf.toString("base64")}`;
}

export function getBrandAssets() {
  if (!_cache.logo) _cache.logo = toDataUri("logo-dark.png");
  if (!_cache.badge) _cache.badge = toDataUri("badge.png");
  return { logo: _cache.logo!, badge: _cache.badge! };
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
  .legal-doc ol { padding-left: 20px; margin: 6px 0; }
  .legal-doc ol > li { margin-bottom: 6px; }
  .legal-doc ol > li > p:first-child strong { color: ${BRAND.headingTeal}; }
  .legal-doc blockquote { margin: 4px 0 4px 14px; padding-left: 10px; border-left: 2px solid #ddd; color: #333; }
  .legal-doc u { text-decoration: underline; color: ${BRAND.headingTeal}; }
  .commitment-doc { font-size: 10.5px; }
  .commitment-doc > p:first-child { color: ${BRAND.headingTeal}; font-size: 13px; font-weight: 700; }
  .commitment-doc table { width: 100%; border-collapse: collapse; margin-top: 10px; }
  .commitment-doc table th { border: 1px solid #999; padding: 6px 8px; text-align: left; font-weight: 700; background: #f7f7f7; width: 26%; }
`;

export function loadStaticPartial(fileName: string, replacements: Record<string, string> = {}): string {
  const filePath = path.join(process.cwd(), "src", "lib", "templates", "static", fileName);
  let html = fs.readFileSync(filePath, "utf-8");
  for (const [key, value] of Object.entries(replacements)) {
    html = html.split(`{{${key}}}`).join(escapeHtml(value));
  }
  return html;
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
