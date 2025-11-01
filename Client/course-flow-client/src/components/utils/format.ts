export function currency(n: number): string {
  return n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

export function maskCard(value: string): string {
  return value
    .replace(/[^\d]/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
}

export function maskExpiry(value: string): string {
  const v = value.replace(/[^\d]/g, "").slice(0, 4);
  if (v.length < 3) return v;
  return v.slice(0, 2) + "/" + v.slice(2);
}
