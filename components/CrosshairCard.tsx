import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { CrosshairPreview } from "@/components/CrosshairPreview";
import { crosshairFilters, type Crosshair } from "@/lib/data/crosshairs";

type CrosshairCardProps = {
  crosshair: Crosshair;
};

export function CrosshairCard({ crosshair }: CrosshairCardProps) {
  const isProReference = crosshair.contentType === "pro-reference";
  const authorText = isProReference ? "由 ClutchNest 研究整理" : `由 ${crosshair.createdBy} 测试与整理`;
  const authorTextEn = isProReference ? "Researched by ClutchNest" : `Tested and written by ${crosshair.createdBy}`;
  const reviewTitle = isProReference ? "ClutchNest 分析" : "HAO 的评价";
  const reviewTitleEn = isProReference ? "ClutchNest Analysis" : "HAO Review";

  return (
    <article className="group relative overflow-hidden rounded-lg border border-white/10 bg-panel/80 p-5 shadow-glow transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.035]">
      <Link
        href={`/crosshairs/${crosshair.id}`}
        aria-label={`查看 ${crosshair.nameCn} 详情`}
        className="absolute inset-0 z-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/40"
      />
      <header className="mb-5 flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-valorant">
            {isProReference ? "职业选手参考 / Pro Reference" : "HAO 实测 / HAO Tested"}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{crosshair.nameCn}</h2>
          <p className="mt-1 text-sm text-zinc-500">{crosshair.nameEn}</p>
        </div>
        <div className="w-fit rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-zinc-400">
          <p>
            {authorText}
            <span className="ml-2 text-zinc-600">{authorTextEn}</span>
          </p>
          <p className="mt-1 text-zinc-600">
            {isProReference ? `最近核验：${crosshair.verifiedAt} / Verified: 10 July 2026` : `Updated ${crosshair.lastUpdated}`}
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.35fr]">
        <CrosshairPreview image={crosshair.image} name={crosshair.nameCn} accent={crosshair.accent} />

        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {crosshair.tags.map((tag) => {
              const filter = crosshairFilters.find((item) => item.id === tag || item.labelCn === tag);
              return (
                <span key={tag} className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-zinc-400">
                  {filter?.labelCn ?? tag}
                  <span className="ml-1 text-zinc-600">{filter?.labelEn}</span>
                </span>
              );
            })}
            <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-zinc-400">
              {crosshair.difficulty}
              <span className="ml-1 text-zinc-600">{crosshair.style}</span>
            </span>
          </div>

          <div className="rounded-md border border-white/10 bg-black/70 p-4">
            <p className="mb-2 text-sm font-semibold text-white">
              准星代码 <span className="ml-2 text-xs font-normal text-zinc-600">Crosshair Code</span>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <code className="flex-1 overflow-x-auto text-xs leading-6 text-zinc-300">{crosshair.code}</code>
              <div className="relative z-20 w-fit">
                <CopyButton value={crosshair.code} />
              </div>
            </div>
          </div>

          <section className="rounded-md border border-white/10 bg-black/35 p-4">
            <h3 className="text-base font-semibold text-white">
              {reviewTitle} <span className="ml-2 text-xs font-normal text-zinc-600">{reviewTitleEn}</span>
            </h3>
            <p className="mt-3 text-sm leading-7 text-zinc-200">{crosshair.analysisCn}</p>
            <p className="mt-2 text-xs leading-6 text-zinc-600">{crosshair.analysisEn}</p>
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoList titleCn="优点" titleEn="Pros" itemsCn={crosshair.prosCn} itemsEn={crosshair.prosEn} />
            <InfoList titleCn="缺点" titleEn="Cons" itemsCn={crosshair.consCn} itemsEn={crosshair.consEn} muted />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoBlock
              titleCn="推荐人群"
              titleEn="Recommended for"
              contentCn={crosshair.recommendedForCn}
              contentEn={crosshair.recommendedForEn}
            />
            <InfoBlock
              titleCn="适合打法"
              titleEn="Best playstyle"
              contentCn={crosshair.bestForPlaystyle.cn}
              contentEn={crosshair.bestForPlaystyle.en}
            />
          </div>

          {crosshair.bestForAgents.length ? <div className="rounded-md border border-white/10 bg-black/35 p-4">
            <h3 className="text-sm font-semibold text-white">
              适合英雄 <span className="ml-2 text-xs font-normal text-zinc-600">Best for agents</span>
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {crosshair.bestForAgents.map((agent) => (
                <span key={agent} className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
                  {agent}
                </span>
              ))}
            </div>
          </div> : null}

          <div className="flex justify-end">
            <Link
              href={`/crosshairs/${crosshair.id}`}
              className="relative z-20 inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:border-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              查看详情 <span className="text-xs opacity-60">View Details</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function InfoBlock({
  titleCn,
  titleEn,
  contentCn,
  contentEn
}: {
  titleCn: string;
  titleEn: string;
  contentCn: string;
  contentEn: string;
}) {
  return (
    <section className="rounded-md border border-white/10 bg-black/35 p-4">
      <h3 className="text-sm font-semibold text-white">
        {titleCn} <span className="ml-2 text-xs font-normal text-zinc-600">{titleEn}</span>
      </h3>
      <p className="mt-2 text-sm leading-7 text-zinc-300">{contentCn}</p>
      {contentEn ? <p className="mt-1 text-xs leading-6 text-zinc-600">{contentEn}</p> : null}
    </section>
  );
}

function InfoList({
  titleCn,
  titleEn,
  itemsCn,
  itemsEn,
  muted = false
}: {
  titleCn: string;
  titleEn: string;
  itemsCn: string[];
  itemsEn: string[];
  muted?: boolean;
}) {
  return (
    <section className="rounded-md border border-white/10 bg-black/35 p-4">
      <h3 className="text-sm font-semibold text-white">
        {titleCn} <span className="ml-2 text-xs font-normal text-zinc-600">{titleEn}</span>
      </h3>
      <ul className="mt-3 space-y-3">
        {itemsCn.map((item, index) => (
          <li key={item} className={muted ? "text-sm leading-6 text-zinc-500" : "text-sm leading-6 text-zinc-300"}>
            <span className="block">{item}</span>
            <span className="block text-xs text-zinc-600">{itemsEn[index]}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
