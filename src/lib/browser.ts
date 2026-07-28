// Launches a headless Chromium instance.
//
// - On a serverless host (Netlify, Vercel, or any AWS-Lambda-based
//   platform), we use puppeteer-core + @sparticuz/chromium — a
//   Chromium binary built specifically for serverless functions
//   (small enough to fit within their deployment size limits).
// - Locally (npm run dev / npm run start on your own machine), we use
//   the full "puppeteer" package, which downloads and manages its own
//   Chromium automatically on `npm install` — no extra setup needed.
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
    const chromium = (await import("@sparticuz/chromium")).default;
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  const puppeteer = (await import("puppeteer")).default;
  return puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}
