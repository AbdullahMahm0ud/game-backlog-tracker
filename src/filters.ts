import type { Filters, Game } from "./types"

export const defaultFilters: Filters = { q: "", status: "all", platform: "all", minRating: 0, sort: "recent" }

export const applyFilters = (games: Game[], f: Filters): Game[] => {
  const q = f.q.trim().toLowerCase()
  return games
    .filter(g =>
      (f.status === "all" || g.status === f.status) &&
      (f.platform === "all" || g.platform === f.platform) &&
      g.rating >= f.minRating &&
      (!q || `${g.title} ${g.genre} ${g.notes}`.toLowerCase().includes(q)))
    .sort((a, b) =>
      f.sort === "title" ? a.title.localeCompare(b.title)
      : f.sort === "rating" ? b.rating - a.rating
      : f.sort === "hours" ? b.hours - a.hours
      : b.addedAt - a.addedAt)
}
