import Link from "next/link";

export default function CrosshairNotFound() {
  return (
    <div className="site-container flex min-h-[62vh] items-center py-16">
      <div className="w-full border-y border-white/10 py-14 sm:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-valorant">404 / Crosshair Library</p>
        <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">未找到这个准星</h1>
        <p className="mt-2 text-base text-zinc-500">Crosshair not found</p>
        <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400">
          这个准星可能尚未收录，或链接已经更新。你可以返回准星库继续浏览 HAO 测试过的准星。
        </p>
        <Link
          href="/crosshairs"
          className="btn-secondary mt-7 gap-2"
        >
          返回准星库 <span className="text-xs opacity-60">Back to Crosshair Library</span>
        </Link>
      </div>
    </div>
  );
}
