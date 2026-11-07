import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className={`acc-item ${isOpen ? 'is-open' : ''}`}>
            <button className="acc-head" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
              <span>{item.q}</span>
              <motion.span className="acc-icon" animate={{ rotate: isOpen ? 45 : 0 }}>+</motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="acc-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="acc-body-inner">{item.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
