import { searchTypeLabels, searchTypeOrder, type SearchContentType } from "@/lib/search/types";

type Counts = Record<"all" | SearchContentType, number>;

export function SearchCategoryTabs({ active, counts, onChange }: { active: "all" | SearchContentType; counts: Counts; onChange: (type: "all" | SearchContentType) => void }) {
  const options: Array<{ id: "all" | SearchContentType; label: string }> = [
    { id: "all", label: "全部" },
    ...searchTypeOrder.map((id) => ({ id, label: searchTypeLabels[id] }))
  ];
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" aria-label="搜索结果分类">
      {options.filter((option) => option.id === "all" || counts[option.id] > 0).map((option) => (
        <button key={option.id} type="button" aria-pressed={active === option.id} onClick={() => onChange(option.id)} className={`min-h-10 shrink-0 rounded-md border px-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${active === option.id ? "border-white bg-white text-black" : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"}`}>
          {option.label} <span className={active === option.id ? "text-black/60" : "text-zinc-600"}>{counts[option.id]}</span>
        </button>
      ))}
    </div>
  );
}
