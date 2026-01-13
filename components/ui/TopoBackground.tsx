'use client'

import { motion } from 'framer-motion'

export const TopoLine = ({ delay = 0, path }: { delay?: number; path: string }) => (
  <motion.svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.2 }}
    transition={{ duration: 1 }}
  >
    <motion.path
      d={path}
      fill="none"
      stroke="#228B22"
      strokeWidth="1"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: 3,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 1
      }}
    />
  </motion.svg>
)

export default function TopoBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Abstract topographic lines */}
      <TopoLine 
        path="M0,100 Q400,50 800,100 T1600,100" 
        delay={0} 
      />
      <TopoLine 
        path="M0,300 Q400,250 800,300 T1600,300" 
        delay={1} 
      />
      <TopoLine 
        path="M0,500 Q400,450 800,500 T1600,500" 
        delay={2} 
      />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-transparent to-dark-bg opacity-80" />
    </div>
  )
}
