import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#070809]">
      <div className="site-container py-8 sm:py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-sm font-semibold tracking-[0.06em] text-zinc-100">{site.siteName}</p><p className="mt-1 text-xs text-zinc-500">由 HAO 创建 · © {new Date().getFullYear()}</p></div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400" aria-label="Footer navigation">
            {site.nav.map((item) => <Link key={item.href} href={item.href} className="transition-colors hover:text-white">{item.labelCn}</Link>)}
          </nav>
        </div>
        <p className="mt-7 border-t border-white/[0.07] pt-5 text-xs leading-6 text-zinc-500">
          ClutchNest 是一个独立的非商业玩家项目，与 Riot Games 无隶属、赞助或官方认可关系。游戏名称与相关资产归 Riot Games 所有。
          <span className="mt-1 block text-zinc-600">ClutchNest is an independent, non-commercial fan project and is not affiliated with, sponsored by, or endorsed by Riot Games.</span>
        </p>
      </div>
    </footer>
  );
}
