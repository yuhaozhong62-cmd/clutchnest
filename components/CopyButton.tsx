"use client";

import { useState } from "react";

type CopyButtonProps = {
  value: string;
};

export function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
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

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "已复制准星代码 / Crosshair code copied" : "复制准星代码 / Copy crosshair code"}
      className="inline-flex min-w-28 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white transition duration-300 hover:border-white/70 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      <span aria-live="polite">{copied ? (
        <span>
          已复制 ✓ <span className="text-zinc-400">Copied ✓</span>
        </span>
      ) : (
        <span>
          复制代码 <span className="text-zinc-400">Copy Code</span>
        </span>
      )}</span>
    </button>
  );
}
