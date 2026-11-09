import { useEffect, useReducer, type ReactNode } from "react"
import { GamesContext, gamesReducer } from "./GamesContext"
import type { Game } from "../types"

const KEY = "game-backlog-tracker:games"

const load = (): Game[] => {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]")
    return Array.isArray(data) ? (data as Game[]) : []
  } catch {
    return []
  }
}

export const GamesProvider = ({ children }: { children: ReactNode }) => {
  const [games, dispatch] = useReducer(gamesReducer, undefined, load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(games))
    } catch {
      // storage is full or blocked: the app still works, it just won't persist
    }
  }, [games])

  return <GamesContext.Provider value={{ games, dispatch }}>{children}</GamesContext.Provider>
}
