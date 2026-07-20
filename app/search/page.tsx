import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageClient } from "@/components/search/SearchPageClient";

type SearchPageProps = { searchParams: Promise<{ q?: string | string[] }> };

const staticSearchMetadata: Metadata = {
  title: "搜索",
  description: "搜索 ClutchNest 中的 VALORANT 准星、高分主播、职业选手、战队、英雄、地图与实战打法。",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" }
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  if (process.env.CLUTCHNEST_STATIC_EXPORT === "1") return staticSearchMetadata;

  const params = await searchParams;
  const query = Array.isArray(params.q) ? params.q[0] : params.q;
  const cleanQuery = query?.trim();
  return {
    ...staticSearchMetadata,
    title: cleanQuery ? `“${cleanQuery}”的搜索结果` : staticSearchMetadata.title
  };
}

export default function SearchPage() {
  return (
    <div className="site-container page-shell min-h-[70vh]">
      <header className="page-header">
        <h1 className="page-title">搜索</h1>
        <p className="mt-2 page-kicker">Global Search</p>
        <p className="mt-5 page-lead">快速找到 ClutchNest 中已经发布的准星、高分主播、选手、战队、英雄、地图和实战打法。</p>
      </header>
      <Suspense fallback={<div className="mt-10 border-y border-white/10 py-10 text-sm text-zinc-600">正在载入搜索索引…</div>}><SearchPageClient /></Suspense>
    </div>
  );
}
