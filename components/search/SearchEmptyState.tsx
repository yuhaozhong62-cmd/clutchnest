import Link from "next/link";

export function SearchEmptyState({ query }: { query: string }) {
  const links = [
    ["浏览全部准星", "/crosshairs"],
    ["查看 EDG", "/crosshairs?team=edg"],
    ["查看 XLG", "/crosshairs?team=xlg"],
    ["查看 PRX", "/crosshairs?team=prx"],
    ["浏览英雄与地图", "/agents-maps"]
  ];
  return (
    <div className="border border-dashed border-white/15 px-5 py-12 text-center">
      <h2 className="text-lg font-semibold text-white">没有找到与“{query}”相关的内容。</h2>
      <p className="mt-3 text-sm leading-7 text-zinc-500">请检查拼写，或尝试搜索选手 ID、战队简称、英雄和地图英文名。</p>
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        {links.map(([label, href]) => <Link key={href} href={href} className="rounded-md border border-white/10 px-3 py-2 text-sm text-zinc-400 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">{label}</Link>)}
      </div>
    </div>
  );
}
