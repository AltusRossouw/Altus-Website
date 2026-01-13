'use client'

import { motion } from 'framer-motion'

export const CircuitLine = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute h-0.5 bg-gradient-to-r from-transparent via-electric-blue to-transparent"
    initial={{ width: 0, opacity: 0 }}
    animate={{ width: '100%', opacity: [0, 1, 0] }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: 3,
    }}
  />
)

export default function CircuitBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full">
        <div className="absolute top-1/4 left-0 right-0">
          <CircuitLine delay={0} />
        </div>
        <div className="absolute top-1/2 left-0 right-0">
          <CircuitLine delay={1} />
        </div>
        <div className="absolute top-3/4 left-0 right-0">
          <CircuitLine delay={2} />
        </div>
      </div>
    </div>
  )
}
