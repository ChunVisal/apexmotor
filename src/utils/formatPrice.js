// src/utils/formatPrice.js
export function formatPrice(price) {
  if (typeof price !== "number") return "N/A";
  return price.toLocaleString("en-US");
}
