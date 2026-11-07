import { useEffect, useRef } from 'react'

// Full-screen looping video behind the whole site, with a light warm overlay
// on top so text stays readable. Free clip from Mixkit (Mixkit Free License).
export default function VideoBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => (reduce.matches ? video.pause() : video.play().catch(() => {}))
    apply()
    reduce.addEventListener('change', apply)
    return () => reduce.removeEventListener('change', apply)
  }, [])

  return (
    <div className="video-bg" aria-hidden="true">
      <video ref={ref} autoPlay muted loop playsInline preload="auto">
        <source src={`${import.meta.env.BASE_URL}videos/warm-abstract.mp4`} type="video/mp4" />
      </video>
      <div className="video-overlay" />
    </div>
  )
}
