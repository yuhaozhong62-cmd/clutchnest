import { CopyButton } from "@/components/CopyButton";
import { ProCrosshairPreview } from "@/components/crosshairs/ProCrosshairPreview";
import { VerificationBadge } from "@/components/crosshairs/VerificationBadge";
import { validateValorantCrosshairCode } from "@/lib/crosshairCode";
import type { CrosshairVersion, StreamerProfile } from "@/lib/data/crosshairTeams/types";

export function StreamerCrosshairCard({ profile, version, onDetails }: { profile: StreamerProfile; version: CrosshairVersion; onDetails: () => void }) {
  const validation = version.code ? validateValorantCrosshairCode(version.code) : { valid: false, reasons: ["暂无完整代码"] };
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-panel/80 transition duration-200 hover:-translate-y-0.5 hover:border-white/25">
      <ProCrosshairPreview settings={version.normalizedSettings} label={`${profile.displayName} ${version.titleZh}`} />
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center border border-white/15 bg-white/[0.04] text-xs font-black text-white">{profile.initials}</div>
            <div className="min-w-0"><p className="truncate text-lg font-semibold text-white">{profile.displayName}</p><p className="text-xs text-zinc-500">{profile.country} · {profile.primaryPlatform.toUpperCase()}</p></div>
          </div>
          <VerificationBadge status={version.verificationStatus} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-valorant/30 px-2.5 py-1 text-[11px] text-valorant">{profile.publicRank ?? "高分段"}</span>
          {version.styleTags.slice(0, 2).map((tag) => <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-zinc-500">{tag}</span>)}
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">{version.titleZh}</h3>
        <p className="mt-1 text-xs text-zinc-600">{version.titleEn}</p>
        <p className="mt-4 text-sm leading-6 text-zinc-400">{version.summaryZh}</p>
        <div className="mt-5 rounded-md border border-white/10 bg-black/45 p-3">
          <div className="flex items-center justify-between gap-3 text-xs text-zinc-600"><span>完整导入代码</span><span>核实 {version.lastVerifiedAt}</span></div>
          <code className="mt-2 block overflow-hidden text-ellipsis whitespace-nowrap text-xs text-zinc-300">{version.code}</code>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <CopyButton value={version.code} disabled={!validation.valid} invalidReason={validation.reasons.join("；")} compact />
            <button type="button" onClick={onDetails} data-streamer-detail-trigger={`${profile.streamerId}-${version.id}`} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md border border-white/15 px-3 py-2 text-xs font-semibold text-white transition hover:border-white/45 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">查看详细分析</button>
          </div>
        </div>
        <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-5 text-zinc-600">公开设置参考 · HAO 尚未实战测试 · 下次复核 {profile.nextReviewAt}</p>
      </div>
    </article>
  );
}
