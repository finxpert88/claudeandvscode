import { useEffect, useState } from 'react'

// Types out one phrase, or cycles through several if `loop` is set.
export default function TypingText({ phrases, speed = 60, pause = 1800, loop = false, startDelay = 0, className = '' }) {
  const list = Array.isArray(phrases) ? phrases : [phrases]
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [started, setStarted] = useState(startDelay === 0)

  useEffect(() => {
    if (started) return
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [started, startDelay])

  useEffect(() => {
    if (!started) return
    const full = list[index]
    let t
    if (!deleting && text.length < full.length) {
      t = setTimeout(() => setText(full.slice(0, text.length + 1)), speed)
    } else if (!deleting && text.length === full.length) {
      if (loop && list.length > 1) t = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(full.slice(0, text.length - 1)), speed / 2)
    } else {
      setDeleting(false)
      setIndex((i) => (i + 1) % list.length)
    }
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, deleting, index, started])

  return (
    <span className={className}>
      <span className="sr-only">{list[0]}</span>
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
    </span>
  )
}
