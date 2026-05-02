// Generates 5 graphics for the 4 satellite pages in the store credit cluster.
// Output: public/blog-images/store-credit-cluster/

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUT = path.resolve(__dirname, '..', 'public', 'blog-images', 'store-credit-cluster');
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

// ---------- Graphic: What-is, page 1 (anatomy) ----------
const WHATIS_1 = `<!doctype html><html><head>${BASE_HEAD}</head><body>
<div style="width: 1200px; height: 600px; padding: 56px 64px; background: ${COLOR.cream};">
  <div style="text-align: center; margin-bottom: 36px;">
    <div class="label" style="color: ${COLOR.blushDeep}; margin-bottom: 8px;">Anatomy</div>
    <div class="serif" style="font-size: 36px; font-weight: 700; line-height: 1.2;">A balance, a customer, a checkout</div>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 60px 1fr 60px 1fr; gap: 8px; align-items: center;">
    <div style="background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-radius: 14px; padding: 24px; text-align: center;">
      <div style="font-size: 36px; margin-bottom: 8px;">🏷️</div>
      <div style="font-weight: 700; font-size: 17px; margin-bottom: 6px;">Merchant issues credit</div>
      <div style="font-size: 13px; color: ${COLOR.brownMuted}; line-height: 1.5;">Adds $25 to a specific customer record with a note</div>
    </div>
    <div style="text-align: center; color: ${COLOR.blushDeep}; font-size: 28px; font-weight: 700;">→</div>
    <div style="background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-left: 3px solid ${COLOR.blushDeep}; border-radius: 14px; padding: 24px; text-align: center;">
      <div style="font-size: 36px; margin-bottom: 8px;">👤</div>
      <div style="font-weight: 700; font-size: 17px; margin-bottom: 6px;">Customer balance</div>
      <div style="font-size: 13px; color: ${COLOR.brownMuted}; line-height: 1.5;">Visible on account page, no code, no transfer</div>
    </div>
    <div style="text-align: center; color: ${COLOR.blushDeep}; font-size: 28px; font-weight: 700;">→</div>
    <div style="background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-radius: 14px; padding: 24px; text-align: center;">
      <div style="font-size: 36px; margin-bottom: 8px;">🛒</div>
      <div style="font-weight: 700; font-size: 17px; margin-bottom: 6px;">Auto-applies at checkout</div>
      <div style="font-size: 13px; color: ${COLOR.brownMuted}; line-height: 1.5;">Discount line on the order, customer pays the remainder</div>
    </div>
  </div>
  <div style="text-align: center; margin-top: 36px; font-size: 13px; color: ${COLOR.brownMuted};">wwapps.io</div>
</div>
</body></html>`;

// ---------- Graphic: What-is, page 2 (customer view) ----------
const WHATIS_2 = `<!doctype html><html><head>${BASE_HEAD}</head><body>
<div style="width: 1200px; height: 580px; padding: 56px 64px; background: ${COLOR.cream};">
  <div style="text-align: center; margin-bottom: 32px;">
    <div class="label" style="color: ${COLOR.blushDeep}; margin-bottom: 8px;">What the customer sees</div>
    <div class="serif" style="font-size: 34px; font-weight: 700; line-height: 1.2;">A balance card on their account, a discount line at checkout</div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <!-- Account widget -->
    <div style="background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-radius: 14px; padding: 24px;">
      <div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 14px;">Account page</div>
      <div style="display: flex; gap: 14px; align-items: center; padding-bottom: 12px; border-bottom: 1px solid ${COLOR.outline}; margin-bottom: 14px;">
        <div style="width: 44px; height: 44px; border-radius: 50%; background: ${COLOR.blushLight}; display: flex; align-items: center; justify-content: center; font-weight: 700; color: ${COLOR.brown};">JD</div>
        <div><div style="font-weight: 700; font-size: 15px;">Hi Jane,</div><div style="font-size: 12px; color: ${COLOR.brownMuted};">Member since 2024</div></div>
      </div>
      <div style="padding: 18px 18px; background: ${COLOR.cream2}; border-left: 3px solid ${COLOR.blushDeep}; border-radius: 8px;">
        <div class="label" style="color: ${COLOR.blushDeep}; margin-bottom: 6px;">Your store credit</div>
        <div class="serif" style="font-size: 32px; font-weight: 700; line-height: 1;">$25.00</div>
        <div style="font-size: 12px; color: ${COLOR.brownMuted}; margin-top: 6px;">Expires Apr 15, 2027</div>
        <div style="margin-top: 12px; font-size: 12px; color: ${COLOR.brownMuted};">Recent: <strong style="color: ${COLOR.brown};">+$25.00</strong> refund for order #1042</div>
      </div>
    </div>

    <!-- Checkout view -->
    <div style="background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-radius: 14px; padding: 24px;">
      <div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 14px;">Checkout</div>
      <div style="font-size: 14px;">
        <div style="display: flex; justify-content: space-between; padding: 6px 0; color: ${COLOR.brownMuted};"><span>Subtotal</span><span>$80.00</span></div>
        <div style="display: flex; justify-content: space-between; padding: 6px 0; color: ${COLOR.brownMuted};"><span>Shipping</span><span>$5.00</span></div>
        <div style="display: flex; justify-content: space-between; padding: 6px 0; color: ${COLOR.brownMuted};"><span>Tax</span><span>$7.00</span></div>
        <div style="display: flex; justify-content: space-between; padding: 10px 12px; margin: 6px 0; background: ${COLOR.cream2}; border-left: 3px solid ${COLOR.blushDeep}; border-radius: 6px; font-weight: 700; color: ${COLOR.blushDeep};"><span>Store credit applied</span><span>-$25.00</span></div>
        <div style="display: flex; justify-content: space-between; padding: 10px 0 4px; border-top: 1px solid ${COLOR.outline}; font-size: 17px; font-weight: 700;"><span>Total</span><span>$67.00</span></div>
        <div style="margin-top: 14px; padding: 10px; background: ${COLOR.blushDeep}; color: white; border-radius: 8px; text-align: center; font-weight: 600; font-size: 14px;">Pay $67.00</div>
      </div>
    </div>
  </div>

  <div style="text-align: center; margin-top: 28px; font-size: 13px; color: ${COLOR.brownMuted};">wwapps.io</div>
</div>
</body></html>`;

// ---------- Graphic: Accounting scenarios ----------
function scenarioCard(num, title, body, color) {
  return `<div style="flex: 1; background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-top: 4px solid ${color}; border-radius: 12px; padding: 22px;">
    <div style="width: 32px; height: 32px; border-radius: 50%; background: ${color}; color: white; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; margin-bottom: 12px;">${num}</div>
    <div class="serif" style="font-size: 19px; font-weight: 700; margin-bottom: 12px; line-height: 1.3;">${title}</div>
    <div style="font-size: 13px; color: ${COLOR.brownMuted}; line-height: 1.5;">${body}</div>
  </div>`;
}

const ACCOUNTING_1 = `<!doctype html><html><head>${BASE_HEAD}</head><body>
<div style="width: 1200px; height: 540px; padding: 56px 64px; background: ${COLOR.cream};">
  <div style="text-align: center; margin-bottom: 32px;">
    <div class="label" style="color: ${COLOR.blushDeep}; margin-bottom: 8px;">Three accounting scenarios</div>
    <div class="serif" style="font-size: 34px; font-weight: 700; line-height: 1.2;">How Shopify store credit shows up on your books</div>
  </div>
  <div style="display: flex; gap: 18px;">
    ${scenarioCard(1, 'Refund to credit', 'Reduces the original sale (contra-revenue). No new revenue, no new liability. Cash never moves. Simplest case.', COLOR.blushLight)}
    ${scenarioCard(2, 'Marketing credit', 'Future discount on a future sale. Most accountants leave it off the balance sheet until redeemed. Some book it as a marketing expense matched against a Store Credit Liability.', COLOR.blushDeep)}
    ${scenarioCard(3, 'Customer redeems', 'Recognize gross revenue on the new order. Reduce by the redeemed credit. Cash received is the net amount. Liability extinguished.', COLOR.success)}
  </div>
  <div style="text-align: center; margin-top: 36px; font-size: 13px; color: ${COLOR.brownMuted};">wwapps.io</div>
</div>
</body></html>`;

// ---------- Graphic: Wholesale tiers ----------
function tierRow(tier, count, perCust, total, color) {
  return `<div style="display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 16px; padding: 18px 20px; background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-left: 4px solid ${color}; border-radius: 10px; margin-bottom: 12px; align-items: center;">
    <div><div class="serif" style="font-size: 19px; font-weight: 700;">${tier}</div></div>
    <div><div style="font-size: 12px; color: ${COLOR.brownMuted}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Accounts</div><div style="font-size: 18px; font-weight: 700;">${count}</div></div>
    <div><div style="font-size: 12px; color: ${COLOR.brownMuted}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Credit per customer</div><div style="font-size: 18px; font-weight: 700;">${perCust}</div></div>
    <div><div style="font-size: 12px; color: ${COLOR.brownMuted}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Quarterly total</div><div style="font-size: 18px; font-weight: 700; color: ${color};">${total}</div></div>
  </div>`;
}

const WHOLESALE_1 = `<!doctype html><html><head>${BASE_HEAD}</head><body>
<div style="width: 1200px; height: 580px; padding: 56px 64px; background: ${COLOR.cream};">
  <div style="text-align: center; margin-bottom: 30px;">
    <div class="label" style="color: ${COLOR.blushDeep}; margin-bottom: 8px;">Quarterly wholesale credit program</div>
    <div class="serif" style="font-size: 32px; font-weight: 700; line-height: 1.2;">Tier-based credit issuance</div>
  </div>

  ${tierRow('Top tier', '8', '$1,000', '$8,000', COLOR.blushDeep)}
  ${tierRow('Mid tier', '24', '$500', '$12,000', '#c25d56')}
  ${tierRow('Standard wholesale', '64', '$100', '$6,400', COLOR.blushLight)}

  <div style="margin-top: 18px; padding: 16px 20px; background: ${COLOR.success}; color: white; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: 700; font-size: 16px;">Total quarterly credit issued</div>
    <div class="serif" style="font-size: 28px; font-weight: 700;">$26,400</div>
  </div>
  <div style="text-align: center; margin-top: 24px; font-size: 13px; color: ${COLOR.brownMuted};">wwapps.io</div>
</div>
</body></html>`;

// ---------- Graphic: Policy decisions ----------
function decisionRow(num, q, a, color) {
  return `<div style="display: grid; grid-template-columns: 28px 1.4fr 1fr; gap: 16px; padding: 14px 16px; background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-radius: 10px; margin-bottom: 8px; align-items: center;">
    <div style="width: 24px; height: 24px; border-radius: 50%; background: ${COLOR.blushDeep}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px;">${num}</div>
    <div><div style="font-size: 14px; font-weight: 700; line-height: 1.3;">${q}</div></div>
    <div><div style="font-size: 12px; color: ${color}; font-weight: 700; padding: 4px 10px; background: ${COLOR.cream2}; border-radius: 100px; display: inline-block;">${a}</div></div>
  </div>`;
}

const POLICY_1 = `<!doctype html><html><head>${BASE_HEAD}</head><body>
<div style="width: 1200px; height: 720px; padding: 56px 64px; background: ${COLOR.cream};">
  <div style="text-align: center; margin-bottom: 28px;">
    <div class="label" style="color: ${COLOR.blushDeep}; margin-bottom: 8px;">7 decisions before you publish</div>
    <div class="serif" style="font-size: 32px; font-weight: 700; line-height: 1.2;">The policy choices that shape every customer answer</div>
  </div>

  ${decisionRow(1, 'Does store credit expire?', '12 months default', COLOR.blushDeep)}
  ${decisionRow(2, 'Refund to cash on request?', 'Generally no', COLOR.blushDeep)}
  ${decisionRow(3, 'Transferable to another account?', 'No, locked to customer', COLOR.blushDeep)}
  ${decisionRow(4, 'Use restrictions on products?', 'None, applies everywhere', COLOR.success)}
  ${decisionRow(5, 'Stack with discount codes?', 'Yes by default', COLOR.success)}
  ${decisionRow(6, 'Account closure handling?', 'Balance forfeited', COLOR.blushDeep)}
  ${decisionRow(7, 'Chargeback voids credit?', 'Yes, automatic', COLOR.blushDeep)}

  <div style="text-align: center; margin-top: 24px; font-size: 13px; color: ${COLOR.brownMuted};">wwapps.io</div>
</div>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const tasks = [
    { html: WHATIS_1, file: 'whatis-1-anatomy.png', height: 600 },
    { html: WHATIS_2, file: 'whatis-2-customer-view.png', height: 580 },
    { html: ACCOUNTING_1, file: 'accounting-1-scenarios.png', height: 540 },
    { html: WHOLESALE_1, file: 'wholesale-1-tiers.png', height: 580 },
    { html: POLICY_1, file: 'policy-1-decisions.png', height: 720 },
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
