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
//   an HTTPS URL. We point this at Sparticuz's own public GitHub release
//   asset rather than self-hosting the file in this repo — self-hosting
//   meant committing a ~66MB binary to git, which repeatedly broke
//   pushing via GitHub's website (25MB upload limit there) and generally
//   made every deploy more painful. Fetching from GitHub adds a little
//   latency on a cold start (first request after a while), but avoids
//   that recurring friction entirely. If cold-start latency ever becomes
//   a real problem, self-hosting the file as a Netlify Large Media / a
//   separate object-storage asset (not committed to git) would be the
//   next thing to try.
//   IMPORTANT: if you ever bump the @sparticuz/chromium-min version, this
//   URL must be updated to match (find the release at
//   https://github.com/Sparticuz/chromium/releases — use the
//   "-pack.x64.tar" asset for that version).
const CHROMIUM_PACK_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v149.0.0/chromium-v149.0.0-pack.x64.tar";

function isServerlessHost() {
  return Boolean(
    process.env.NETLIFY ||
      process.env.VERCEL ||
      process.env.AWS_LAMBDA_FUNCTION_NAME
  );
}

export async function launchBrowser() {
  if (isServerlessHost()) {
    const puppeteerCore = (await import("puppeteer-core")).default;
    const chromium = (await import("@sparticuz/chromium-min")).default;
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(CHROMIUM_PACK_URL),
      headless: true,
    });
  }

  const puppeteer = (await import("puppeteer")).default;
  return puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}
