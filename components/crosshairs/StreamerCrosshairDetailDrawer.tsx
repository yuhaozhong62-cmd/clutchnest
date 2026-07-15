"use client";

import { useEffect, useRef } from "react";
import { CopyButton } from "@/components/CopyButton";
import { ProCrosshairPreview } from "@/components/crosshairs/ProCrosshairPreview";
import { VerificationBadge } from "@/components/crosshairs/VerificationBadge";
import { validateValorantCrosshairCode } from "@/lib/crosshairCode";
import type { CrosshairVersion, NormalizedCrosshairSettings, StreamerProfile } from "@/lib/data/crosshairTeams/types";

export function StreamerCrosshairDetailDrawer({ profile, version, onClose }: { profile: StreamerProfile; version: CrosshairVersion; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const validation = version.code ? validateValorantCrosshairCode(version.code) : { valid: false, reasons: ["暂无完整代码"] };
  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'));
      if (!items.length) return;
      if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1)?.focus(); }
      else if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0].focus(); }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/82" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="streamer-detail-title" className="absolute inset-x-0 bottom-0 max-h-[92vh] overflow-y-auto rounded-t-[14px] border border-white/15 bg-[#0c0d0f] shadow-[0_20px_70px_rgba(0,0,0,.5)] sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[min(42rem,94vw)] sm:rounded-none sm:border-y-0 sm:border-r-0">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/[0.08] bg-[#0c0d0f]/96 px-5 py-4 backdrop-blur-md sm:px-7">
          <div className="min-w-0"><p className="text-xs font-semibold text-valorant">高分主播公开设置</p><h2 id="streamer-detail-title" className="truncate text-lg font-semibold text-white">{profile.displayName} · {version.titleZh}</h2></div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="关闭准星详情" className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-white/15 text-xl text-zinc-400 transition hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">×</button>
        </header>
        <div className="space-y-8 px-5 py-6 sm:px-7 sm:py-8">
          <section className="flex flex-wrap items-center gap-3">
            <div className="grid h-12 w-12 place-items-center border border-white/15 bg-white/[0.04] text-sm font-black">{profile.initials}</div>
            <div><p className="font-semibold text-white">{profile.displayName}{profile.realName ? ` · ${profile.realName}` : ""}</p><p className="text-xs text-zinc-500">{profile.country} · {profile.streamLanguage} · {profile.ladderRegion}</p></div>
            <div className="ml-auto"><VerificationBadge status={version.verificationStatus} /></div>
          </section>
          <a href={profile.channelUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary min-h-10 px-3">打开 {profile.channelName} 频道 ↗</a>
          <ProCrosshairPreview settings={version.normalizedSettings} label={`${profile.displayName} ${version.titleZh}`} large />
          <section className="rounded-md border border-white/[0.08] bg-black/25 p-4"><p className="text-xs text-zinc-500">完整导入代码</p><code className="mt-3 block break-all font-mono text-xs leading-6 text-zinc-300">{version.code}</code><div className="mt-4"><CopyButton value={version.code} disabled={!validation.valid} invalidReason={validation.reasons.join("；")} /></div></section>
          <section><h3 className="text-lg font-semibold text-white">准星参数</h3><SettingsTable settings={version.normalizedSettings} /></section>
          {version.analysis ? <section><h3 className="text-lg font-semibold text-white">ClutchNest 原创分析</h3><dl className="mt-4 grid gap-4 sm:grid-cols-2">{Object.entries({"尺寸":version.analysis.size,"遮挡":version.analysis.occlusion,"背景可见度":version.analysis.backgroundVisibility,"远距离":version.analysis.longRange,"近距离":version.analysis.closeRange,"单点":version.analysis.tapFire,"短连发":version.analysis.burstFire,"扫射":version.analysis.spray,"新手适应":version.analysis.beginnerAdaptation,"瞄准习惯":version.analysis.aimingHabit}).map(([label,value]) => <div key={label} className="border-t border-white/10 pt-3"><dt className="text-xs text-zinc-600">{label}</dt><dd className="mt-2 text-sm leading-6 text-zinc-300">{value}</dd></div>)}</dl></section> : null}
          <div className="grid gap-6 sm:grid-cols-3"><InfoList title="适合人群" items={version.recommendedFor} /><InfoList title="优点" items={version.strengths} /><InfoList title="可能的缺点" items={version.weaknesses} /></div>
          <section className="border-l-2 border-valorant pl-5"><h3 className="text-sm font-semibold text-white">HAO 测试状态</h3><p className="mt-2 text-sm leading-6 text-zinc-400">尚未实战测试。当前内容基于公开代码、参数和视觉特征分析，不代表 HAO 的实战结论。</p></section>
          <section className="border-t border-white/10 pt-6"><h3 className="text-sm font-semibold text-white">活动、天梯与设置来源</h3><dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><Meta label="公开段位" value={profile.publicRank ?? "未记录"} /><Meta label="天梯状态" value={ladderStatusLabel(profile.ladderStatus)} /><Meta label="天梯核验" value={profile.rankVerifiedAt} /><Meta label="最近内容" value={profile.lastValorantContentAt ?? "未记录"} /></dl><div className="mt-5 grid gap-2">{[...profile.rankSources, ...profile.activitySources, ...version.sources].map((source) => <a key={`${source.url}-${source.title}`} href={source.url} target="_blank" rel="noopener noreferrer" className="rounded-md border border-white/10 p-3 text-sm text-zinc-400 transition hover:border-white/30 hover:text-white"><span className="block font-medium">{source.title}</span><span className="mt-1 block text-xs text-zinc-600">访问 {source.accessedAt}{source.publishedAt ? ` · 发布 ${source.publishedAt}` : ""}</span></a>)}</div></section>
          <p className="text-xs leading-6 text-zinc-600">公开设置会随时间变化。使用相同准星不会带来相同竞技表现；请根据自己的分辨率、视觉习惯和射击方式调整。</p>
        </div>
      </div>
    </div>
  );
}

function SettingsTable({ settings }: { settings?: NormalizedCrosshairSettings }) {
  const rows = settings ? [["颜色", [settings.colorName, settings.colorHex].filter(Boolean).join(" · ")], ["描边", yesNo(settings.outlinesEnabled)], ["中心点", yesNo(settings.centerDotEnabled)], ["内线", yesNo(settings.innerLinesEnabled)], ["内线长度 / 厚度 / 偏移", [settings.innerLineLength, settings.innerLineThickness, settings.innerLineOffset].map(numberOrUnknown).join(" / ")], ["外线", yesNo(settings.outerLinesEnabled)], ["移动误差 / 射击误差", `${yesNo(settings.innerMovementError)} / ${yesNo(settings.innerFiringError)}`]] : [["参数", "未公开"]];
  return <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">{rows.map(([label,value]) => <div key={label} className="grid grid-cols-2 gap-4 py-3 text-sm"><dt className="text-zinc-500">{label}</dt><dd className="text-right text-zinc-200">{value}</dd></div>)}</dl>;
}
function yesNo(value?: boolean) { return value === undefined ? "未公开" : value ? "开启" : "关闭"; }
function numberOrUnknown(value?: number) { return value === undefined ? "未公开" : String(value); }
function ladderStatusLabel(status: StreamerProfile["ladderStatus"]) { return status === "current-radiant" ? "当前 Radiant" : status === "recent-radiant" ? "近期 Radiant" : "高分 Immortal"; }
function InfoList({ title, items }: { title: string; items: string[] }) { return <section><h3 className="text-sm font-semibold text-white">{title}</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-400">{items.map((item) => <li key={item}>· {item}</li>)}</ul></section>; }
function Meta({ label, value }: { label: string; value: string }) { return <div><dt className="text-xs text-zinc-600">{label}</dt><dd className="mt-1 text-zinc-300">{value}</dd></div>; }
