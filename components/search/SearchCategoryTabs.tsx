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
        <button key={option.id} type="button" aria-pressed={active === option.id} onClick={() => onChange(option.id)} className="filter-pill shrink-0 px-3 text-sm focus-visible:outline-none">
          {option.label} <span className="text-zinc-500">{counts[option.id]}</span>
        </button>
      ))}
    </div>
  );
}
