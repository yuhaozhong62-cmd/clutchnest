import { searchIndex } from "@/lib/search/buildSearchIndex";
import { normalizeSearchQuery, tokenizeSearchQuery } from "@/lib/search/normalizeSearchQuery";
import type { SearchContentType, SearchIndexItem, SearchResult } from "@/lib/search/types";

function normalized(values: Array<string | undefined>) {
  return values.filter(Boolean).map((value) => normalizeSearchQuery(value!));
}

function containsTerm(value: string, term: string) {
  if (/^[a-z0-9]{1,3}$/u.test(term)) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "u").test(value);
  }
  return value.includes(term);
}

function compareText(a: string, b: string) {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

function scoreTerm(item: SearchIndexItem, term: string, broadSingleHan: boolean) {
  const title = normalizeSearchQuery(item.title);
  const aliases = normalized(item.aliases);
  const tags = normalized(item.tags);

  if (title === term) return 100;
  if (aliases.includes(term)) return 90;
  if (title.startsWith(term)) return 80;
  if (tags.includes(term)) return 70;

  if (broadSingleHan) {
    if (aliases.some((value) => value.startsWith(term))) return 65;
    if (tags.some((value) => value.startsWith(term))) return 55;
    return 0;
  }

  if (containsTerm(title, term)) return 60;
  if (aliases.some((value) => containsTerm(value, term))) return 55;
  if (normalized(item.keywords).some((value) => containsTerm(value, term))) return 45;
  if (containsTerm(normalizeSearchQuery(item.subtitle ?? ""), term)) return 40;
  if (containsTerm(normalizeSearchQuery(item.description), term)) return 20;
  if (containsTerm(item.searchText, term)) return 10;
  return 0;
}

export function searchContent(
  rawQuery: string,
  options: { type?: SearchContentType; limit?: number; index?: SearchIndexItem[] } = {}
): SearchResult[] {
  const query = normalizeSearchQuery(rawQuery);
  const terms = tokenizeSearchQuery(rawQuery);
  if (!query || !terms.length) return [];
  const broadSingleHan = terms.length === 1 && /^[\u3400-\u9fff]$/u.test(terms[0]);

  const results = (options.index ?? searchIndex)
    .filter((item) => item.status === "published" && (!options.type || item.type === options.type))
    .map((item): SearchResult | null => {
      const termScores = terms.map((term) => scoreTerm(item, term, broadSingleHan));
      if (termScores.some((score) => score === 0)) return null;
      const title = normalizeSearchQuery(item.title);
      const aliases = normalized(item.aliases);
      let score = termScores.reduce<number>((total, value) => total + value, 0);
      if (title === query) score += 100;
      else if (aliases.includes(query)) score += 90;
      if (item.featured) score += 5;
      if (item.updatedAt) score += 1;
      return { item, score, matchedTerms: terms };
    })
    .filter((result): result is SearchResult => Boolean(result))
    .sort((a, b) => b.score - a.score
      || compareText(b.item.updatedAt ?? "", a.item.updatedAt ?? "")
      || compareText(a.item.title, b.item.title));

  return options.limit ? results.slice(0, options.limit) : results;
}

export function getSearchCategoryCounts(results: SearchResult[]) {
  return results.reduce((counts, result) => {
    counts.all += 1;
    counts[result.item.type] += 1;
    return counts;
  }, { all: 0, crosshair: 0, player: 0, team: 0, agent: 0, map: 0, tactic: 0 });
}
