type Props = { value: number; onChange?: (rating: number) => void }

// Read-only when onChange is missing. Clicking the current star clears the rating.
const StarRating = ({ value, onChange }: Props) => {
  const label = `Rating: ${value ? `${value} of 5` : "not rated"}`
  const stars = [1, 2, 3, 4, 5]

  if (!onChange) {
    return (
      <div className="stars" role="img" aria-label={label}>
        {stars.map(n => <span key={n} className={n <= value ? "star on" : "star"}>★</span>)}
      </div>
    )
  }

  return (
    <div className="stars" role="radiogroup" aria-label={label}>
      {stars.map(n => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={n <= value ? "star on" : "star"}
          onClick={() => onChange(value === n ? 0 : n)}
        >★</button>
      ))}
    </div>
  )
}

export default StarRating
