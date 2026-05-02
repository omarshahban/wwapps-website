// Generates 3 inline graphics for the shopify-store-credit pillar page.
// Output: public/blog-images/shopify-store-credit/{1,2,3}.png

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUT = path.resolve(__dirname, '..', 'public', 'blog-images', 'shopify-store-credit');
fs.mkdirSync(OUT, { recursive: true });

const COLOR = {
  cream: '#fff8f3',
  white: '#ffffff',
  blushDeep: '#a53630',
  blushLight: '#f2b8b5',
  brown: '#3a2e2a',
  brownMuted: '#3a2e2ab8',
  outline: '#3a2e2a1f',
  cream2: '#fffaf5',
  success: '#1f7a4a',
};

const BASE_HEAD = `
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      color: ${COLOR.brown};
      background: ${COLOR.cream};
    }
    .serif { font-family: "Iowan Old Style", Palatino, Georgia, serif; }
    .label { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; }
  </style>
`;

// Graphic 1: What is Shopify store credit (anatomy diagram)
const G1 = `<!doctype html><html><head>${BASE_HEAD}</head><body>
<div style="width: 1200px; height: 700px; padding: 56px 64px; background: ${COLOR.cream};">
  <div style="text-align: center; margin-bottom: 40px;">
    <div class="label" style="color: ${COLOR.blushDeep}; margin-bottom: 8px;">Anatomy of Shopify store credit</div>
    <div class="serif" style="font-size: 36px; font-weight: 700; line-height: 1.2;">A balance on a customer record, applied at checkout</div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 12px;">
    <!-- Customer record card -->
    <div style="background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-radius: 14px; padding: 24px;">
      <div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 14px;">Shopify customer record</div>
      <div style="display: flex; gap: 14px; align-items: center; padding-bottom: 14px; border-bottom: 1px solid ${COLOR.outline};">
        <div style="width: 50px; height: 50px; border-radius: 50%; background: ${COLOR.blushLight}; display: flex; align-items: center; justify-content: center; font-weight: 700; color: ${COLOR.brown};">JD</div>
        <div>
          <div style="font-weight: 700; font-size: 16px;">Jane Doe</div>
          <div style="font-size: 13px; color: ${COLOR.brownMuted};">jane@example.com</div>
        </div>
      </div>
      <div style="margin-top: 16px; padding: 14px 16px; background: ${COLOR.cream2}; border-left: 3px solid ${COLOR.blushDeep}; border-radius: 8px;">
        <div class="label" style="color: ${COLOR.blushDeep}; margin-bottom: 6px;">Store credit balance</div>
        <div class="serif" style="font-size: 32px; font-weight: 700;">$25.00</div>
        <div style="font-size: 12px; color: ${COLOR.brownMuted}; margin-top: 4px;">Issued 2026-04-15. Note: refund for order #1042</div>
      </div>
    </div>

    <!-- Checkout view -->
    <div style="background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-radius: 14px; padding: 24px;">
      <div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 14px;">Shopify checkout view</div>
      <div style="font-size: 14px;">
        <div style="display: flex; justify-content: space-between; padding: 8px 0; color: ${COLOR.brownMuted};">
          <span>Subtotal</span><span>$80.00</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; color: ${COLOR.brownMuted};">
          <span>Shipping</span><span>$5.00</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; color: ${COLOR.brownMuted};">
          <span>Tax</span><span>$7.00</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 12px 14px; margin: 8px 0; background: ${COLOR.cream2}; border-left: 3px solid ${COLOR.blushDeep}; border-radius: 6px; font-weight: 700; color: ${COLOR.blushDeep};">
          <span>Store credit applied</span><span>-$25.00</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 14px 0 6px; border-top: 1px solid ${COLOR.outline}; font-size: 18px; font-weight: 700;">
          <span>Total</span><span>$67.00</span>
        </div>
        <div style="margin-top: 16px; padding: 10px 14px; background: ${COLOR.blushDeep}; color: white; border-radius: 8px; text-align: center; font-weight: 600; font-size: 14px;">Pay $67.00</div>
      </div>
    </div>
  </div>

  <div style="text-align: center; margin-top: 32px; font-size: 14px; color: ${COLOR.brownMuted};">
    No code, no copy-paste. Credit applies the moment the logged-in customer reaches checkout.
  </div>
  <div style="text-align: center; margin-top: 12px; font-size: 13px; color: ${COLOR.brownMuted};">wwapps.io</div>
</div>
</body></html>`;

// Graphic 2: Checkout flow steps
function step(n, title, sub) {
  return `<div style="flex: 1; min-width: 0; background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-radius: 12px; padding: 18px 16px; text-align: center;">
    <div style="width: 36px; height: 36px; border-radius: 50%; background: ${COLOR.blushDeep}; color: white; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; margin-bottom: 12px;">${n}</div>
    <div style="font-weight: 700; font-size: 16px; margin-bottom: 6px;">${title}</div>
    <div style="font-size: 13px; color: ${COLOR.brownMuted}; line-height: 1.5;">${sub}</div>
  </div>`;
}
function arrow() {
  return `<div style="display: flex; align-items: center; padding: 0 6px; color: ${COLOR.blushDeep}; font-size: 24px; font-weight: 700;">→</div>`;
}

const G2 = `<!doctype html><html><head>${BASE_HEAD}</head><body>
<div style="width: 1200px; height: 540px; padding: 56px 64px; background: ${COLOR.cream};">
  <div style="text-align: center; margin-bottom: 40px;">
    <div class="label" style="color: ${COLOR.blushDeep}; margin-bottom: 8px;">Checkout flow</div>
    <div class="serif" style="font-size: 36px; font-weight: 700; line-height: 1.2;">From customer record to paid order</div>
  </div>
  <div style="display: flex; align-items: stretch;">
    ${step(1, 'Customer logs in', 'Reaches Shopify checkout, signed in to their account')}
    ${arrow()}
    ${step(2, 'Credit detected', 'Shopify reads the balance from the customer record')}
    ${arrow()}
    ${step(3, 'Auto-applied as discount', 'Credit shows as a discount line on the order summary')}
    ${arrow()}
    ${step(4, 'Customer pays remainder', 'If credit covers the order, payment total is zero')}
  </div>
  <div style="text-align: center; margin-top: 36px; font-size: 13px; color: ${COLOR.brownMuted};">wwapps.io</div>
</div>
</body></html>`;

// Graphic 3: Bulk CSV upload illustration
const G3 = `<!doctype html><html><head>${BASE_HEAD}</head><body>
<div style="width: 1200px; height: 660px; padding: 56px 64px; background: ${COLOR.cream};">
  <div style="text-align: center; margin-bottom: 36px;">
    <div class="label" style="color: ${COLOR.blushDeep}; margin-bottom: 8px;">Bulk CSV credit issuance</div>
    <div class="serif" style="font-size: 36px; font-weight: 700; line-height: 1.2;">Reward thousands of customers in one upload</div>
  </div>

  <div style="display: grid; grid-template-columns: 1.2fr 0.4fr 1fr; gap: 16px; align-items: stretch;">
    <!-- CSV table -->
    <div style="background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-radius: 12px; padding: 20px;">
      <div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 12px;">winback-q2.csv</div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="background: ${COLOR.cream2}; color: ${COLOR.brownMuted};">
            <th style="text-align: left; padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline};">email</th>
            <th style="text-align: right; padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline};">amount</th>
            <th style="text-align: left; padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline};">note</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline};">jane@example.com</td><td style="text-align: right; padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline}; font-weight: 700;">$25</td><td style="padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline}; color: ${COLOR.brownMuted};">Q2 win-back</td></tr>
          <tr><td style="padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline};">marcus@example.com</td><td style="text-align: right; padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline}; font-weight: 700;">$25</td><td style="padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline}; color: ${COLOR.brownMuted};">Q2 win-back</td></tr>
          <tr><td style="padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline};">priya@example.com</td><td style="text-align: right; padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline}; font-weight: 700;">$50</td><td style="padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline}; color: ${COLOR.brownMuted};">VIP, 5+ orders</td></tr>
          <tr><td style="padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline};">alex@example.com</td><td style="text-align: right; padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline}; font-weight: 700;">$25</td><td style="padding: 8px 10px; border-bottom: 1px solid ${COLOR.outline}; color: ${COLOR.brownMuted};">Q2 win-back</td></tr>
          <tr><td style="padding: 8px 10px; color: ${COLOR.brownMuted};">+ 1,247 more rows</td><td></td><td></td></tr>
        </tbody>
      </table>
    </div>

    <!-- Arrow + label -->
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
      <div style="font-size: 36px; color: ${COLOR.blushDeep}; font-weight: 700;">→</div>
      <div class="label" style="color: ${COLOR.blushDeep}; text-align: center;">Upload</div>
    </div>

    <!-- Result panel -->
    <div style="background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-left: 4px solid ${COLOR.success}; border-radius: 12px; padding: 24px; display: flex; flex-direction: column; justify-content: center;">
      <div class="label" style="color: ${COLOR.success}; margin-bottom: 12px;">Upload complete</div>
      <div class="serif" style="font-size: 42px; font-weight: 700; line-height: 1; color: ${COLOR.brown};">1,251</div>
      <div style="font-size: 14px; color: ${COLOR.brownMuted}; margin-top: 6px;">customers credited</div>
      <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid ${COLOR.outline};">
        <div style="display: flex; justify-content: space-between; padding: 4px 0; font-size: 13px;"><span style="color: ${COLOR.brownMuted};">Total credit issued</span><span style="font-weight: 700;">$31,275</span></div>
        <div style="display: flex; justify-content: space-between; padding: 4px 0; font-size: 13px;"><span style="color: ${COLOR.brownMuted};">Notification emails queued</span><span style="font-weight: 700;">1,251</span></div>
        <div style="display: flex; justify-content: space-between; padding: 4px 0; font-size: 13px;"><span style="color: ${COLOR.brownMuted};">Failed rows</span><span style="font-weight: 700; color: ${COLOR.success};">0</span></div>
      </div>
    </div>
  </div>

  <div style="text-align: center; margin-top: 28px; font-size: 14px; color: ${COLOR.brownMuted}; max-width: 720px; margin-left: auto; margin-right: auto;">
    Build a customer segment in Shopify, export as CSV, drop it in. Every customer gets credit and an email at the same time.
  </div>
  <div style="text-align: center; margin-top: 12px; font-size: 13px; color: ${COLOR.brownMuted};">wwapps.io</div>
</div>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const tasks = [
    { html: G1, file: '1-what-is.png', height: 700 },
    { html: G2, file: '2-checkout-flow.png', height: 540 },
    { html: G3, file: '3-bulk-csv.png', height: 660 },
  ];

  for (const t of tasks) {
    await page.setViewport({ width: 1200, height: t.height, deviceScaleFactor: 2 });
    await page.setContent(t.html, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));
    const target = path.join(OUT, t.file);
    await page.screenshot({ path: target, omitBackground: false });
    console.log('wrote', target);
  }

  await browser.close();
})();
