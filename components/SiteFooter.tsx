import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-zinc-500">
        <p>{site.siteName} · HAO 的 Valorant 准星与游戏理解</p>
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
