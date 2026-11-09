import type { GameInput } from "./types"

const g = (title: string, platform: string, genre: string, status: GameInput["status"], rating: number, hours: number, notes: string): GameInput =>
  ({ title, platform, genre, status, rating, hours, notes, cover: "" })

export const SAMPLE_GAMES: GameInput[] = [
  g("Hades", "PC", "Roguelike", "completed", 5, 62, "Finished the true ending. Try the heat system next."),
  g("Celeste", "Switch", "Platformer", "completed", 5, 14, "B-sides are brutal but fair."),
  g("Elden Ring", "PC", "Action RPG", "playing", 4, 38, "Stuck on the Mohgwyn boss. Respec to a bleed build."),
  g("Stardew Valley", "PC", "Farming sim", "playing", 5, 120, "Year 3. Working on the community center."),
  g("Outer Wilds", "PC", "Exploration", "completed", 5, 17, "Go in blind."),
  g("Disco Elysium", "PC", "RPG", "backlog", 0, 0, "Everyone says play it in one sitting per day."),
  g("Hollow Knight", "Switch", "Metroidvania", "backlog", 0, 2, "Got the Mantis Claw, then life happened."),
  g("God of War Ragnarök", "PlayStation", "Action", "backlog", 0, 0, "Wait for a sale."),
]
