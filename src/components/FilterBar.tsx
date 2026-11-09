import useGames from "../hooks/useGames"
import { defaultFilters } from "../filters"
import { PLATFORMS, STATUSES, STATUS_LABEL, type Filters, type SortKey } from "../types"

type Props = { filters: Filters; onChange: (filters: Filters) => void }

const FilterBar = ({ filters, onChange }: Props) => {
  const { games } = useGames()
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => onChange({ ...filters, [key]: value })
  const count = (s: Filters["status"]) => (s === "all" ? games.length : games.filter(g => g.status === s).length)

  return (
    <section className="filters" aria-label="Filters">
      <div className="tabs" role="group" aria-label="Lists">
        {(["all", ...STATUSES] as const).map(s => (
          <button key={s} className={`tab tab--${s}`} aria-pressed={filters.status === s} onClick={() => set("status", s)}>
            {s === "all" ? "All" : STATUS_LABEL[s]} <span className="tab__count">{count(s)}</span>
          </button>
        ))}
      </div>
      <div className="filters__row">
        <input type="search" aria-label="Search" placeholder="Search title, genre or notes" value={filters.q} onChange={e => set("q", e.target.value)} />
        <select aria-label="Platform" value={filters.platform} onChange={e => set("platform", e.target.value)}>
          <option value="all">Any platform</option>
          {PLATFORMS.map(p => <option key={p}>{p}</option>)}
        </select>
        <select aria-label="Minimum rating" value={filters.minRating} onChange={e => set("minRating", Number(e.target.value))}>
          <option value={0}>Any rating</option>
          {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+ stars</option>)}
        </select>
        <select aria-label="Sort by" value={filters.sort} onChange={e => set("sort", e.target.value as SortKey)}>
          <option value="recent">Recently added</option>
          <option value="title">Title A to Z</option>
          <option value="rating">Highest rated</option>
          <option value="hours">Most played</option>
        </select>
        <button className="btn" onClick={() => onChange(defaultFilters)}>Reset</button>
      </div>
    </section>
  )
}

export default FilterBar
