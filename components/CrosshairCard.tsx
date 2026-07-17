import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { CrosshairPreview } from "@/components/CrosshairPreview";
import { crosshairFilters, type Crosshair } from "@/lib/data/crosshairs";

export function CrosshairCard({ crosshair }: { crosshair: Crosshair }) {
  const isProReference = crosshair.contentType === "pro-reference";
  const isHaoTested = crosshair.contentType === "hao-tested";
  const styleTags = crosshair.tags.filter((tag) => !["hao-tested", "pro-reference"].includes(tag)).slice(0, 2);

  return (
    <article className={`surface-card group relative flex h-full min-w-0 flex-col overflow-hidden p-4 sm:p-5 ${isHaoTested ? "border-l-2 border-l-valorant/70" : ""}`}>
      <CrosshairPreview image={crosshair.image} name={crosshair.nameCn} accent={crosshair.accent} />

      <div className="mt-5 flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-3">
          <p className={`text-xs font-semibold ${isHaoTested ? "text-valorant" : "text-zinc-400"}`}>{isProReference ? "职业公开设置" : "HAO 实测"}</p>
          <span className="text-[11px] text-zinc-600">更新于 {crosshair.lastUpdated}</span>
        </div>
        <h2 className="mt-2 break-words text-xl font-semibold leading-7 text-white">{crosshair.nameCn}</h2>
        <p className="mt-1 support-copy">{crosshair.nameEn}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {styleTags.map((tag) => (
            <span key={tag} className="content-tag">
              {crosshairFilters.find((filter) => filter.id === tag)?.labelCn ?? tag}
            </span>
          ))}
        </div>

        <div className="mt-5 min-h-[6.5rem] border-t border-white/[0.07] pt-4">
          <p className="text-xs font-medium text-zinc-500">{isHaoTested ? "HAO 实战评价" : "适合人群"}</p>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-300">{isHaoTested ? crosshair.analysisCn : crosshair.recommendedForCn}</p>
        </div>

        <div className="crosshair-code-panel mt-5">
          <p className="text-[11px] text-zinc-500">准星代码</p>
          <code className="mt-2 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-mono text-xs text-zinc-300" title={crosshair.code}>{crosshair.code}</code>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <CopyButton value={crosshair.code} compact />
            <Link href={`/crosshairs/${crosshair.id}`} className="btn-ghost min-h-11 flex-1 border border-white/10 px-3 text-xs">
              查看详情 <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
