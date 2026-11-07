// Original logo: code brackets wrapped around a four-point spark.
export default function Logo({ size = 36, withText = true }) {
  return (
    <span className="logo">
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="logo-mark">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e8552f" />
            <stop offset="0.55" stopColor="#f08a24" />
            <stop offset="1" stopColor="#d9466f" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#logoGrad)" />
        <path d="M24 20 L13 32 L24 44" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 20 L51 32 L40 44" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path className="logo-spark" d="M32 22 L34.4 29.6 L42 32 L34.4 34.4 L32 42 L29.6 34.4 L22 32 L29.6 29.6 Z" fill="#fff" />
      </svg>
      {withText && (
        <span className="logo-text">
          Claude<span className="logo-amp">And</span>VSCode<span className="logo-tld">.com</span>
        </span>
      )}
    </span>
  )
}
