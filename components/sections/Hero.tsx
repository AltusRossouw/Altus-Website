'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useAnalytics } from '@/lib/analytics'
import { Cpu, Mountain } from 'lucide-react'

export default function Hero() {
  const { trackEvent } = useAnalytics()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Tech Orb */}
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-electric-blue/5 blur-[100px] will-change-transform"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Nature Orb */}
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-nature-green/5 blur-[100px] will-change-transform"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Central Grid Mesh */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" style={{ opacity: 0.05 }} />
      </div>

      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="container mx-auto px-6 text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 text-gray-400"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Altus Rossouw
          </motion.h1>
          
          <motion.h2
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-8 text-white leading-tight tracking-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-electric-blue glow-text block md:inline hover:scale-105 transition-transform duration-500 cursor-default">Engineer.</span>
            <span className="hidden md:inline text-gray-700 mx-4 font-thin">|</span>
            <span className="text-nature-green glow-text-nature block md:inline hover:scale-105 transition-transform duration-500 cursor-default">Adventurer.</span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Bridging the gap between <strong className="text-electric-blue font-medium">embedded systems</strong> precision 
            and <strong className="text-nature-green font-medium">high-performance mechanics</strong>.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="group relative px-8 py-4 bg-dark-card/50 backdrop-blur-sm border border-electric-blue/30 text-electric-blue font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:border-electric-blue hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]"
              onClick={() => trackEvent('button_click', { button: 'view_engineering', location: 'hero' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 w-full h-full bg-electric-blue/5 group-hover:bg-electric-blue/10 transition-all duration-300" />
              <span className="relative flex items-center justify-center font-display tracking-wide">
                <Cpu className="mr-2" size={20} />
                Engineering Portfolio
              </span>
            </motion.a>

            <motion.a
              href="#adventure-stack"
              className="group relative px-8 py-4 bg-dark-card/50 backdrop-blur-sm border border-nature-green/30 text-nature-green font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:border-nature-green hover:shadow-[0_0_30px_rgba(34,139,34,0.2)]"
              onClick={() => trackEvent('button_click', { button: 'view_adventure', location: 'hero' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 w-full h-full bg-nature-green/5 group-hover:bg-nature-green/10 transition-all duration-300" />
              <span className="relative flex items-center justify-center font-display tracking-wide">
                <Mountain className="mr-2" size={20} />
                Adventure & Mechanics
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
