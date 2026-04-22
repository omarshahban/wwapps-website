# Visual system

All visuals on wwapps.io use inline SVG plus styled divs. No raster images, no external assets (except the 4 app logos). This keeps the site fast and keeps our look consistent.

## Repeatable process for adding a visual

When a page is too text-heavy, pick one of these components and drop it in:

1. `ProductMock.astro`: one fake product card with slots for badges, pricing, and overlays. Use this to demo anything that lives on a product card (badges, store credit earnings, delivery ETA, country of origin).
2. `StorefrontRow.astro`: a row of 3 `ProductMock`s. Use for hero sections, feature demos where variety matters.
3. `StepFlow.astro`: 3 numbered steps with short copy. Use for how-to pages and "how it works" sections.
4. `StatBlock.astro`: one big number + label. Use to anchor sections where a metric helps (install time, free tier limits, etc).
5. `CompareSplit.astro`: side-by-side "with app" vs "without app" visual. Use on listicles and comparisons.

## Rules

- Keep every visual in the brand palette: cream bg, blush-deep accents, dark-brown text.
- No emoji faces. Food, product, and object emojis are fine as product stand-ins.
- Text inside visuals must be real product-like text, not lorem.
- Every visual must work at 320px wide (mobile) without horizontal scroll.
- aria-hidden="true" on purely decorative visuals.

## How to add a visual to a new page

1. Pick the component that matches the intent.
2. Import it: `import ProductMock from "../../components/visuals/ProductMock.astro"`.
3. Place it right after the hero heading, or between a heavy text section and the next.
4. Pass in real-looking props, not "Lorem ipsum".
