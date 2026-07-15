import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { CrosshairPreview } from "@/components/CrosshairPreview";
import { HomepageDiscovery } from "@/components/home/HomepageDiscovery";
import { publishedCrosshairs } from "@/lib/data/crosshairs";

export default function HomePage() {
  const featuredCrosshairs = publishedCrosshairs.filter((item) => item.featured && item.contentType === "hao-tested").slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-surface opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" aria-hidden="true" />
        <div className="site-container relative flex min-h-[min(680px,76vh)] items-center py-16 sm:py-24">
        <div className="max-w-[50rem]">
          <p className="mb-5 text-xs font-semibold text-valorant">由 HAO 创建 · 实战核验</p>
          <h1 className="text-5xl font-bold leading-[0.96] text-white sm:text-6xl lg:text-7xl">ClutchNest</h1>
          <p className="mt-7 text-2xl font-semibold leading-tight text-zinc-100 sm:text-4xl">HAO 的 Valorant 准星与游戏理解</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">收集经过核验的职业选手设置、实测准星与可操作的地图打法。</p>
          <p className="mt-2 text-sm text-zinc-500">Crosshairs, player settings and practical game sense.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/crosshairs">浏览准星库</ButtonLink>
            <ButtonLink href="/agents-maps" variant="secondary">探索英雄与地图</ButtonLink>
          </div>
        </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container">
          <div className="flex items-end justify-between gap-5">
            <div>
              <h2 className="section-title">HAO 推荐准星</h2>
              <p className="mt-2 support-copy">HAO Featured Crosshairs</p>
            </div>
            <Link href="/crosshairs" className="text-sm font-semibold text-zinc-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              查看全部 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featuredCrosshairs.map((crosshair) => (
              <Link key={crosshair.id} href={`/crosshairs/${crosshair.id}`} className="surface-card group p-4 focus-visible:outline-none">
                <CrosshairPreview image={crosshair.image} name={crosshair.nameCn} accent={crosshair.accent} />
                <h3 className="mt-5 text-lg font-semibold text-white">{crosshair.nameCn}</h3>
                <p className="mt-1 support-copy">{crosshair.nameEn}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HomepageDiscovery />

      <section className="section-shell bg-white/[0.012]">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="section-title">英雄与地图</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-zinc-400">选择英雄、地图和点位，快速查看实战打法与控图思路。</p>
            <div className="mt-7"><ButtonLink href="/agents-maps" variant="secondary">开始探索</ButtonLink></div>
          </div>
          <div>
            <h2 className="section-title">关于 ClutchNest</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-zinc-400">一个由 HAO 创建、重视实战验证与长期整理的 Valorant 个人知识库。</p>
            <Link href="/about" className="mt-7 inline-flex text-sm font-semibold text-zinc-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">了解项目 <span className="ml-2" aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
