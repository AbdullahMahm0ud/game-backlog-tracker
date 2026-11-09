import { useEffect, useRef, useState, type FormEvent } from "react"
import { PLATFORMS, STATUSES, STATUS_LABEL, type Game, type GameInput, type Status } from "../types"
import Cover from "./Cover"
import StarRating from "./StarRating"

const blank: GameInput = { title: "", platform: "PC", genre: "", status: "backlog", rating: 0, hours: 0, notes: "", cover: "" }

const toInput = ({ title, platform, genre, status, rating, hours, notes, cover }: Game): GameInput =>
  ({ title, platform, genre, status, rating, hours, notes, cover })

type Props = { game?: Game; onSave: (input: GameInput) => void; onClose: () => void }

const GameForm = ({ game, onSave, onClose }: Props) => {
  const [form, setForm] = useState<GameInput>(game ? toInput(game) : blank)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!dialog.current?.open) dialog.current?.showModal()
  }, [])

  const set = <K extends keyof GameInput>(key: K, value: GameInput[K]) => setForm(f => ({ ...f, [key]: value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSave({ ...form, title: form.title.trim(), cover: form.cover.trim() })
  }

  return (
    <dialog ref={dialog} className="modal" onClose={onClose}>
      <form className="form" onSubmit={submit}>
        <h2>{game ? "Edit game" : "Add game"}</h2>
        <div className="form__cover"><Cover key={form.cover} title={form.title || "New game"} src={form.cover} /></div>
        <label>Title
          <input required value={form.title} onChange={e => set("title", e.target.value)} />
        </label>
        <label>Cover image URL
          <input type="url" placeholder="https://" value={form.cover} onChange={e => set("cover", e.target.value)} />
        </label>
        <div className="form__row">
          <label>Platform
            <select value={form.platform} onChange={e => set("platform", e.target.value)}>
              {PLATFORMS.map(p => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label>List
            <select value={form.status} onChange={e => set("status", e.target.value as Status)}>
              {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
            </select>
          </label>
        </div>
        <div className="form__row">
          <label>Genre
            <input value={form.genre} onChange={e => set("genre", e.target.value)} />
          </label>
          <label>Hours played
            <input type="number" min="0" step="0.5" value={form.hours} onChange={e => set("hours", Math.max(0, Number(e.target.value)))} />
          </label>
        </div>
        <div className="form__field">
          <span>Rating</span>
          <StarRating value={form.rating} onChange={rating => set("rating", rating)} />
        </div>
        <label>Notes
          <textarea rows={4} value={form.notes} onChange={e => set("notes", e.target.value)} />
        </label>
        <div className="form__actions">
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary">Save game</button>
        </div>
      </form>
    </dialog>
  )
}

export default GameForm
