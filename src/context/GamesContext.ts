import { createContext, type Dispatch } from "react"
import type { Game, GameInput } from "../types"

export type Action =
  | { type: "ADD"; game: Game }
  | { type: "UPDATE"; id: string; changes: Partial<GameInput> }
  | { type: "REMOVE"; id: string }

export const gamesReducer = (games: Game[], action: Action): Game[] => {
  switch (action.type) {
    case "ADD":
      return [action.game, ...games]
    case "UPDATE":
      return games.map(g => (g.id === action.id ? { ...g, ...action.changes } : g))
    case "REMOVE":
      return games.filter(g => g.id !== action.id)
  }
}

export type GamesContextType = { games: Game[]; dispatch: Dispatch<Action> }
export const GamesContext = createContext<GamesContextType | null>(null)
