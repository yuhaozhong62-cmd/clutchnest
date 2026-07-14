"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchCategoryTabs } from "@/components/search/SearchCategoryTabs";
import { SearchEmptyState } from "@/components/search/SearchEmptyState";
import { SearchResultCard } from "@/components/search/SearchResultCard";
import { normalizeSearchQuery } from "@/lib/search/normalizeSearchQuery";
import { getSearchCategoryCounts, searchContent } from "@/lib/search/searchContent";
import { searchTypeLabels, searchTypeOrder, type SearchContentType } from "@/lib/search/types";

const validTypes = new Set<SearchContentType>(searchTypeOrder);

export function SearchPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") ?? "";
  const typeParam = searchParams.get("type") as SearchContentType | null;
  const activeType: "all" | SearchContentType = typeParam && validTypes.has(typeParam) ? typeParam : "all";
  const [input, setInput] = useState(queryParam);
  const urlSyncTimeoutRef = useRef<number | null>(null);

  useEffect(() => setInput(queryParam), [queryParam]);

  useEffect(() => {
    if (input === queryParam) return;
    if (urlSyncTimeoutRef.current) window.clearTimeout(urlSyncTimeoutRef.current);
    urlSyncTimeoutRef.current = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const normalized = input.trim();
      if (normalized) params.set("q", normalized);
      else {
        params.delete("q");
        params.delete("type");
      }
      const suffix = params.toString();
      router.replace(suffix ? `${pathname}?${suffix}` : pathname, { scroll: false });
    }, 160);
    return () => {
      if (urlSyncTimeoutRef.current) window.clearTimeout(urlSyncTimeoutRef.current);
    };
  }, [input, pathname, queryParam, router, searchParams]);

  const searchState = useMemo(() => {
    try {
      return { results: searchContent(queryParam), error: false };
    } catch (error) {
      if (process.env.NODE_ENV !== "production") console.error("Global search failed", error);
      return { results: [], error: true };
    }
  }, [queryParam]);
  const allResults = searchState.results;
  const counts = useMemo(() => getSearchCategoryCounts(allResults), [allResults]);
  const visibleResults = activeType === "all" ? allResults : allResults.filter((result) => result.item.type === activeType);
  const groups = activeType === "all"
    ? searchTypeOrder.map((type) => ({ type, results: visibleResults.filter((result) => result.item.type === type) })).filter((group) => group.results.length)
    : [{ type: activeType, results: visibleResults }];

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (urlSyncTimeoutRef.current) window.clearTimeout(urlSyncTimeoutRef.current);
    const params = new URLSearchParams(searchParams.toString());
    const normalized = input.trim();
    if (normalized) params.set("q", normalized);
    else params.delete("q");
    router.push(params.toString() ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }

  function changeType(type: "all" | SearchContentType) {
    const params = new URLSearchParams(searchParams.toString());
    if (type === "all") params.delete("type");
    else params.set("type", type);
    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }

  return (
    <div className="mt-10">
      <form onSubmit={submitSearch} role="search" className="border-y border-white/10 py-5">
        <label htmlFor="search-page-input" className="mb-2 block text-xs text-zinc-600">搜索 ClutchNest 内容</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input id="search-page-input" type="search" value={input} onChange={(event) => setInput(event.target.value)} placeholder="例如：康康、PRX、空岛、点准星、摄像头" className="min-h-12 min-w-0 flex-1 rounded-md border border-white/15 bg-panel px-4 text-base text-white outline-none transition placeholder:text-zinc-700 focus:border-white/40 focus:ring-2 focus:ring-white/20" />
          {input ? <button type="button" aria-label="清除搜索内容" onClick={() => setInput("")} className="min-h-12 rounded-md border border-white/10 px-4 text-sm text-zinc-400 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">清除</button> : null}
          <button type="submit" className="min-h-12 rounded-md bg-white px-6 text-sm font-semibold text-black transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">搜索</button>
        </div>
      </form>

      {normalizeSearchQuery(queryParam) ? (
        <>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchCategoryTabs active={activeType} counts={counts} onChange={changeType} />
            <p className="shrink-0 text-sm text-zinc-500" aria-live="polite">共 {counts.all} 条结果</p>
          </div>

          {searchState.error ? (
            <div className="mt-8 border border-dashed border-white/15 px-5 py-12 text-center"><p className="text-white">搜索暂时无法完成。</p><button type="button" onClick={() => window.location.reload()} className="mt-4 rounded-md border border-white/15 px-4 py-2 text-sm text-zinc-300">重新尝试</button></div>
          ) : groups.length ? (
            <div className="mt-9 space-y-10">
              {groups.map((group) => (
                <section key={group.type}>
                  <div className="mb-4 flex items-center gap-3"><h2 className="text-xl font-semibold text-white">{searchTypeLabels[group.type]}</h2><span className="text-xs text-zinc-600">{group.results.length}</span></div>
                  <div className="grid gap-3 lg:grid-cols-2">{group.results.map((result) => <SearchResultCard key={result.item.id} item={result.item} query={queryParam} />)}</div>
                </section>
              ))}
            </div>
          ) : <div className="mt-8"><SearchEmptyState query={queryParam} /></div>}
        </>
      ) : (
        <div className="mt-10 border-l-2 border-valorant pl-5">
          <h2 className="text-xl font-semibold text-white">从一个明确关键词开始</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-500">可以搜索战队简称、选手 ID、英雄、地图、准星风格或具体打法名称。</p>
        </div>
      )}
    </div>
  );
}
