"use client";

import { useState } from "react";

type CopyButtonProps = {
  value?: string;
  disabled?: boolean;
  invalidReason?: string;
  compact?: boolean;
};

export function CopyButton({ value, disabled = false, invalidReason, compact = false }: CopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const unavailable = disabled || !value;

  async function handleCopy() {
    if (unavailable || !value) return;
    let didCopy = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        didCopy = true;
      }
    } catch {
      didCopy = false;
    }

    if (!didCopy) {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      didCopy = document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setStatus(didCopy ? "copied" : "error");
    window.setTimeout(() => setStatus("idle"), didCopy ? 1800 : 2400);
  }

  const label = unavailable
    ? "准星待核实 / Code unavailable"
    : status === "copied"
      ? "已复制准星代码 / Crosshair code copied"
      : status === "error"
        ? "复制失败 / Copy failed"
        : "复制准星代码 / Copy crosshair code";

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={unavailable}
      aria-label={label}
      title={unavailable ? invalidReason : undefined}
      className={`inline-flex min-h-11 items-center justify-center rounded-md border px-3 py-2 text-xs font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${compact ? "min-w-24" : "min-w-32"} ${unavailable ? "cursor-not-allowed border-white/10 bg-white/[0.02] text-zinc-600" : status === "error" ? "border-red-500/50 bg-red-500/10 text-red-200" : "border-white/15 bg-white/[0.04] text-white hover:border-white/70 hover:bg-white hover:text-black active:scale-[0.98]"}`}
    >
      <span aria-live="polite">
        {unavailable ? "准星待核实" : status === "copied" ? "已复制 ✓" : status === "error" ? "复制失败，请重试" : "复制准星代码"}
      </span>
    </button>
  );
}
