import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageClient } from "@/components/search/SearchPageClient";

type SearchPageProps = { searchParams: Promise<{ q?: string | string[] }> };

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = Array.isArray(params.q) ? params.q[0] : params.q;
  const cleanQuery = query?.trim();
  return {
    title: cleanQuery ? `“${cleanQuery}”的搜索结果` : "搜索",
    description: "搜索 ClutchNest 中的 VALORANT 准星、职业选手、战队、英雄、地图与实战打法。",
    robots: { index: false, follow: true },
    alternates: { canonical: "/search" }
  };
}

export default function SearchPage() {
  return (
    <div className="mx-auto min-h-[70vh] max-w-6xl px-5 py-16 sm:py-24">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-black text-white sm:text-5xl">搜索</h1>
        <p className="mt-2 text-sm text-zinc-600">Global Search</p>
        <p className="mt-5 text-base leading-8 text-zinc-300">快速找到 ClutchNest 中已经发布的准星、选手、战队、英雄、地图和实战打法。</p>
      </header>
      <Suspense fallback={<div className="mt-10 border-y border-white/10 py-10 text-sm text-zinc-600">正在载入搜索索引…</div>}><SearchPageClient /></Suspense>
    </div>
  );
}
