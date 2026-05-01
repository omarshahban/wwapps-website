---
title: "Store credit vs gift cards on Shopify: when to use which"
description: "Store credit and gift cards look similar but solve different problems. Here is the merchant guide to picking the right one for refunds, loyalty, and revenue."
publishedAt: 2026-05-01
updatedAt: 2026-05-01
author: "Win-Win Apps"
tags:
  - "store credit"
  - "gift cards"
  - "shopify retention"
  - "loyalty"
---

Most Shopify merchants use the words "store credit" and "gift card" interchangeably. They are not the same thing. Picking the wrong one can leak revenue, confuse customers, and create accounting headaches. This guide walks through the differences, the right tool for each job, and how each one shows up in your Shopify admin and on the customer side.

## The short version

Use a gift card when someone is buying value for someone else. Use store credit when you are giving value to a known customer that you already have a relationship with. That is the cleanest line.

Gift cards are products. Customers buy them, get a code, and hand the code to a recipient. The recipient redeems the code at checkout. The buyer and the recipient are different people most of the time.

Store credit is a balance attached to a specific customer record. There is no code to share. The customer logs in and the credit applies automatically at checkout. The buyer and the redeemer are the same person.

## When to use a gift card

Pick a gift card if any of these apply:

- A customer wants to buy a gift for someone else.
- You want to sell a denominated SKU (a $50 gift card, a $100 gift card) on your store.
- You are running a corporate gifting program where the buyer is a company and the recipients are employees or clients.
- You want a transferable, code-based balance the customer can hand off.
- You want the gift card to show up as a real line item in revenue when sold.

Gift cards in Shopify are first-party. The native gift card product type is available on every plan including Basic. You add a gift card product, set denominations, and the checkout handles the rest. Cards live as Shopify gift card objects with an associated code.

## When to use store credit

Pick store credit if any of these apply:

- You are issuing a refund and would rather keep the money on the store.
- You want to reward a returning customer with a balance after their third order.
- You are running a win-back campaign for lapsed customers.
- You want to offer an apology after a shipping issue without sending cash.
- You are running a wholesale or VIP program where customers earn balances over time.
- You need to migrate balances from another platform or another loyalty tool.

Store credit is customer-specific. There is no transferable code. If a customer abandons your store, the credit goes with them, not with a recipient. Customers see their balance on their account page, on a widget on the storefront, or in the email you send when their balance changes.

## Where each one lives in Shopify

Gift cards are a product type in Shopify admin. You manage them under Products and Gift cards. Customers redeem them at checkout via a code box.

Store credit is not a built-in concept on most Shopify plans. You add it via an app like Win-Win Store Credit. Balances are stored on Shopify customer metafields, which means the data lives inside your shop, not on a third-party database. The app applies the customer's available credit as a discount line at checkout when the customer is logged in.

## Accounting differences

This is where merchants get tripped up.

A gift card sale is revenue, but only when the gift card is redeemed against a product. When the card is purchased, the money sits as a liability. Shopify reports the gift card sales separately so you can reconcile them. Most accountants treat the unredeemed balance as deferred revenue.

Store credit is closer to a customer-specific discount. When you issue store credit as a refund, no new revenue is created. The original sale is reduced. When you issue store credit as a marketing gesture, it sits as a future discount on a future sale, not as revenue. Treatment varies by jurisdiction so check with your accountant.

## Which one drives more retention

This is the question we hear most often. The honest answer is that store credit drives stronger repeat purchases for known customers, while gift cards drive new customer acquisition.

Customers who get store credit after a refund return at a meaningfully higher rate than customers who got cash refunded. The credit creates a small commitment to come back. Customers who get gift cards as a present are often new to your store, which means a gift card is your acquisition tool, not a retention tool.

If your goal is repeat purchase rate, lifetime value, or churn reduction, store credit is the better lever. If your goal is reaching new audiences via existing customers, gift cards are the better lever. Most stores need both.

## Common mistakes

Issuing a gift card to refund an order. Now the customer has a code they can lose, share, or forget. The merchant has no way to know who actually used the value. Use store credit instead.

Trying to run a points loyalty program with native gift cards. Native gift cards do not support partial issuance, balance accumulation across orders, or per-customer rules. Use a store credit app or a full loyalty platform.

Treating gift card revenue as recognized revenue at the time of sale. This breaks accounting and overstates revenue. Wait until redemption.

## What we built

We built Win-Win Store Credit because most Shopify stores need a clean simple way to issue credit to specific customers, and the existing options were either bundled with full loyalty suites or priced for big brands. The app stores balances on customer metafields, applies credit automatically at checkout, supports CSV bulk issuance, and works on every Shopify plan including Starter and Basic.

If you mostly sell gift cards as products, you do not need our app. Native gift cards plus an email tool will cover that workflow.

If you need to issue credit to known customers, refund to credit instead of cash, run win-back campaigns, or migrate balances from another platform, [Win-Win Store Credit](/apps/win-win-store-credit/) is built for that exact job.

## Frequently asked

**Can I use gift cards and store credit together on the same store?** Yes. They do not conflict. Many of our customers run native Shopify gift cards as a SKU and use Win-Win Store Credit for refunds and loyalty.

**Can a customer apply a gift card and store credit on the same order?** Yes. The gift card applies as a code at checkout and the store credit applies as a discount line. Both stack on the order total.

**Do store credit balances expire?** Only if you set an expiry. Win-Win Store Credit lets you set per-credit expiration dates if you want lapsed credits to clear off your books.

**Can I refund a gift card to store credit?** Yes, you can issue store credit to the original gift card buyer for the unredeemed balance and then deactivate the gift card. We have a [step-by-step guide](/how-to/refund-shopify-order-to-store-credit/).

**Are store credit balances visible to the customer?** Yes. Win-Win Store Credit puts a widget on the customer account page showing current balance, recent transactions, and any expiry dates.

## Where to go next

Read our [head-to-head with Rise.ai](/compare/win-win-store-credit-vs-rise-ai/) if you are comparing store credit platforms. Or jump straight to [the install guide](/how-to/issue-store-credit-shopify/) if you want to get up and running on your store today.
