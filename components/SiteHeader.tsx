"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl supports-[backdrop-filter]:bg-black/55"
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40" aria-label="ClutchNest 首页 / Home" onClick={() => setIsOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white text-sm font-black text-black transition duration-300 group-hover:border-valorant group-hover:bg-valorant group-hover:text-white">
            CN
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-[0.18em] text-white">CLUTCHNEST</span>
            <span className="block text-[11px] text-mist">{site.taglineEn}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {site.nav.map((item) => (
            <NavLink key={item.href} item={item} active={item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)} />
          ))}
        </nav>

        <button
          type="button"
          aria-label={isOpen ? "关闭导航菜单 / Close navigation menu" : "打开导航菜单 / Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((value) => !value)}
          className="group inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] transition duration-300 hover:border-white/40 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:hidden"
        >
          <span className="flex w-4 flex-col gap-1.5" aria-hidden="true">
            <span className={`h-px bg-current transition duration-300 ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px bg-current transition duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`h-px bg-current transition duration-300 ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        className={`overflow-hidden border-t border-white/10 transition-all duration-300 md:hidden ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto grid max-w-6xl gap-1 px-5 py-3" aria-label="Mobile navigation">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
              className={`rounded-md px-3 py-3 text-sm transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
                  ? "bg-white text-black"
                  : "text-zinc-300 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              {item.labelCn}
              <span className="ml-2 text-xs opacity-60">{item.labelEn}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  item,
  active
}: {
  item: (typeof site.nav)[number];
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={`group relative rounded-md px-4 py-2 text-sm transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
        active ? "text-white" : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
      }`}
    >
      {item.labelCn}
      <span className="ml-1 text-zinc-600 transition group-hover:text-zinc-400">{item.labelEn}</span>
      <span
        className={`absolute inset-x-4 -bottom-px h-px bg-valorant transition duration-300 ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-70"
        }`}
      />
    </Link>
  );
}
