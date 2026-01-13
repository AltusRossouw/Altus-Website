'use client'

export default function DotGrid() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)`,
        backgroundSize: '24px 24px',
      }}
    />
  )
}
