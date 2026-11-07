import { motion } from 'framer-motion'

const offsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -60 },
  right: { x: 60 },
  none: {},
}

// Fades/slides children in when they scroll into view.
export default function Reveal({ children, from = 'up', delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
