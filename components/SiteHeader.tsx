"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GlobalSearchDialog } from "@/components/search/GlobalSearchDialog";
import { site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function openFromShortcut(event: KeyboardEvent) {
      const target = event.target;
      const isTyping = target instanceof HTMLElement && target.matches("input, textarea, select, [contenteditable='true']");
      if (isTyping) return;
      if (event.key === "/" || ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === "k")) {
        event.preventDefault();
        lastFocusRef.current = document.activeElement as HTMLElement | null;
        setSearchOpen(true);
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", openFromShortcut);
    return () => window.removeEventListener("keydown", openFromShortcut);
  }, []);

  function openSearch(trigger: HTMLElement) {
    lastFocusRef.current = trigger;
    setSearchOpen(true);
    setIsOpen(false);
  }

  function closeSearch() {
    setSearchOpen(false);
    window.requestAnimationFrame(() => lastFocusRef.current?.focus());
  }

  return (
    <header
      className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#08090a]/90 backdrop-blur-md supports-[backdrop-filter]:bg-[#08090a]/78"
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      <div className="site-container flex h-[68px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 rounded-sm focus-visible:outline-none" aria-label="ClutchNest 首页 / Home" onClick={() => setIsOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/15 bg-[#f1f2f4] text-xs font-black text-black transition-colors duration-150 group-hover:border-white group-hover:bg-white">
            CN
          </span>
          <span className="text-sm font-semibold tracking-[0.08em] text-white">CLUTCHNEST</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {site.nav.map((item) => (
              <NavLink key={item.href} item={item} active={item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)} />
            ))}
          </nav>

          <button type="button" aria-label="打开全站搜索" onClick={(event) => openSearch(event.currentTarget)} className="btn-ghost min-h-10 border border-white/10 px-3">
            搜索
          </button>

          <button
          type="button"
          aria-label={isOpen ? "关闭导航菜单 / Close navigation menu" : "打开导航菜单 / Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((value) => !value)}
          className="group inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-zinc-300 transition duration-200 hover:border-white/25 hover:text-white focus-visible:outline-none md:hidden"
        >
          <span className="flex w-4 flex-col gap-1.5" aria-hidden="true">
            <span className={`h-px bg-current transition duration-300 ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px bg-current transition duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`h-px bg-current transition duration-300 ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        className={`overflow-hidden border-t border-white/[0.07] bg-[#08090a] transition-all duration-200 md:hidden ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="site-container grid gap-1 py-3" aria-label="Mobile navigation">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
              className={`relative rounded-md px-3 py-3 text-sm transition duration-150 focus-visible:outline-none ${
                (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
                  ? "bg-white/[0.045] font-semibold text-white before:absolute before:inset-y-3 before:left-0 before:w-px before:bg-valorant"
                  : "text-zinc-400 hover:bg-white/[0.03] hover:text-white"
              }`}
            >
              {item.labelCn}
            </Link>
          ))}
        </nav>
      </div>
      <GlobalSearchDialog open={searchOpen} onClose={closeSearch} />
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
      className={`group relative px-3 py-2 text-sm transition-colors duration-150 focus-visible:outline-none ${
        active ? "font-medium text-white" : "text-zinc-400 hover:text-white"
      }`}
    >
      {item.labelCn}
      <span
        className={`absolute inset-x-3 -bottom-[14px] h-px bg-valorant transition-opacity duration-150 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </Link>
  );
}
