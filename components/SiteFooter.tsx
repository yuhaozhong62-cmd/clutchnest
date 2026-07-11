import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-zinc-500">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>
            {site.siteName} 由 {site.creator} 创建
            <span className="ml-2 text-zinc-600">Created by {site.creator}</span>
          </p>
          <p>Valorant 准星、地图、英雄理解和游戏思路。</p>
        </div>
        <p className="mt-5 border-t border-white/10 pt-5 text-xs leading-6 text-zinc-700">
          ClutchNest 是一个独立的非商业玩家项目，与 Riot Games 无隶属、赞助或官方认可关系。
          <span className="ml-2">
            ClutchNest is an independent, non-commercial fan project and is not affiliated with, sponsored by, or endorsed by Riot Games.
          </span>
        </p>
      </div>
    </footer>
  );
}
