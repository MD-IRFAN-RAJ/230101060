export function normalizeType(type) {
  return String(type || '').trim().toLowerCase();
}

export function clampLimit(limit, max = 10) {
  const n = Number(limit);
  if (!Number.isFinite(n) || n < 1) return max;
  return Math.min(Math.floor(n), max);
}

export function byDateDesc(a, b) {
  return new Date(b.created_at) - new Date(a.created_at);
}
