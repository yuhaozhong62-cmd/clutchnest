import { CopyButton } from "@/components/CopyButton";
import { CrosshairPreview } from "@/components/CrosshairPreview";
import { crosshairFilters, type Crosshair } from "@/lib/data/crosshairs";

export function CrosshairDetail({ crosshair }: { crosshair: Crosshair }) {
  const isProReference = crosshair.contentType === "pro-reference";

  return (
    <article className="mt-8 max-w-5xl">
      <header className="border-b border-white/10 pb-8">
        <p className="text-sm font-medium text-valorant">{isProReference ? "职业选手参考" : "HAO 实测"}</p>
        <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">{crosshair.nameCn}</h1>
        <p className="mt-2 text-sm text-zinc-600">{crosshair.nameEn}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {crosshair.tags.filter((tag) => !["hao-tested", "pro-reference"].includes(tag)).map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500">
              {crosshairFilters.find((item) => item.id === tag)?.labelCn ?? tag}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-8"><CrosshairPreview image={crosshair.image} name={crosshair.nameCn} accent={crosshair.accent} /></div>

      <section className="mt-6 rounded-lg border border-white/10 bg-panel/70 p-4 sm:p-5">
        <h2 className="text-base font-semibold text-white">准星代码</h2>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <code className="min-w-0 flex-1 overflow-x-auto text-xs leading-6 text-zinc-300">{crosshair.code}</code>
          <CopyButton value={crosshair.code} />
        </div>
      </section>

      <div className="reading-content mt-14 space-y-14">
        <section>
          <h2 className="text-2xl font-semibold text-white">适合谁使用</h2>
          <p className="mt-4 text-base leading-8 text-zinc-300">{crosshair.recommendedForCn}</p>
          <p className="mt-3 text-sm leading-7 text-zinc-600">{crosshair.recommendedForEn}</p>
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-500">
            <p>难度：<span className="text-zinc-300">{crosshair.difficulty.split(" / ")[0]}</span></p>
            <p>风格：<span className="text-zinc-300">{crosshair.style.split(" / ")[0]}</span></p>
          </div>
        </section>

        <section className="border-l-2 border-valorant pl-5 sm:pl-7">
          <h2 className="text-2xl font-semibold text-white">{isProReference ? "ClutchNest 分析" : "HAO 的完整评价"}</h2>
          <p className="mt-5 text-base leading-8 text-zinc-200">{crosshair.analysisCn}</p>
          <p className="mt-4 text-sm leading-7 text-zinc-600">{crosshair.analysisEn}</p>
        </section>

        <div className="grid gap-8 sm:grid-cols-2">
          <InfoList title="优点" items={crosshair.prosCn} accent />
          <InfoList title="缺点" items={crosshair.consCn} />
        </div>

        <section className="grid gap-8 border-y border-white/10 py-10 sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-white">推荐玩家</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{crosshair.recommendedForCn}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">适合打法</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{crosshair.bestForPlaystyle.cn}</p>
          </div>
        </section>

        {crosshair.bestForAgents.length ? (
          <section>
            <h2 className="text-lg font-semibold text-white">适合英雄</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {crosshair.bestForAgents.map((agent) => <span key={agent} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-400">{agent}</span>)}
            </div>
          </section>
        ) : null}

        <section className="border-t border-white/10 pt-8 text-sm leading-7 text-zinc-500">
          <h2 className="text-lg font-semibold text-white">整理与核验</h2>
          <p className="mt-3">{isProReference ? `ClutchNest 于 ${crosshair.verifiedAt} 核验公开设置。职业选手可能随时更换准星，本页不代表永久设置或任何形式的认可。` : `由 ${crosshair.createdBy} 测试与整理，最后更新于 ${crosshair.lastUpdated}。`}</p>
          {isProReference ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {crosshair.sourceNames.map((source, index) => (
                <a key={source} href={crosshair.sourceUrls[index]} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/10 p-4 transition hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                  <span className="block font-semibold text-zinc-300">{source}</span>
                  <span className="mt-1 block text-xs text-zinc-600">来源更新：{crosshair.sourceUpdatedAt[index]}</span>
                </a>
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </article>
  );
}

function InfoList({ title, items, accent = false }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-zinc-400">
            <span className={`mt-3 h-1.5 w-1.5 shrink-0 rounded-full ${accent ? "bg-valorant" : "bg-zinc-700"}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
