import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { CrosshairPreview } from "@/components/CrosshairPreview";
import { crosshairFilters, type Crosshair } from "@/lib/data/crosshairs";

export function CrosshairCard({ crosshair }: { crosshair: Crosshair }) {
  const isProReference = crosshair.contentType === "pro-reference";
  const styleTags = crosshair.tags.filter((tag) => !["hao-tested", "pro-reference"].includes(tag)).slice(0, 2);

  return (
    <article className="surface-card group flex h-full min-w-0 flex-col p-4 sm:p-5">
      <CrosshairPreview image={crosshair.image} name={crosshair.nameCn} accent={crosshair.accent} />

      <div className="mt-5 flex min-w-0 flex-1 flex-col">
        <p className="text-xs font-medium text-valorant">{isProReference ? "职业选手" : "HAO 实测"}</p>
        <h2 className="mt-2 text-xl font-semibold text-white">{crosshair.nameCn}</h2>
        <p className="mt-1 support-copy">{crosshair.nameEn}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {styleTags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-500">
              {crosshairFilters.find((filter) => filter.id === tag)?.labelCn ?? tag}
            </span>
          ))}
        </div>

        <p className="mt-4 line-clamp-2 min-h-12 text-sm leading-6 text-zinc-400">{crosshair.recommendedForCn}</p>

        <div className="mt-5 min-w-0 rounded-md border border-white/[0.08] bg-black/25 p-3">
          <p className="text-xs text-zinc-500">准星代码</p>
          <code className="mt-2 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-mono text-xs text-zinc-300">{crosshair.code}</code>
          <div className="mt-3"><CopyButton value={crosshair.code} /></div>
        </div>

        <Link href={`/crosshairs/${crosshair.id}`} className="btn-secondary mt-4 min-h-10 px-4">
          查看详情 <span className="ml-2" aria-hidden="true">→</span>
        </Link>
        <p className="mt-3 text-right text-[11px] text-zinc-500">更新于 {crosshair.lastUpdated}</p>
      </div>
    </article>
  );
}
