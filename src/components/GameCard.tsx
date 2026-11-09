import { memo, type Dispatch } from "react"
import type { Action } from "../context/GamesContext"
import { STATUSES, STATUS_LABEL, type Game, type GameInput, type Status } from "../types"
import Cover from "./Cover"
import StarRating from "./StarRating"

type Props = { game: Game; dispatch: Dispatch<Action>; onEdit: (game: Game) => void }

const GameCard = ({ game, dispatch, onEdit }: Props) => {
  const update = (changes: Partial<GameInput>) => dispatch({ type: "UPDATE", id: game.id, changes })

  const onDelete = () => {
    if (window.confirm(`Delete ${game.title}?`)) dispatch({ type: "REMOVE", id: game.id })
  }

  return (
    <article className="game" data-status={game.status}>
      <Cover key={game.cover} title={game.title} src={game.cover} />
      <div className="game__body">
        <h3>{game.title}</h3>
        <p className="game__meta">{game.platform}{game.genre && `, ${game.genre}`}</p>
        <StarRating value={game.rating} onChange={rating => update({ rating })} />
        <p className="game__hours">
          {Math.round(game.hours * 10) / 10} hours played
          <button className="btn btn--small" aria-label={`Add one hour to ${game.title}`} onClick={() => update({ hours: game.hours + 1 })}>+1 h</button>
        </p>
        {game.notes && <p className="game__notes">{game.notes}</p>}
        <select aria-label={`List for ${game.title}`} value={game.status} onChange={e => update({ status: e.target.value as Status })}>
          {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
        </select>
        <div className="game__actions">
          <button className="btn" onClick={() => onEdit(game)}>Edit</button>
          <button className="btn" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </article>
  )
}

export default memo(GameCard)
