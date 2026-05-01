---
title: "How store credit works at Shopify checkout (and what customers see)"
description: "What actually happens when a customer with store credit hits Shopify checkout. The mechanics, the discount line, the customer view, and the edge cases."
category: "Retention"
relatedApp: "win-win-store-credit"
publishedAt: 2026-05-01
updatedAt: 2026-05-01
readingTime: 5
---

## The short answer

When a logged-in customer with available store credit reaches Shopify checkout, the credit is applied automatically as a discount line on the order. The customer does not type a code. They see a labeled line in the order summary that reads "Store credit applied" with the dollar amount. If the credit covers the full order, the payment total is zero and Shopify processes the order without charging a card. If the credit does not cover the full order, the remainder is charged as normal.

That is the whole flow. The detail below is for merchants who want to understand how this works under the hood, what customers actually see, and how to handle the edge cases.

## Step by step from the customer side

The customer adds products to cart and clicks checkout. They sign in with their email if they are not already logged in (Shopify customer accounts are required for the credit to apply, which is why store credit only works for known customers, not guest checkouts).

Shopify checkout loads. The order summary shows the product line items, shipping, and tax as usual. The store credit shows up as a discount line right above the total. The customer sees something like:

> Subtotal: $80.00
> Shipping: $5.00
> Tax: $7.00
> Store credit applied: -$25.00
> Total: $67.00

The customer enters their card and submits the order. Shopify charges $67. The store credit is deducted from the customer's balance.

## Step by step from the merchant side

In Shopify admin, the order shows up with the store credit line preserved. You can see exactly how much credit was applied and to which customer. The Win-Win Store Credit dashboard logs the redemption with timestamp, order ID, and amount, so you have an audit trail.

If you process a partial refund on the order later, the refunded value can be returned to credit (the customer's balance is restored) or refunded to cash. You decide.

## What if the credit is more than the order

If the customer has $50 of credit and the order is $30, the app applies $30 of credit, charges $0, and leaves $20 on the customer's balance for the next order. The customer does not lose the unused credit.

## What if the credit is less than the order

If the customer has $20 of credit and the order is $80, the app applies the full $20 as a discount, the customer pays $60 with their card, and the customer's credit balance is now zero.

## What if shipping or tax pushes the total higher

The credit applies to the order subtotal first, including taxable items. Shipping is usually credit-eligible too. The exact behavior is configurable in app settings.

If you want the credit to cover product cost only and exclude shipping and tax, that is a setting. If you want it to cover everything, that is the default.

## What if the customer is not logged in

Store credit requires a signed-in customer because the balance is attached to the customer record. If a customer with credit checks out as a guest using the same email, the credit does not apply.

We recommend forcing customer accounts at checkout for any store running a credit program. Shopify lets you require accounts in the checkout settings. If you do not want to require them, at minimum add a banner at the top of checkout reminding customers to log in to use their balance.

## What if the customer has multiple discount codes

Store credit stacks with discount codes by default. If the customer has $25 of credit and applies a 10% off code, the 10% comes off the subtotal first, then the $25 of credit applies on top. You can configure the app to disable code stacking if you do not want this.

Native Shopify gift cards stack with store credit too. A customer can apply a gift card code and use store credit on the same order. This is rare in practice but it works.

## What about checkout extensibility and Functions

Win-Win Store Credit is implemented using Shopify's Functions API and discount extensibility. This means the app applies credit at checkout without modifying the checkout itself. It works on Basic, Grow, Advanced, and Plus, and it survives Shopify checkout upgrades because it uses the supported extension point rather than a hack.

For merchants on Plus with custom checkout extensions, the credit applies cleanly alongside your existing extensions. There is no conflict.

## Edge cases to know about

**Subscription orders.** If you run subscriptions on Shopify, credit applies to the next subscription charge automatically when the customer has a balance. Some subscription apps do not yet support discount stacking. Test in a staging environment if you run subscriptions.

**Draft orders.** Credit does not apply automatically to draft orders since draft orders bypass the standard checkout flow. You can manually issue a credit-funded order via draft, but the credit deduction has to be done manually.

**B2B and wholesale.** Credit applies on B2B orders the same way as retail, as long as the customer is a known logged-in B2B customer. Wholesale customers love credit programs because they are used to thinking in account balances rather than discount codes.

## What customers see on their account page

Win-Win Store Credit puts a small widget on the customer account page showing current balance, recent credit transactions, expiry dates if any are set, and a button to keep shopping. The widget is theme-aware and matches your storefront design.

## What if I uninstall the app

Balances are stored on Shopify customer metafields. The data lives inside your shop, not on a third-party database. If you uninstall and reinstall, balances are restored automatically. If you switch to a different store credit app that uses metafields, balances can usually be migrated by remapping the metafield key.

## Pricing

The free plan of Win-Win Store Credit includes the customer-facing widget and the auto-applied checkout credit. CSV bulk uploads are capped at 10 rows on free. Pro lifts that cap and is $49 per month.

[Install Win-Win Store Credit](https://apps.shopify.com/win-win-store-credit) or read [the comparison with Rise.ai](/compare/win-win-store-credit-vs-rise-ai/) if you are evaluating tools.
