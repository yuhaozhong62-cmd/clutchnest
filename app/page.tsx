import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/site";

const entries = [
  {
    titleCn: "准星分享",
    titleEn: "Crosshair Library",
    href: "/crosshairs",
    descriptionCn: "收集实战测试过的准星代码、适合人群和 HAO 的个人评价。",
    descriptionEn: "Tested crosshair codes with personal reviews.",
    metric: "Codes"
  },
  {
    titleCn: "英雄与地图",
    titleEn: "Agents & Maps",
    href: "/agents-maps",
    descriptionCn: "整理不同英雄在地图上的点位、控图思路和实战打法。",
    descriptionEn: "Map strategy, utility ideas and game sense.",
    metric: "Strategy"
  },
  {
    titleCn: "游戏理解",
    titleEn: "Game Sense",
    href: "/about",
    descriptionCn: "记录这个项目的方向，以及长期沉淀内容的标准。",
    descriptionEn: "A personal space for long-term improvement.",
    metric: "HAO"
  }
];

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto grid min-h-[calc(100vh-82px)] max-w-6xl items-center gap-12 overflow-hidden px-5 py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0">
          <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.14em] text-zinc-400 sm:tracking-[0.24em]">
            <span className="h-1.5 w-1.5 rounded-full bg-valorant shadow-[0_0_18px_rgba(255,70,85,0.9)]" />
            Valorant 个人知识库
            <span className="text-zinc-600">Personal KB</span>
          </div>
          <h1 className="mt-7 text-5xl font-black leading-none text-white sm:text-7xl lg:text-8xl">ClutchNest</h1>
          <p className="mt-5 text-2xl font-semibold text-zinc-100">{site.taglineCn}</p>
          <p className="mt-2 text-sm text-zinc-500">{site.taglineEn}</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300">
            一个由 HAO 创建的 Valorant 个人知识库。
            <br />
            分享准星、英雄地图打法、控图思路和个人游戏理解。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/crosshairs">
              探索准星 <span className="ml-2 text-xs opacity-60">Explore Crosshairs</span>
            </ButtonLink>
            <ButtonLink href="/agents-maps" variant="secondary">
              查看英雄与地图 <span className="ml-2 text-xs opacity-60">View Agents & Maps</span>
            </ButtonLink>
          </div>
        </div>

        <div className="min-w-0 rounded-lg border border-white/10 bg-white/[0.03] p-3 shadow-glow transition duration-500 hover:-translate-y-1 hover:border-white/20">
          <div className="relative min-h-[360px] overflow-hidden rounded-md border border-white/10 bg-black sm:min-h-[430px] grid-surface">
            <div className="absolute left-6 top-6">
              <p className="text-xs uppercase tracking-[0.26em] text-zinc-500">ClutchNest</p>
              <p className="mt-2 text-sm text-zinc-300">由 HAO 创建</p>
              <p className="mt-1 text-xs text-zinc-600">Created by HAO</p>
            </div>
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="grid h-full place-items-center rounded-md bg-white text-5xl font-black text-black">CN</div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
              {[
                ["准星", "Aim"],
                ["地图", "Map"],
                ["理解", "Sense"]
              ].map(([cn, en]) => (
                <div key={cn} className="rounded-md border border-white/10 bg-black/70 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{en}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{cn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/35">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-16 md:grid-cols-3">
          {entries.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="group rounded-lg border border-white/10 bg-panel/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-valorant/70 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{entry.titleEn}</p>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-zinc-500 transition group-hover:border-valorant/60 group-hover:text-white">
                  {entry.metric}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">{entry.titleCn}</h2>
              <p className="mt-1 text-sm text-zinc-600">{entry.titleEn}</p>
              <p className="mt-4 min-h-14 text-sm leading-7 text-zinc-300">{entry.descriptionCn}</p>
              <p className="mt-2 text-xs leading-6 text-zinc-600">{entry.descriptionEn}</p>
              <span className="mt-7 inline-flex text-sm font-semibold text-white transition group-hover:translate-x-1 group-hover:text-valorant">
                打开 <span className="ml-2 text-zinc-600">Open</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
