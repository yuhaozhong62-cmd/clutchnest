"use client";

import { useEffect, useRef } from "react";
import { CopyButton } from "@/components/CopyButton";
import { ProCrosshairPreview } from "@/components/crosshairs/ProCrosshairPreview";
import { getVersionLabel, VerificationBadge } from "@/components/crosshairs/VerificationBadge";
import { validateValorantCrosshairCode } from "@/lib/crosshairCode";
import type { CrosshairVersion, NormalizedCrosshairSettings, ProPlayerCrosshairProfile } from "@/lib/data/crosshairTeams/types";

export function ProCrosshairDetailDrawer({
  profile,
  version,
  onSelectVersion,
  onClose
}: {
  profile: ProPlayerCrosshairProfile;
  version: CrosshairVersion;
  onSelectVersion: (version: CrosshairVersion) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const validation = version.code ? validateValorantCrosshairCode(version.code) : { valid: false, reasons: ["暂无完整代码"] };
  const copyAvailable = validation.valid && version.verificationStatus !== "verificationPending";

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/82" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pro-crosshair-detail-title"
        className="absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-[14px] border border-white/15 bg-[#0c0d0f] shadow-[0_20px_70px_rgba(0,0,0,.5)] sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[min(42rem,92vw)] sm:rounded-none sm:border-y-0 sm:border-r-0"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/[0.08] bg-[#0c0d0f]/96 px-5 py-4 backdrop-blur-md sm:px-7">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-valorant">{profile.isCurrentRoster ? `${profile.teamId.toUpperCase()} 现役选手` : `${profile.teamId.toUpperCase()} 历史资料`}</p>
            <h2 id="pro-crosshair-detail-title" className="truncate text-lg font-semibold text-white">{profile.displayName} · {version.titleZh}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="关闭准星详情"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-white/15 text-xl text-zinc-400 transition hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            ×
          </button>
        </header>

        <div className="space-y-8 px-5 py-6 sm:px-7 sm:py-8">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center border border-white/15 bg-white/[0.04] text-sm font-black">{profile.initials}</div>
            <div>
              <p className="font-semibold text-white">{profile.displayName}</p>
              <p className="text-xs text-zinc-500">{profile.nameZh ? `${profile.nameZh} · ` : ""}{profile.realNameZh} · {profile.role ?? "位置未固定"}</p>
            </div>
            <div className="ml-auto"><VerificationBadge status={version.verificationStatus} /></div>
          </div>

          {profile.crosshairs.length > 1 ? (
            <div className="flex gap-2 overflow-x-auto pb-1" aria-label="准星版本">
              {profile.crosshairs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`切换到${getVersionLabel(item.versionStatus)}准星版本`}
                  onClick={() => onSelectVersion(item)}
                  aria-pressed={item.id === version.id}
                  className="filter-pill shrink-0 px-3 text-xs focus-visible:outline-none"
                >
                  {getVersionLabel(item.versionStatus)}
                </button>
              ))}
            </div>
          ) : null}

          <ProCrosshairPreview settings={version.normalizedSettings} label={`${profile.displayName} ${version.titleZh}`} large />

          <section className="rounded-md border border-white/[0.08] bg-black/25 p-4">
            <p className="text-xs text-zinc-500">完整导入代码</p>
            {version.code ? (
              <code className="mt-3 block break-all font-mono text-xs leading-6 text-zinc-300">{version.code}</code>
            ) : (
              <p className="mt-3 text-sm text-amber-200">暂未找到足够可靠的近期完整代码</p>
            )}
            <div className="mt-4"><CopyButton value={version.code} disabled={!copyAvailable} invalidReason={validation.reasons.join("；")} /></div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white">详细参数</h3>
            <SettingsTable settings={version.normalizedSettings} />
          </section>

          <div className="grid gap-6 sm:grid-cols-2">
            <InfoList title="适合人群" items={version.recommendedFor} />
            <InfoList title="优点" items={version.strengths} />
            <InfoList title="可能的缺点" items={version.weaknesses} />
            <section>
              <h3 className="text-sm font-semibold text-white">HAO 测试</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">尚未测试。当前描述基于准星参数和视觉特征，不代表实战结论。</p>
              <p className="mt-2 text-xs leading-5 text-zinc-600">职业选手设置仅供参考；使用相同准星不会获得相同竞技表现。</p>
            </section>
          </div>

          <section className="border-t border-white/10 pt-6">
            <h3 className="text-sm font-semibold text-white">核实记录与来源</h3>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <Meta label="最后核实" value={version.lastVerifiedAt ?? "待核实"} />
              <Meta label="名单核实" value={profile.rosterVerifiedAt} />
              <Meta label="版本状态" value={getVersionLabel(version.versionStatus)} />
              <Meta label="HAO 测试" value="尚未测试" />
            </dl>
            {version.verificationNotes ? <p className="mt-5 text-sm leading-7 text-zinc-400">{version.verificationNotes}</p> : null}
            <div className="mt-5 grid gap-2">
              {version.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="rounded-md border border-white/10 p-3 text-sm text-zinc-400 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                  <span className="block font-medium">{source.title}</span>
                  <span className="mt-1 block text-xs text-zinc-600">{source.sourceType} · 访问 {source.accessedAt}</span>
                </a>
              ))}
            </div>
          </section>

          <ImportInstructions />
        </div>
      </div>
    </div>
  );
}

function SettingsTable({ settings }: { settings?: NormalizedCrosshairSettings }) {
  const rows: Array<[string, string]> = settings ? [
    ["颜色", settings.colorName ? `${settings.colorName}${settings.colorHex ? ` · ${settings.colorHex}` : ""}` : "未公开"],
    ["描边", formatToggle(settings.outlinesEnabled)],
    ["描边不透明度 / 厚度", formatPair(settings.outlineOpacity, settings.outlineThickness)],
    ["中心点", formatToggle(settings.centerDotEnabled)],
    ["中心点不透明度 / 厚度", formatPair(settings.centerDotOpacity, settings.centerDotThickness)],
    ["内线", formatToggle(settings.innerLinesEnabled)],
    ["内线不透明度", formatNumber(settings.innerLineOpacity)],
    ["内线长度 / 垂直长度", formatPair(settings.innerLineLength, settings.innerLineVerticalLength)],
    ["内线厚度 / 偏移", formatPair(settings.innerLineThickness, settings.innerLineOffset)],
    ["移动误差 / 射击误差", `${formatToggle(settings.innerMovementError)} / ${formatToggle(settings.innerFiringError)}`],
    ["外线", formatToggle(settings.outerLinesEnabled)],
    ["狙击镜准星", settings.sniperCenterDotEnabled === undefined ? "未公开" : formatToggle(settings.sniperCenterDotEnabled)]
  ] : [["参数状态", "未公开 / Unknown"]];

  return (
    <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
      {rows.map(([label, value]) => (
        <div key={label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 py-3 text-sm">
          <dt className="text-zinc-500">{label}</dt>
          <dd className="text-right text-zinc-200">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function formatToggle(value?: boolean) {
  return value === undefined ? "未公开" : value ? "开启" : "关闭";
}

function formatNumber(value?: number) {
  return value === undefined ? "未公开" : String(value);
}

function formatPair(first?: number, second?: number) {
  return `${formatNumber(first)} / ${formatNumber(second)}`;
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      {items.length ? <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-400">{items.map((item) => <li key={item}>· {item}</li>)}</ul> : <p className="mt-3 text-sm text-zinc-600">未公开 / Unknown</p>}
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs text-zinc-600">{label}</dt><dd className="mt-1 text-zinc-300">{value}</dd></div>;
}

function ImportInstructions() {
  return (
    <section className="border-t border-white/10 pt-6">
      <h3 className="text-sm font-semibold text-white">导入准星代码</h3>
      <ol className="mt-4 grid gap-3 text-sm text-zinc-400 sm:grid-cols-5">
        {["打开 VALORANT 设置", "进入准星", "选择导入配置", "粘贴完整代码", "确认导入"].map((step, index) => (
          <li key={step}><span className="mr-2 text-valorant">{String(index + 1).padStart(2, "0")}</span>{step}</li>
        ))}
      </ol>
    </section>
  );
}
