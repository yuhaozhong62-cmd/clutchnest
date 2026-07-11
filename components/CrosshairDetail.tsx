import { CopyButton } from "@/components/CopyButton";
import { CrosshairPreview } from "@/components/CrosshairPreview";
import { crosshairFilters, type Crosshair } from "@/lib/data/crosshairs";

type CrosshairDetailProps = {
  crosshair: Crosshair;
};

export function CrosshairDetail({ crosshair }: CrosshairDetailProps) {
  const isProReference = crosshair.contentType === "pro-reference";
  const analysisTitle = isProReference ? "ClutchNest 分析" : "HAO 的完整评价";
  const analysisTitleEn = isProReference ? "ClutchNest Analysis" : "HAO's Full Review";

  return (
    <article className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-panel/80 shadow-glow">
      <div className="border-b border-white/10 p-5 sm:p-7 lg:p-9">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-valorant">
              {isProReference ? "职业选手参考 / Pro Reference" : "HAO 实测 / HAO Tested"}
            </p>
            <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">{crosshair.nameCn}</h1>
            <p className="mt-2 text-base text-zinc-500">{crosshair.nameEn}</p>
          </div>
          <div className="w-fit border-l-2 border-valorant pl-4 text-xs leading-6 text-zinc-400">
            <p>{isProReference ? "由 ClutchNest 研究整理" : `由 ${crosshair.createdBy} 测试与整理`}</p>
            <p className="text-zinc-600">
              {isProReference ? "Researched by ClutchNest" : `Tested and written by ${crosshair.createdBy}`}
            </p>
            <p className="mt-1 text-zinc-500">
              {isProReference ? `最近核验 / Verified: ${crosshair.verifiedAt}` : `最后更新 / Last updated: ${crosshair.lastUpdated}`}
            </p>
            {crosshair.currentTeam ? <p className="text-zinc-600">当前队伍 / Current team: {crosshair.currentTeam}</p> : null}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {crosshair.tags.map((tag) => {
            const filter = crosshairFilters.find((item) => item.id === tag || item.labelCn === tag);
            return (
              <span key={tag} className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-zinc-300">
                {filter?.labelCn ?? tag}
                {filter?.labelEn ? <span className="ml-1 text-zinc-600">{filter.labelEn}</span> : null}
              </span>
            );
          })}
        </div>
      </div>

      <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[1.05fr_0.95fr] lg:p-9">
        <div className="space-y-5">
          <CrosshairPreview image={crosshair.image} name={crosshair.nameCn} accent={crosshair.accent} />

          <section className="rounded-md border border-white/10 bg-black/60 p-4 sm:p-5">
            <SectionTitle cn="准星代码" en="Crosshair Code" />
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <code className="min-w-0 flex-1 overflow-x-auto text-xs leading-6 text-zinc-300">{crosshair.code}</code>
              <CopyButton value={crosshair.code} />
            </div>
          </section>

          <section className="border-l-2 border-valorant bg-white/[0.025] p-5 sm:p-6">
            <SectionTitle cn={analysisTitle} en={analysisTitleEn} />
            <p className="mt-4 text-base leading-8 text-zinc-200">{crosshair.analysisCn}</p>
            <p className="mt-3 text-sm leading-7 text-zinc-600">{crosshair.analysisEn}</p>
          </section>
        </div>

        <div className="space-y-5">
          <InfoBlock
            titleCn="推荐人群"
            titleEn="Recommended for"
            contentCn={crosshair.recommendedForCn}
            contentEn={crosshair.recommendedForEn}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Stat labelCn="难度" labelEn="Difficulty" value={crosshair.difficulty} />
            <Stat labelCn="风格" labelEn="Style" value={crosshair.style} />
          </div>

          <InfoBlock
            titleCn="适合打法"
            titleEn="Best playstyle"
            contentCn={crosshair.bestForPlaystyle.cn}
            contentEn={crosshair.bestForPlaystyle.en}
          />

          {crosshair.bestForAgents.length ? <section className="rounded-md border border-white/10 bg-black/35 p-5">
            <SectionTitle cn="适合英雄" en="Best agents" />
            <div className="mt-4 flex flex-wrap gap-2">
              {crosshair.bestForAgents.map((agent) => (
                <span key={agent} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-zinc-300">
                  {agent}
                </span>
              ))}
            </div>
          </section> : null}

          <InfoList titleCn="优点" titleEn="Pros" itemsCn={crosshair.prosCn} itemsEn={crosshair.prosEn} />
          <InfoList titleCn="缺点" titleEn="Cons" itemsCn={crosshair.consCn} itemsEn={crosshair.consEn} muted />
        </div>
      </div>

      {isProReference ? (
        <div className="border-t border-white/10 p-5 sm:p-7 lg:p-9">
          <section className="border-l-2 border-valorant bg-white/[0.025] p-5">
            <SectionTitle cn="职业参考说明" en="Professional Reference Notice" />
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              职业选手可能随时更换准星。本页展示的是 ClutchNest 于 {crosshair.verifiedAt} 最近核验的公开设置，不代表选手永久使用此代码，也不代表选手、战队、Riot Games 或 VALORANT 对 ClutchNest 的认可。
            </p>
            <p className="mt-2 text-xs leading-6 text-zinc-600">
              Players may change settings at any time. Names identify public settings sources only; no endorsement is implied.
            </p>
          </section>

          <section className="mt-6">
            <SectionTitle cn="资料来源" en="Sources" />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {crosshair.sourceNames.map((source, index) => (
                <a
                  key={source}
                  href={crosshair.sourceUrls[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-white/10 bg-black/35 p-4 transition hover:border-white/30 hover:bg-white/[0.04]"
                >
                  <span className="block text-sm font-semibold text-white">{source}</span>
                  <span className="mt-1 block text-xs text-zinc-600">来源更新 / Source updated: {crosshair.sourceUpdatedAt[index]}</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </article>
  );
}

function SectionTitle({ cn, en }: { cn: string; en: string }) {
  return (
    <h2 className="text-base font-semibold text-white">
      {cn} <span className="ml-2 text-xs font-normal text-zinc-600">{en}</span>
    </h2>
  );
}

function Stat({ labelCn, labelEn, value }: { labelCn: string; labelEn: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/35 p-4">
      <p className="text-xs text-zinc-500">
        {labelCn} <span className="text-zinc-700">{labelEn}</span>
      </p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
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
    <section className="rounded-md border border-white/10 bg-black/35 p-5">
      <SectionTitle cn={titleCn} en={titleEn} />
      <p className="mt-3 text-sm leading-7 text-zinc-200">{contentCn}</p>
      {contentEn ? <p className="mt-2 text-xs leading-6 text-zinc-600">{contentEn}</p> : null}
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
    <section className="rounded-md border border-white/10 bg-black/35 p-5">
      <SectionTitle cn={titleCn} en={titleEn} />
      <ul className="mt-4 space-y-3">
        {itemsCn.map((item, index) => (
          <li key={item} className="flex gap-3">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${muted ? "bg-zinc-700" : "bg-valorant"}`} />
            <span>
              <span className={`block text-sm leading-6 ${muted ? "text-zinc-400" : "text-zinc-200"}`}>{item}</span>
              {itemsEn[index] ? <span className="block text-xs leading-5 text-zinc-600">{itemsEn[index]}</span> : null}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
