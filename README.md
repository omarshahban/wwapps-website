# Win‑Win Apps Website

Static marketing website for **Win‑Win Apps** (Shopify apps that help merchants and customers).

## Pages

- `index.html` — Home
- `apps.html` — Apps + custom builds
- `about.html` — About
- `contact.html` — Contact (mailto-based form by default)
- `privacy.html` — Privacy policy (starter template)
- `404.html` — Not found

## Customize the essentials

Production domain is set to **`wwapps.io`**.

If you have App Store listings, replace the placeholder cards in `apps.html` with real app names and links.

## Run locally

Any static server works. Two easy options:

### Python

```bash
cd /Users/omarshahban/winwin/winwin-website
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

### Node (if you already have it)

```bash
npx --yes serve .
```

## Deploy

This site is “just files”, so you can deploy via:

- **Netlify**: drag-and-drop the folder or connect your repo
- **Vercel**: deploy as static assets
- **GitHub Pages**: publish the repository

## Contact form (optional backend)

`contact.html` is set up for **Netlify Forms** (recommended). This allows messages to be sent to your inbox **without**
publishing your email address on the website.

### Enable email notifications (Netlify)

1. Deploy the site on Netlify
2. In Netlify: **Site configuration → Forms → Form notifications**
3. Add an email notification to your preferred inbox (e.g., `omar@wwapps.io`)

## Assets

- App icons/logos live under `assets/`


