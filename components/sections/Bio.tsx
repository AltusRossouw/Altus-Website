'use client'

import { motion } from 'framer-motion'
import { Cpu, Mountain } from 'lucide-react'

export default function Bio() {
  return (
    <section id="about" className="py-20 bg-dark-card/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            About <span className="text-electric-blue">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6 text-lg text-gray-300 leading-relaxed"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p>
                I am a hybrid professional operating at the intersection of <span className="text-electric-blue font-semibold">digital logic</span> and <span className="text-nature-green font-semibold">mechanical reality</span>. 
                My career is built on a foundation of rigorous problem-solving, whether I'm debugging firmware for a custom ESP32 board or tuning suspension for a Cape Epic race bike.
              </p>
              
              <p>
                With over 8 years of active development experience, I specialize in IoT solutions, radar systems, and full-stack web applications. Simultaneously, my professional background in the cycling industry—working with brands like Scott Sports in Switzerland—has instilled in me an uncompromising standard for precision and reliability.
              </p>

              <p>
                I believe the best solutions come from understanding both the software that controls a system and the hardware that executes it. From the workshop to the cloud, I build systems that work.
              </p>
            </motion.div>

            <motion.div
              className="relative h-full min-h-[300px]"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-nature-green/10 rounded-lg border border-gray-700 flex items-center justify-center overflow-hidden">
                {/* Visual Metaphor for Dual Persona */}
                <div className="relative w-full h-full flex">
                  {/* Tech Half */}
                  <div className="w-1/2 h-full flex items-center justify-center border-r border-gray-700/50">
                    <Cpu size={80} className="text-electric-blue opacity-80" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                  </div>
                  
                  {/* Nature Half */}
                  <div className="w-1/2 h-full flex items-center justify-center bg-dark-card/30">
                    <Mountain size={80} className="text-nature-green opacity-80" />
                    <div className="absolute inset-0 bg-[url('/topo.svg')] opacity-10" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
