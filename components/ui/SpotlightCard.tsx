'use client'

import { useRef, MouseEvent } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface SpotlightCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
}

export default function SpotlightCard({ 
  children, 
  className = "", 
  spotlightColor = "rgba(255, 255, 255, 0.1)",
  ...props 
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return

    const rect = divRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    divRef.current.style.setProperty('--spotlight-x', `${x}px`)
    divRef.current.style.setProperty('--spotlight-y', `${y}px`)
  }

  const handleFocus = () => {
    divRef.current?.style.setProperty('--spotlight-opacity', '1')
  }

  const handleBlur = () => {
    divRef.current?.style.setProperty('--spotlight-opacity', '0')
  }

  const handleMouseEnter = () => {
    divRef.current?.style.setProperty('--spotlight-opacity', '1')
  }

  const handleMouseLeave = () => {
    divRef.current?.style.setProperty('--spotlight-opacity', '0')
  }

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        '--spotlight-x': '0px',
        '--spotlight-y': '0px',
        '--spotlight-opacity': '0',
        '--spotlight-color': spotlightColor,
      } as React.CSSProperties}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: 'var(--spotlight-opacity)',
          background: `radial-gradient(600px circle at var(--spotlight-x) var(--spotlight-y), var(--spotlight-color), transparent 40%)`,
        }}
      />
      <div className="relative h-full">
        {children}
      </div>
    </motion.div>
  )
}
