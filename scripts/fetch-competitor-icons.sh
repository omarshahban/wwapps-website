#!/bin/bash
# Fetch competitor app icons from the Shopify App Store.
# Picks the first og-style icon URL on each listing page.

set -e

OUT_DIR="public/icons/competitors"
mkdir -p "$OUT_DIR"

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"

# slug => shopify app listing path
declare -a ENTRIES=(
  "badgify|badgify-3"
  "product-labels-badges-pro|product-labels-badges-pro-1"
  "sales-pop-master|sales-pop-master"
  "growave|growave"
  "rise-ai|gift-card-loyalty-program"
  "estimated-delivery-date-appseven|estimated-delivery-days"
  "shipping-timeline|delivery-timer-order-timeline"
  "shop-delivery-date-time|order-delivery-date-time"
  "product-origin-labels|countrybadge"
  "tomecic-made-in|product-badges-label-design"
)

for entry in "${ENTRIES[@]}"; do
  slug="${entry%%|*}"
  path="${entry##*|}"
  url="https://apps.shopify.com/$path"
  echo "Fetching $slug from $url"

  icon_url=$(curl -sL -A "$UA" "$url" | grep -oE 'https://cdn\.shopify\.com/app-store/listing_images/[a-f0-9]+/icon/[A-Za-z0-9_=\-]+\.(png|jpg|jpeg)' | head -1)

  if [ -z "$icon_url" ]; then
    echo "  WARN: no icon found for $slug"
    continue
  fi

  ext="${icon_url##*.}"
  out_file="$OUT_DIR/$slug.$ext"
  echo "  -> $out_file ($icon_url)"
  curl -sL -A "$UA" "$icon_url" -o "$out_file"
done

echo "Done."
