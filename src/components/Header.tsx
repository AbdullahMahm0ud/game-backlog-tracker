import useGames from "../hooks/useGames"

const Header = ({ onAdd }: { onAdd: () => void }) => {
  const { games } = useGames()
  const hours = Math.round(games.reduce((sum, g) => sum + g.hours, 0))
  const rated = games.filter(g => g.rating > 0)
  const average = rated.length ? (rated.reduce((sum, g) => sum + g.rating, 0) / rated.length).toFixed(1) : "none yet"

  return (
    <header className="header">
      <div>
        <h1>Game backlog</h1>
        <p className="header__stats">{games.length} games, {hours} hours played, average rating {average}</p>
      </div>
      <button className="btn btn--primary" onClick={onAdd}>Add game</button>
    </header>
  )
}

export default Header
