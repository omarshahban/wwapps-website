// Generates 3 inline graphics for the store-credit-vs-gift-cards blog post.
// Output: public/blog-images/store-credit-vs-gift-cards/{1,2,3}.png
// Run with: node scripts/generate-blog-graphics-store-credit-vs-gift-cards.js

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUT = path.resolve(__dirname, '..', 'public', 'blog-images', 'store-credit-vs-gift-cards');
fs.mkdirSync(OUT, { recursive: true });

// brand
const COLOR = {
  cream: '#fff8f3',
  white: '#ffffff',
  blushDeep: '#a53630',
  blushLight: '#f2b8b5',
  brown: '#3a2e2a',
  brownMuted: '#3a2e2ab8',
  outline: '#3a2e2a1f',
  outlineFaint: '#3a2e2a0a',
  success: '#1f7a4a',
  cream2: '#fffaf5',
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

// Graphic 1: side-by-side decision matrix
const G1 = `<!doctype html><html><head>${BASE_HEAD}</head><body>
<div style="width: 1200px; height: 760px; padding: 56px 64px; background: ${COLOR.cream};">
  <div style="text-align: center; margin-bottom: 36px;">
    <div class="label" style="color: ${COLOR.blushDeep}; margin-bottom: 8px;">When to use which</div>
    <div class="serif" style="font-size: 38px; font-weight: 700; line-height: 1.2;">Gift cards vs store credit, side by side</div>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <!-- Gift cards -->
    <div style="background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-radius: 16px; padding: 32px; box-shadow: 0 4px 18px rgba(58,46,42,0.04);">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
        <div style="width: 44px; height: 44px; border-radius: 10px; background: ${COLOR.blushLight}; display: flex; align-items: center; justify-content: center; font-size: 22px;">🎁</div>
        <div class="serif" style="font-size: 26px; font-weight: 700;">Gift cards</div>
      </div>
      <div style="font-size: 16px; color: ${COLOR.brownMuted}; margin-bottom: 24px; line-height: 1.5;">A product. Buyer pays, recipient redeems with a code.</div>
      <div style="display: grid; gap: 14px; font-size: 15px;">
        <div><div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 3px;">Best for</div><div>Gifting, corporate programs, denominated SKUs</div></div>
        <div><div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 3px;">Who buys vs redeems</div><div>Different people, most of the time</div></div>
        <div><div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 3px;">How it applies</div><div>Customer pastes a code at checkout</div></div>
        <div><div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 3px;">Transferable</div><div>Yes, the code can be shared</div></div>
        <div><div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 3px;">On the books</div><div>Liability until redeemed, then revenue</div></div>
      </div>
    </div>
    <!-- Store credit -->
    <div style="background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-left: 4px solid ${COLOR.blushDeep}; border-radius: 16px; padding: 32px; box-shadow: 0 4px 18px rgba(58,46,42,0.04);">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
        <div style="width: 44px; height: 44px; border-radius: 10px; background: ${COLOR.blushDeep}; display: flex; align-items: center; justify-content: center; font-size: 22px; color: white;">$</div>
        <div class="serif" style="font-size: 26px; font-weight: 700;">Store credit</div>
      </div>
      <div style="font-size: 16px; color: ${COLOR.brownMuted}; margin-bottom: 24px; line-height: 1.5;">A balance on a customer record. No code, applies automatically.</div>
      <div style="display: grid; gap: 14px; font-size: 15px;">
        <div><div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 3px;">Best for</div><div>Refunds, win-back, VIP rewards, wholesale</div></div>
        <div><div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 3px;">Who buys vs redeems</div><div>Same person, always</div></div>
        <div><div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 3px;">How it applies</div><div>Auto-applies at checkout when logged in</div></div>
        <div><div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 3px;">Transferable</div><div>No, locked to the customer record</div></div>
        <div><div class="label" style="color: ${COLOR.brownMuted}; margin-bottom: 3px;">On the books</div><div>Future discount or reduced original sale</div></div>
      </div>
    </div>
  </div>
  <div style="text-align: center; margin-top: 32px; font-size: 13px; color: ${COLOR.brownMuted};">wwapps.io</div>
</div>
</body></html>`;

// Graphic 2: two flow diagrams stacked
function flowStep(num, title, sub, isAccent) {
  return `<div style="flex: 1; min-width: 0; background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; ${isAccent ? `border-left: 3px solid ${COLOR.blushDeep};` : ''} border-radius: 12px; padding: 18px 16px; text-align: center;">
    <div style="width: 32px; height: 32px; border-radius: 50%; background: ${isAccent ? COLOR.blushDeep : COLOR.blushLight}; color: ${isAccent ? 'white' : COLOR.brown}; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; margin-bottom: 10px;">${num}</div>
    <div style="font-weight: 700; font-size: 15px; margin-bottom: 4px;">${title}</div>
    <div style="font-size: 13px; color: ${COLOR.brownMuted}; line-height: 1.4;">${sub}</div>
  </div>`;
}
function arrow() {
  return `<div style="display: flex; align-items: center; padding: 0 8px; color: ${COLOR.blushDeep}; font-size: 22px; font-weight: 700;">→</div>`;
}

const G2 = `<!doctype html><html><head>${BASE_HEAD}</head><body>
<div style="width: 1200px; height: 700px; padding: 56px 64px; background: ${COLOR.cream};">
  <div style="text-align: center; margin-bottom: 36px;">
    <div class="label" style="color: ${COLOR.blushDeep}; margin-bottom: 8px;">Customer redemption flow</div>
    <div class="serif" style="font-size: 36px; font-weight: 700; line-height: 1.2;">One uses a code. The other does not.</div>
  </div>

  <div style="margin-bottom: 28px;">
    <div style="font-size: 14px; font-weight: 700; color: ${COLOR.brownMuted}; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Gift card flow</div>
    <div style="display: flex; align-items: stretch;">
      ${flowStep(1, 'Buyer purchases', 'Pays for a gift card on your store', false)}
      ${arrow()}
      ${flowStep(2, 'Code generated', 'Email sent to recipient with a code', false)}
      ${arrow()}
      ${flowStep(3, 'Recipient checks out', 'Pastes the code at checkout to redeem', false)}
    </div>
  </div>

  <div style="margin-top: 36px;">
    <div style="font-size: 14px; font-weight: 700; color: ${COLOR.blushDeep}; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Store credit flow</div>
    <div style="display: flex; align-items: stretch;">
      ${flowStep(1, 'Merchant issues', 'Adds credit to a known customer record', true)}
      ${arrow()}
      ${flowStep(2, 'Customer gets email', 'Notification with current balance', true)}
      ${arrow()}
      ${flowStep(3, 'Auto-applies at checkout', 'No code, applies when customer is logged in', true)}
    </div>
  </div>

  <div style="text-align: center; margin-top: 32px; font-size: 13px; color: ${COLOR.brownMuted};">wwapps.io</div>
</div>
</body></html>`;

// Graphic 3: accounting treatment
function bookCard(title, body, color) {
  return `<div style="flex: 1; background: ${COLOR.white}; border: 1px solid ${COLOR.outline}; border-top: 4px solid ${color}; border-radius: 12px; padding: 24px;">
    <div class="serif" style="font-size: 19px; font-weight: 700; margin-bottom: 12px;">${title}</div>
    <div style="font-size: 14px; color: ${COLOR.brownMuted}; line-height: 1.5;">${body}</div>
  </div>`;
}

const G3 = `<!doctype html><html><head>${BASE_HEAD}</head><body>
<div style="width: 1200px; height: 580px; padding: 56px 64px; background: ${COLOR.cream};">
  <div style="text-align: center; margin-bottom: 36px;">
    <div class="label" style="color: ${COLOR.blushDeep}; margin-bottom: 8px;">Accounting treatment</div>
    <div class="serif" style="font-size: 36px; font-weight: 700; line-height: 1.2;">Where each one shows up on your books</div>
  </div>
  <div style="display: flex; gap: 20px;">
    ${bookCard('Gift card sold', 'Sits on the books as a deferred liability. Becomes recognized revenue only when the customer redeems it for a product.', COLOR.blushLight)}
    ${bookCard('Refund to store credit', 'Reduces the value of the original sale. No new revenue, no liability. Simpler than a cash refund.', COLOR.blushDeep)}
    ${bookCard('Store credit as a gift', 'Sits as a future discount on a future sale. Treatment varies by jurisdiction so check with your accountant.', COLOR.blushDeep)}
  </div>
  <div style="text-align: center; margin-top: 36px; font-size: 13px; color: ${COLOR.brownMuted};">wwapps.io</div>
</div>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });

  const tasks = [
    { html: G1, file: '1-decision-matrix.png', height: 760 },
    { html: G2, file: '2-customer-flow.png', height: 700 },
    { html: G3, file: '3-accounting-treatment.png', height: 580 },
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
