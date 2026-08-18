// Launches a headless Chromium instance.
//
// - On a serverless host (Netlify, Vercel, or any AWS-Lambda-based
//   platform), we use puppeteer-core + @sparticuz/chromium-min.
//   The "-min" package ships WITHOUT the ~65MB Chromium binary, which
//   matters because AWS Lambda (what Netlify Functions run on under the
//   hood) caps deployed function bundles at 50MB compressed — bundling
//   the full @sparticuz/chromium package blows past that limit and the
//   PDF function fails to deploy/run correctly (this was the cause of
//   "Download PDF" doing nothing in production).
//   Instead, chromium-min fetches the Chromium binary at cold-start from
//   an HTTPS URL. We self-host that file as a static asset in /public
//   (see public/bin/chromium-v149.0.0-pack.x64.tar) so it's served fast
//   from Netlify's own CDN rather than depending on GitHub's release
//   assets, which can be slow/unreliable for this on a cold start.
//   IMPORTANT: if you ever bump the @sparticuz/chromium-min version,
//   you must also download the matching chromium-v<version>-pack.x64.tar
//   from https://github.com/Sparticuz/chromium/releases and replace the
//   file in public/bin/, updating CHROMIUM_PACK_URL below to match.
// - Locally (npm run dev / npm run start on your own machine), we use
//   the full "puppeteer" package, which downloads and manages its own
//   Chromium automatically on `npm install` — no extra setup needed.
const CHROMIUM_PACK_FILENAME = "chromium-v149.0.0-pack.x64.tar";

function isServerlessHost() {
  return Boolean(
    process.env.NETLIFY ||
      process.env.VERCEL ||
      process.env.AWS_LAMBDA_FUNCTION_NAME
  );
}

function siteBaseUrl() {
  // Netlify sets URL to the site's primary URL, and DEPLOY_PRIME_URL to
  // the URL of the specific deploy (useful for deploy previews). Fall back
  // to DEPLOY_PRIME_URL, then a hard-coded default as a last resort.
  return (
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    "https://playful-daifuku-4c54ab.netlify.app"
  );
}

export async function launchBrowser() {
  if (isServerlessHost()) {
    const puppeteerCore = (await import("puppeteer-core")).default;
    const chromium = (await import("@sparticuz/chromium-min")).default;
    const packUrl = `${siteBaseUrl()}/bin/${CHROMIUM_PACK_FILENAME}`;
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(packUrl),
      headless: true,
    });
  }

  const puppeteer = (await import("puppeteer")).default;
  return puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}
