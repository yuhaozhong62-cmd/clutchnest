import { CopyButton } from "@/components/CopyButton";
import { ProCrosshairPreview } from "@/components/crosshairs/ProCrosshairPreview";
import { VerificationBadge, VersionBadge } from "@/components/crosshairs/VerificationBadge";
import { validateValorantCrosshairCode } from "@/lib/crosshairCode";
import type { CrosshairVersion, ProPlayerCrosshairProfile } from "@/lib/data/crosshairTeams/types";

export function ProCrosshairCard({
  profile,
  version,
  onDetails
}: {
  profile: ProPlayerCrosshairProfile;
  version: CrosshairVersion;
  onDetails: () => void;
}) {
  const validation = version.code ? validateValorantCrosshairCode(version.code) : { valid: false, reasons: ["暂无完整代码"] };
  const copyAvailable = validation.valid && version.verificationStatus !== "verificationPending";

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-panel/80 transition duration-200 hover:border-white/25">
      <ProCrosshairPreview settings={version.normalizedSettings} label={`${profile.displayName} ${version.titleZh}`} />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center border border-white/15 bg-white/[0.04] text-xs font-black text-white" aria-hidden="true">
              {profile.initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-white">{profile.displayName}</p>
              <p className="text-xs text-zinc-500">{profile.nameZh ? `${profile.nameZh} · ` : ""}{profile.realNameZh}</p>
            </div>
          </div>
          <span className={`shrink-0 text-[11px] font-semibold ${profile.isCurrentRoster ? "text-valorant" : "text-zinc-500"}`}>
            {profile.isCurrentRoster ? "EDG 现役" : "已离队"}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <VersionBadge status={version.versionStatus} />
          <VerificationBadge status={version.verificationStatus} />
        </div>

        <h3 className="mt-4 text-xl font-semibold text-white">{version.titleZh}</h3>
        <p className="mt-1 text-xs text-zinc-600">{version.titleEn}</p>
        <p className="mt-4 text-sm leading-6 text-zinc-400">{version.summaryZh}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {version.styleTags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-zinc-500">{tag}</span>
          ))}
        </div>

        <div className="mt-5 min-w-0 rounded-md border border-white/10 bg-black/45 p-3">
          <div className="flex items-center justify-between gap-3 text-xs text-zinc-600">
            <span>完整导入代码</span>
            <span>{version.lastVerifiedAt ? `核实 ${version.lastVerifiedAt}` : "日期待核实"}</span>
          </div>
          {version.code ? (
            <code className="mt-2 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-zinc-300">{version.code}</code>
          ) : (
            <p className="mt-2 text-sm text-amber-200">暂未找到足够可靠的近期完整代码</p>
          )}
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <CopyButton value={version.code} disabled={!copyAvailable} invalidReason={validation.reasons.join("；")} compact />
            <button
              type="button"
              onClick={onDetails}
              aria-label={`查看 ${profile.displayName} 准星详细参数`}
              data-crosshair-detail-trigger={`${profile.playerId}-${version.id}`}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md border border-white/15 px-3 py-2 text-xs font-semibold text-white transition hover:border-white/45 hover:bg-white/[0.06] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              查看详细参数
            </button>
          </div>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-zinc-600">
          <p>来源：{version.sources.map((source) => source.sourceType === "database" ? "专业数据库" : source.sourceType === "stream" ? "公开直播" : "赛事资料").join(" / ") || "待补充"}</p>
          <p className="mt-1">HAO 尚未完成实战测试，当前描述基于参数和视觉特征。</p>
        </div>
      </div>
    </article>
  );
}
