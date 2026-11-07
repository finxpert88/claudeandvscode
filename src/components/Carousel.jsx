import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* ---------- Small mock "screens" shown on each slide ---------- */

function MockWindow({ title, children }) {
  return (
    <div className="mock">
      <div className="mock-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="mock-title">{title}</span>
      </div>
      <div className="mock-body">{children}</div>
    </div>
  )
}

const ExtensionMock = () => (
  <MockWindow title="Extensions: Marketplace">
    <div className="mock-search">🔍 claude code</div>
    <div className="mock-ext">
      <div className="mock-ext-icon">✦</div>
      <div>
        <strong>Claude Code</strong>
        <small>AI coding agent for VS Code</small>
        <div className="mock-stars">★★★★★</div>
      </div>
      <span className="mock-install">Install</span>
    </div>
    <div className="mock-ext mock-ext--dim">
      <div className="mock-ext-icon alt">{'{ }'}</div>
      <div><strong>Prettier</strong><small>Code formatter</small></div>
    </div>
  </MockWindow>
)

const ChatMock = () => (
  <MockWindow title="Claude Code — chat">
    <div className="bubble bubble--user">Add input validation to the signup form</div>
    <div className="bubble bubble--ai">
      I’ll update <code>SignupForm.jsx</code> to check the email format and password length, then show inline errors.
      <span className="typing-dots"><i /><i /><i /></span>
    </div>
  </MockWindow>
)

const TerminalMock = () => (
  <MockWindow title="Terminal — zsh">
    <div className="term"><span className="term-prompt">$</span> claude</div>
    <div className="term term--dim">✦ Welcome to Claude Code</div>
    <div className="term"><span className="term-prompt">&gt;</span> fix the failing tests in /api</div>
    <div className="term term--ok">✓ Read 6 files · ran npm test · 2 edits</div>
    <div className="term term--ok">✓ All 48 tests passing</div>
  </MockWindow>
)

const DiffMock = () => (
  <MockWindow title="Review changes — utils.js">
    <div className="diff diff--del">- const total = items.reduce((a, b) =&gt; a + b)</div>
    <div className="diff diff--add">+ const total = items.reduce((a, b) =&gt; a + b, 0)</div>
    <div className="diff">  return formatCurrency(total)</div>
    <div className="diff-actions">
      <span className="mock-install">Accept</span>
      <span className="mock-reject">Reject</span>
    </div>
  </MockWindow>
)

const slides = [
  {
    eyebrow: 'Step one',
    title: 'Install in under a minute',
    text: 'Find the Claude Code extension in the VS Code Marketplace, hit install, sign in, and you’re ready to go.',
    visual: <ExtensionMock />,
    accent: '#e8552f',
  },
  {
    eyebrow: 'Pair programming',
    title: 'Chat right beside your code',
    text: 'Ask questions, explain code, or describe a change. Claude reads your project and answers in context.',
    visual: <ChatMock />,
    accent: '#d9466f',
  },
  {
    eyebrow: 'Agentic workflows',
    title: 'Let Claude do the legwork',
    text: 'Claude can run commands, read files and fix failing tests across your whole codebase, with you in control.',
    visual: <TerminalMock />,
    accent: '#f08a24',
  },
  {
    eyebrow: 'Stay in control',
    title: 'Review every change',
    text: 'See proposed edits as clear diffs. Accept what you like, reject what you don’t. Nothing is hidden.',
    visual: <DiffMock />,
    accent: '#c2410c',
  },
]

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -120 : 120, opacity: 0 }),
}

export default function Carousel({ interval = 6000 }) {
  const [[index, dir], setState] = useState([0, 1])
  const [paused, setPaused] = useState(false)

  const go = useCallback((step) => {
    setState(([i]) => [(i + step + slides.length) % slides.length, step])
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), interval)
    return () => clearInterval(t)
  }, [paused, go, interval, index])

  const slide = slides[index]

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ '--accent': slide.accent }}
      aria-roledescription="carousel"
    >
      <div className="carousel-viewport">
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={index}
            className="carousel-slide"
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1)
              else if (info.offset.x > 60) go(-1)
            }}
          >
            <div className="carousel-copy">
              <span className="eyebrow" style={{ color: slide.accent }}>{slide.eyebrow}</span>
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
            </div>
            <div className="carousel-visual">{slide.visual}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="carousel-controls">
        <button className="carousel-arrow" onClick={() => go(-1)} aria-label="Previous slide">←</button>
        <div className="carousel-dots">
          {slides.map((s, i) => (
            <button
              key={s.title}
              className={`carousel-dot ${i === index ? 'is-active' : ''}`}
              onClick={() => setState([i, i > index ? 1 : -1])}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === index && !paused && (
                <motion.span
                  className="carousel-dot-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: interval / 1000, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>
        <button className="carousel-arrow" onClick={() => go(1)} aria-label="Next slide">→</button>
      </div>
    </div>
  )
}
