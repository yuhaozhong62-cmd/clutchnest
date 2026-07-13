import type { CypherTactic } from "@/lib/data/tactics/types";
import { difficultyLabels, sideLabels, TacticBadge, UtilityBadges } from "@/components/tactics/TacticBadge";
import { TacticImageGallery } from "@/components/tactics/TacticImageGallery";

export function TacticDetail({ tactic, index, total, onClose, onPrevious, onNext }: { tactic: CypherTactic; index: number; total: number; onClose: () => void; onPrevious: () => void; onNext: () => void }) {
  return (
    <article aria-labelledby="tactic-detail-title" className="border-t border-white/15 bg-[#080808] pt-5 lg:rounded-md lg:border lg:border-white/10 lg:p-5">
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase text-valorant">战术 {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</p>
          <h2 id="tactic-detail-title" className="mt-2 text-xl font-semibold text-white sm:text-2xl">{tactic.titleZh}</h2>
          <p className="mt-1 text-xs text-zinc-600">{tactic.titleEn}</p>
        </div>
        <button type="button" aria-label="关闭战术详情" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-white/10 text-xl text-zinc-500 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">×</button>
      </div>

      <p className="mt-5 text-sm leading-7 text-zinc-300">{tactic.shortDescriptionZh}</p>
      {tactic.shortDescriptionEn ? <p className="mt-1 text-xs leading-5 text-zinc-600">{tactic.shortDescriptionEn}</p> : null}

      <div className="mt-4 flex flex-wrap gap-1.5">
        <TacticBadge accent>{sideLabels[tactic.side]}</TacticBadge>
        <TacticBadge>{tactic.area}</TacticBadge>
        <TacticBadge>{difficultyLabels[tactic.difficulty]}</TacticBadge>
        <UtilityBadges utilities={tactic.utilityTypes} />
      </div>

      <div className="mt-6"><TacticImageGallery images={tactic.images} tacticTitle={tactic.titleZh} /></div>

      <div className="mt-7 space-y-7">
        <DetailText title="解决什么问题" content={tactic.purpose} />
        <DetailText title="放置区域" content={tactic.exactLocation} />
        <NumberedSteps title="布置步骤" items={tactic.setupSteps} />
        <NumberedSteps title="实战打法" items={tactic.howToPlay} />
        <DetailText title="使用时机" content={tactic.timing} />
        <DetailText title="推荐站位" content={tactic.playerPosition} />
        <BulletList title="获得信息后的处理" items={tactic.informationResponse} />
        <BulletList title="队友配合" items={tactic.teamSynergy} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"><BulletList title="优点" items={tactic.strengths} /><BulletList title="缺点" items={tactic.weaknesses} muted /></div>
        <BulletList title="敌方破解方式" items={tactic.counters} muted />
        <BulletList title="变化打法" items={tactic.variations} />
        {tactic.haoReview ? (
          <section className="border-l-2 border-valorant bg-valorant/[0.045] px-4 py-4">
            <h3 className="text-sm font-semibold text-white">HAO 的个人评价</h3>
            <p className="mt-2 text-sm leading-7 text-zinc-300">{tactic.haoReview}</p>
          </section>
        ) : null}
        <Verification tactic={tactic} />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
        <button type="button" onClick={onPrevious} className="min-h-11 rounded-sm border border-white/10 px-3 text-sm font-semibold text-zinc-400 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">← 上一条</button>
        <button type="button" onClick={onNext} className="min-h-11 rounded-sm border border-white/10 px-3 text-sm font-semibold text-zinc-400 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">下一条 →</button>
        <button type="button" onClick={onClose} className="col-span-2 min-h-11 rounded-sm bg-white px-4 text-sm font-semibold text-black transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">返回全部标记</button>
      </div>
    </article>
  );
}

function DetailText({ title, content }: { title: string; content: string }) {
  return <section><h3 className="text-sm font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-zinc-400">{content}</p></section>;
}

function NumberedSteps({ title, items }: { title: string; items: string[] }) {
  return <section><h3 className="text-sm font-semibold text-white">{title}</h3><ol className="mt-3 space-y-3">{items.map((item, index) => <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-6 text-zinc-400"><span className="font-semibold tabular-nums text-zinc-700">{String(index + 1).padStart(2, '0')}</span><span>{item}</span></li>)}</ol></section>;
}

function BulletList({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  return <section><h3 className="text-sm font-semibold text-white">{title}</h3><ul className="mt-3 space-y-2">{items.map((item) => <li key={item} className={`border-l border-white/10 pl-3 text-sm leading-6 ${muted ? "text-zinc-500" : "text-zinc-400"}`}>{item}</li>)}</ul></section>;
}

function Verification({ tactic }: { tactic: CypherTactic }) {
  const sourceTypes = Array.from(new Set(tactic.sources?.map((source) => ({ official: '官方', vct: 'VCT', guide: '攻略', community: '社区研究' })[source.sourceType]) ?? []));
  return (
    <section className="rounded-sm border border-white/10 bg-black/40 p-4">
      <h3 className="text-xs font-semibold text-white">版本与来源</h3>
      <dl className="mt-3 space-y-2 text-xs leading-5 text-zinc-500">
        <div className="flex justify-between gap-4"><dt>最后核验</dt><dd className="text-right text-zinc-400">{tactic.verifiedPatch ? `Patch ${tactic.verifiedPatch}` : '当前版本状态：待验证'}</dd></div>
        {tactic.lastVerifiedAt ? <div className="flex justify-between gap-4"><dt>核验日期</dt><dd className="text-right text-zinc-400">{tactic.lastVerifiedAt}</dd></div> : null}
        <div className="flex justify-between gap-4"><dt>信息来源</dt><dd className="text-right text-zinc-400">{sourceTypes.join(' / ') || '待补充'}</dd></div>
        <div className="flex justify-between gap-4"><dt>实机复测</dt><dd className="text-right text-zinc-400">{tactic.requiresInGameVerification ? '需要' : '已完成'}</dd></div>
      </dl>
      {tactic.verificationNotes ? <p className="mt-3 border-t border-white/10 pt-3 text-xs leading-5 text-zinc-600">{tactic.verificationNotes}</p> : null}
      {tactic.sources?.length ? <details className="mt-3 text-xs text-zinc-600"><summary className="cursor-pointer transition hover:text-zinc-300">查看研究来源</summary><ul className="mt-3 space-y-2">{tactic.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="leading-5 underline decoration-white/15 underline-offset-4 transition hover:text-white">{source.title}</a></li>)}</ul></details> : null}
    </section>
  );
}
