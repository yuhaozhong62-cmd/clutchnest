import type { CrosshairVersionStatus, VerificationStatus } from "@/lib/data/crosshairTeams/types";

const verificationLabels: Record<VerificationStatus, string> = {
  verified: "已验证 ✓",
  likely: "较可信",
  unverified: "未验证",
  verificationPending: "待核实 !"
};

const versionLabels: Record<CrosshairVersionStatus, string> = {
  primary: "近期版本 / Latest",
  alternative: "其他常用 / Alternative",
  previous: "历史版本 / History",
  verificationPending: "待核实 / Pending"
};

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${status === "verified" ? "border-emerald-400/30 text-emerald-300" : status === "likely" ? "border-white/15 text-zinc-300" : "border-amber-400/30 text-amber-200"}`}>
      {verificationLabels[status]}
    </span>
  );
}

export function VersionBadge({ status }: { status: CrosshairVersionStatus }) {
  return <span className="inline-flex rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-zinc-400">{versionLabels[status]}</span>;
}

export function getVersionLabel(status: CrosshairVersionStatus) {
  return versionLabels[status];
}
