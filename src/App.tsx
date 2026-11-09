import { useMemo, useState, type ReactElement } from "react"
import Header from "./components/Header"
import FilterBar from "./components/FilterBar"
import GameCard from "./components/GameCard"
import GameForm from "./components/GameForm"
import useGames from "./hooks/useGames"
import { applyFilters, defaultFilters } from "./filters"
import { SAMPLE_GAMES } from "./samples"
import { newGame, type Game, type GameInput } from "./types"

function App() {
  const { games, dispatch } = useGames()
  const [filters, setFilters] = useState(defaultFilters)
  const [editing, setEditing] = useState<Game | "new" | null>(null)
  const shown = useMemo(() => applyFilters(games, filters), [games, filters])

  const save = (input: GameInput) => {
    if (editing && editing !== "new") dispatch({ type: "UPDATE", id: editing.id, changes: input })
    else dispatch({ type: "ADD", game: newGame(input) })
    setEditing(null)
  }

  let content: ReactElement
  if (!games.length) {
    content = (
      <div className="empty">
        <h2>Your library is empty</h2>
        <p>Add the first game you want to play, or start with a few examples.</p>
        <div className="empty__actions">
          <button className="btn btn--primary" onClick={() => setEditing("new")}>Add a game</button>
          <button className="btn" onClick={() => SAMPLE_GAMES.forEach(game => dispatch({ type: "ADD", game: newGame(game) }))}>Load sample games</button>
        </div>
      </div>
    )
  } else if (!shown.length) {
    content = (
      <div className="empty">
        <h2>No games match these filters</h2>
        <button className="btn" onClick={() => setFilters(defaultFilters)}>Reset filters</button>
      </div>
    )
  } else {
    content = (
      <div className="grid">
        {shown.map(game => <GameCard key={game.id} game={game} dispatch={dispatch} onEdit={setEditing} />)}
      </div>
    )
  }

  return (
    <>
      <Header onAdd={() => setEditing("new")} />
      <main className="main">
        {games.length > 0 && <FilterBar filters={filters} onChange={setFilters} />}
        {content}
      </main>
      <footer className="footer">Your list is saved in this browser only.</footer>
      {editing && <GameForm game={editing === "new" ? undefined : editing} onSave={save} onClose={() => setEditing(null)} />}
    </>
  )
}

export default App
