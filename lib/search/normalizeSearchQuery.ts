export function normalizeSearchQuery(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/[，。！？、：：“”‘’（）【】《》]/g, " ")
    .replace(/[\-_/|·]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenizeSearchQuery(value: string) {
  const normalized = normalizeSearchQuery(value);
  return normalized ? normalized.split(" ").filter(Boolean) : [];
}
