import { CopyButton } from "@/components/CopyButton";
import { ProCrosshairPreview } from "@/components/crosshairs/ProCrosshairPreview";
import { VerificationBadge } from "@/components/crosshairs/VerificationBadge";
import { validateValorantCrosshairCode } from "@/lib/crosshairCode";
import type { CrosshairVersion, StreamerProfile } from "@/lib/data/crosshairTeams/types";

export function StreamerCrosshairCard({ profile, version, onDetails }: { profile: StreamerProfile; version: CrosshairVersion; onDetails: () => void }) {
  const validation = version.code ? validateValorantCrosshairCode(version.code) : { valid: false, reasons: ["暂无完整代码"] };
  return (
    <article className="surface-card flex min-w-0 flex-col overflow-hidden">
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
          <span className="content-tag border-valorant/30 text-valorant">{profile.publicRank ?? "高分段"}</span>
          {version.styleTags.slice(0, 1).map((tag) => <span key={tag} className="content-tag">{tag}</span>)}
        </div>
        <h3 className="mt-4 break-words text-xl font-semibold leading-7 text-white">{version.titleZh}</h3>
        <p className="mt-1 text-xs text-zinc-500">{version.titleEn}</p>
        <p className="mt-4 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-zinc-400">{version.summaryZh}</p>
        <div className="crosshair-code-panel mt-auto pt-3">
          <div className="flex items-center justify-between gap-3 text-xs text-zinc-500"><span>完整导入代码</span><span>核实 {version.lastVerifiedAt}</span></div>
          <code className="mt-2 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-mono text-xs text-zinc-300" title={version.code}>{version.code}</code>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <CopyButton value={version.code} disabled={!validation.valid} invalidReason={validation.reasons.join("；")} compact />
            <button type="button" onClick={onDetails} data-streamer-detail-trigger={`${profile.streamerId}-${version.id}`} className="btn-ghost min-h-11 flex-1 border border-white/10 px-3 text-xs">查看详细分析</button>
          </div>
        </div>
        <p className="mt-4 border-t border-white/[0.08] pt-4 text-xs leading-5 text-zinc-500">{profile.country} · {version.verificationStatus === "verified" ? "已验证" : version.verificationStatus === "likely" ? "较可信" : "待核实"} · 下次复核 {profile.nextReviewAt}</p>
      </div>
    </article>
  );
}
