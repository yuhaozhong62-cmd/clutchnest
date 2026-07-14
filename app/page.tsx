import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { CrosshairPreview } from "@/components/CrosshairPreview";
import { HomepageDiscovery } from "@/components/home/HomepageDiscovery";
import { publishedCrosshairs } from "@/lib/data/crosshairs";

export default function HomePage() {
  const featuredCrosshairs = publishedCrosshairs.filter((item) => item.featured && item.contentType === "hao-tested").slice(0, 3);

  return (
    <div>
      <section className="mx-auto flex min-h-[72vh] max-w-6xl items-center px-5 py-16 sm:py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-black leading-none text-white sm:text-7xl lg:text-8xl">ClutchNest</h1>
          <p className="mt-7 text-2xl font-semibold text-zinc-100 sm:text-3xl">HAO 的 Valorant 准星与游戏理解</p>
          <p className="mt-5 text-base leading-8 text-zinc-300 sm:text-lg">收集实测准星、职业选手设置与地图打法。</p>
          <p className="mt-2 text-sm text-zinc-600">Crosshairs, map strategy and practical game sense.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/crosshairs">浏览准星库</ButtonLink>
            <ButtonLink href="/agents-maps" variant="secondary">探索英雄与地图</ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <div className="flex items-end justify-between gap-5">
            <div>
              <h2 className="text-3xl font-semibold text-white">HAO 推荐准星</h2>
              <p className="mt-2 text-sm text-zinc-600">HAO Featured Crosshairs</p>
            </div>
            <Link href="/crosshairs" className="text-sm font-semibold text-zinc-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              查看全部 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featuredCrosshairs.map((crosshair) => (
              <Link key={crosshair.id} href={`/crosshairs/${crosshair.id}`} className="group rounded-lg border border-white/10 bg-panel/70 p-4 transition duration-200 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                <CrosshairPreview image={crosshair.image} name={crosshair.nameCn} accent={crosshair.accent} />
                <h3 className="mt-5 text-lg font-semibold text-white">{crosshair.nameCn}</h3>
                <p className="mt-1 text-xs text-zinc-600">{crosshair.nameEn}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HomepageDiscovery />

      <section className="border-t border-white/10 bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-3xl font-semibold text-white">英雄与地图</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-zinc-400">选择英雄、地图和点位，快速查看实战打法与控图思路。</p>
            <div className="mt-7"><ButtonLink href="/agents-maps" variant="secondary">开始探索</ButtonLink></div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-white">关于 ClutchNest</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-zinc-400">一个由 HAO 创建、重视实战验证与长期整理的 Valorant 个人知识库。</p>
            <Link href="/about" className="mt-7 inline-flex text-sm font-semibold text-zinc-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">了解项目 <span className="ml-2" aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
