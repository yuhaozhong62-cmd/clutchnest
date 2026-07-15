"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SearchResultCard } from "@/components/search/SearchResultCard";
import { searchIndex } from "@/lib/search/buildSearchIndex";
import { normalizeSearchQuery } from "@/lib/search/normalizeSearchQuery";
import { searchContent } from "@/lib/search/searchContent";

export function GlobalSearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const results = useMemo(() => searchContent(query, { limit: 8 }), [query]);
  const defaultItems = useMemo(() => [...searchIndex]
    .filter((item) => item.featured && item.updatedAt)
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))
    .slice(0, 6), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setSelectedIndex(0);
    window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  useEffect(() => setSelectedIndex(0), [query]);

  function navigate(href: string) {
    onClose();
    router.push(href);
  }

  function handlePanelKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === "ArrowDown" && results.length) {
      event.preventDefault();
      setSelectedIndex((current) => (current + 1) % results.length);
      return;
    }
    if (event.key === "ArrowUp" && results.length) {
      event.preventDefault();
      setSelectedIndex((current) => (current - 1 + results.length) % results.length);
      return;
    }
    if (event.key === "Enter" && results[selectedIndex]) {
      event.preventDefault();
      navigate(results[selectedIndex].item.href);
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('input, button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (!mounted || !open) return null;
  const normalizedQuery = normalizeSearchQuery(query);
  const fullSearchHref = normalizedQuery ? `/search?q=${encodeURIComponent(query.trim())}` : "/search";

  return createPortal(
    <div className="fixed inset-0 z-[70] bg-black/82 sm:p-5" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="global-search-title" onKeyDown={handlePanelKeyDown} className="flex h-[100dvh] w-full flex-col overflow-hidden bg-[#0c0d0f] sm:mx-auto sm:mt-[5vh] sm:h-[min(46rem,88vh)] sm:max-w-3xl sm:rounded-[14px] sm:border sm:border-white/15 sm:shadow-[0_24px_80px_rgba(0,0,0,.45)]">
        <header className="flex items-center gap-3 border-b border-white/10 p-4 sm:p-5">
          <div className="min-w-0 flex-1">
            <h2 id="global-search-title" className="sr-only">搜索 ClutchNest 内容</h2>
            <label htmlFor="global-search-input" className="sr-only">搜索选手、战队、准星、英雄、地图或打法</label>
            <input ref={inputRef} id="global-search-input" type="search" autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索选手、战队、准星、英雄、地图或打法" className="min-h-12 w-full rounded-md border border-white/15 bg-[#08090a] px-4 text-base text-white outline-none transition placeholder:text-zinc-600 focus:border-white/40 focus:ring-2 focus:ring-white/15" />
          </div>
          {query ? <button type="button" aria-label="清除搜索内容" onClick={() => setQuery("")} className="grid h-11 w-11 place-items-center rounded-md border border-white/10 text-sm text-zinc-500 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">清除</button> : null}
          <button type="button" aria-label="关闭全站搜索" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-md border border-white/10 text-xl text-zinc-500 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">×</button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          {normalizedQuery ? (
            <>
              <p className="mb-3 text-xs text-zinc-600" aria-live="polite">找到 {results.length} 条快速结果</p>
              {results.length ? (
                <div className="grid gap-2" role="listbox" aria-label="快速搜索结果">
                  {results.map((result, index) => <SearchResultCard key={result.item.id} item={result.item} query={query} compact selected={selectedIndex === index} onNavigate={onClose} />)}
                </div>
              ) : <p className="border border-dashed border-white/15 px-5 py-12 text-center text-sm text-zinc-500">没有找到相关内容。可以进入完整搜索页查看推荐入口。</p>}
            </>
          ) : (
            <>
              <p className="mb-3 text-xs font-semibold text-zinc-500">最近更新与精选入口</p>
              <div className="grid gap-2">
                {defaultItems.map((item) => <SearchResultCard key={item.id} item={item} query="" compact onNavigate={onClose} />)}
              </div>
            </>
          )}
        </div>

        <footer className="border-t border-white/10 p-4 sm:p-5">
          <Link href={fullSearchHref} onClick={onClose} className="flex min-h-11 items-center justify-between rounded-md border border-white/15 px-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
            <span>查看全部搜索结果</span><span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </div>,
    document.body
  );
}
