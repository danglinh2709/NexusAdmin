export function buildAssetUrl(src: string): string {
  if (!src) return src;

  const trimmed = src.trim();
  if (!trimmed) return trimmed;

  // data URL (base64) -> return origin
  if (trimmed.startsWith("data:")) return trimmed;

  // blob URL (preview) -> ...
  if (trimmed.startsWith("blob:")) return trimmed;

  // URL đầy đủ -> ...
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  // build with base asset url
  const base =
    (import.meta as any).env.VITE_ASSET_BASE_URL ||
    (import.meta as any).env.VITE_API_URL;
  if (!base) return trimmed;

  const baseNormalized = base.replace(/\/+$/, "");
  const pathNormalized = trimmed.replace(/^\/+/, "");

  return `${baseNormalized}/${pathNormalized}`;
}
