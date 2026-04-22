import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'src', 'content', 'listicles');

const urlMap = {
  "Win-Win Product Badges": "https://apps.shopify.com/win-win-product-badges",
  "Product Badges by Win-Win Apps": "https://apps.shopify.com/win-win-product-badges",
  "Bulk Store Credit by Win-Win Apps": "https://apps.shopify.com/win-win-store-credit",
  "Win-Win Store Credit": "https://apps.shopify.com/win-win-store-credit",
  "Arrively by Win-Win Apps": "/apps/arrively/",
  "Made In by Win-Win Apps": "/apps/made-in/",
  "BSS: Product Labels & Badges": "https://apps.shopify.com/product-labels-by-bss",
  "Badgify": "https://apps.shopify.com/badgify-3",
  "Country Flag & Origin Badge": "https://apps.shopify.com/countrybadge",
  "Estimated Delivery Date by Appseven": "https://apps.shopify.com/estimated-delivery-days",
  "Growave": "https://apps.shopify.com/growave",
  "Hurrify Countdown Timer": "https://apps.shopify.com/hurrify-countdown-timer",
  "Order Deadline": "https://apps.shopify.com/order-deadline-2",
  "Origin Country Labels": "https://apps.shopify.com/countrybadge",
  "Product Labels & Badges Pro": "https://apps.shopify.com/product-labels-badges-pro-1",
  "Product Origin Labels": "https://apps.shopify.com/product-badges-label-design",
  "Rise.ai": "https://apps.shopify.com/gift-card-loyalty-program",
  "Sales Pop Master": "https://apps.shopify.com/sales-pop-master",
  "Shipping Timeline": "https://apps.shopify.com/delivery-timer-order-timeline",
  "Shop Delivery Date & Time": "https://apps.shopify.com/order-delivery-date-time",
  "Smile.io": "https://apps.shopify.com/smile-io",
  "Urgency Pack": "https://apps.shopify.com/urgency-pack-ultimate",
};

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
let edits = 0;

function flushEntry(entry, outLines) {
  if (entry.lines.length === 0) return;
  // If entry has no url and we know a URL, append one
  const hasUrl = entry.lines.some(l => /^\s*url:/.test(l));
  if (!hasUrl && entry.name && urlMap[entry.name]) {
    entry.lines.push(`    url: "${urlMap[entry.name]}"`);
    edits++;
  }
  for (const l of entry.lines) outLines.push(l);
}

for (const file of files) {
  const full = path.join(dir, file);
  const content = fs.readFileSync(full, 'utf8');
  const lines = content.split('\n');
  const out = [];

  let inEntries = false;
  let entry = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!inEntries) {
      out.push(line);
      if (/^entries:/.test(line)) inEntries = true;
      continue;
    }

    // inside entries array
    const isNewEntry = /^  - rank:/.test(line);
    const isEndOfEntries = /^[a-z]/i.test(line); // any top-level key ends the list, e.g. "faqs:" or "---"
    const isFrontmatterEnd = /^---\s*$/.test(line);

    if (isNewEntry) {
      if (entry) flushEntry(entry, out);
      entry = { name: null, lines: [line] };
      continue;
    }

    if (isEndOfEntries || isFrontmatterEnd) {
      if (entry) {
        flushEntry(entry, out);
        entry = null;
      }
      inEntries = !isFrontmatterEnd; // entries done; keep inEntries false after frontmatter ends
      // actually simpler: once we see a top-level key, entries are done
      inEntries = false;
      out.push(line);
      continue;
    }

    if (entry) {
      entry.lines.push(line);
      const nameMatch = /^\s*name:\s*"([^"]+)"/.exec(line);
      if (nameMatch) entry.name = nameMatch[1];
    } else {
      out.push(line);
    }
  }

  if (entry) flushEntry(entry, out);

  const newContent = out.join('\n');
  if (newContent !== content) {
    fs.writeFileSync(full, newContent);
    console.log(`✓ updated ${file}`);
  }
}

console.log(`\nTotal edits: ${edits}`);
