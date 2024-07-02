const puppeteer = require("puppeteer");

const saveToPdf = async html => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true
  });

  await browser.close();
  return pdfBuffer;
};

module.exports = saveToPdf;
