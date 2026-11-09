import { useState } from "react"

const hueOf = (text: string) => [...text].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7)

type Props = { title: string; src: string }

// Shows the cover URL, or a generated cover (colour from the title) when it is empty or fails to load.
// Call sites pass key={src} so a new URL gets a fresh attempt.
const Cover = ({ title, src }: Props) => {
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    return <img className="cover" src={src} alt={`${title} cover`} loading="lazy" onError={() => setFailed(true)} />
  }

  const hue = hueOf(title)
  const initials = title.split(/\s+/).slice(0, 2).map(word => word.charAt(0)).join("").toUpperCase()
  return (
    <div
      className="cover cover--fallback"
      role="img"
      aria-label={`${title} cover`}
      style={{ background: `linear-gradient(150deg, hsl(${hue} 55% 40%), hsl(${(hue + 70) % 360} 60% 18%))` }}
    >
      {initials}
    </div>
  )
}

export default Cover
