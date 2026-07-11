import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { CrosshairPreview } from "@/components/CrosshairPreview";
import { crosshairFilters, type Crosshair } from "@/lib/data/crosshairs";

export function CrosshairCard({ crosshair }: { crosshair: Crosshair }) {
  const isProReference = crosshair.contentType === "pro-reference";
  const styleTags = crosshair.tags.filter((tag) => !["hao-tested", "pro-reference"].includes(tag)).slice(0, 2);

  return (
    <article className="group flex h-full min-w-0 flex-col rounded-lg border border-white/10 bg-panel/70 p-4 transition duration-200 hover:border-white/25 sm:p-5">
      <CrosshairPreview image={crosshair.image} name={crosshair.nameCn} accent={crosshair.accent} />

      <div className="mt-5 flex min-w-0 flex-1 flex-col">
        <p className="text-xs font-medium text-valorant">{isProReference ? "职业选手参考" : "HAO 实测"}</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">{crosshair.nameCn}</h2>
        <p className="mt-1 text-xs text-zinc-600">{crosshair.nameEn}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {styleTags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-500">
              {crosshairFilters.find((filter) => filter.id === tag)?.labelCn ?? tag}
            </span>
          ))}
        </div>

        <p className="mt-4 line-clamp-2 min-h-12 text-sm leading-6 text-zinc-400">{crosshair.recommendedForCn}</p>

        <div className="mt-5 min-w-0 rounded-md border border-white/10 bg-black/45 p-3">
          <p className="text-xs text-zinc-600">准星代码</p>
          <code className="mt-2 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-zinc-300">{crosshair.code}</code>
          <div className="mt-3"><CopyButton value={crosshair.code} /></div>
        </div>

        <Link href={`/crosshairs/${crosshair.id}`} className="mt-5 inline-flex min-h-10 items-center justify-center rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:border-white/45 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
          查看详情 <span className="ml-2" aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
