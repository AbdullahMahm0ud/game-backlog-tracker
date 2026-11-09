export const STATUSES = ["playing", "backlog", "completed"] as const
export type Status = (typeof STATUSES)[number]
export const STATUS_LABEL: Record<Status, string> = { playing: "Playing", backlog: "Backlog", completed: "Completed" }
export const PLATFORMS = ["PC", "PlayStation", "Xbox", "Switch", "Mobile", "Other"] as const

export type Game = {
  id: string
  title: string
  platform: string
  genre: string
  status: Status
  rating: number // 0 = unrated, 1-5 stars
  hours: number
  notes: string
  cover: string // image URL, empty = generated cover
  addedAt: number
}
export type GameInput = Omit<Game, "id" | "addedAt">

// id and timestamp are created here, not in the reducer, so the reducer stays pure
export const newGame = (input: GameInput): Game => ({ ...input, id: crypto.randomUUID(), addedAt: Date.now() })

export type SortKey = "recent" | "title" | "rating" | "hours"
export type Filters = { q: string; status: Status | "all"; platform: string; minRating: number; sort: SortKey }
