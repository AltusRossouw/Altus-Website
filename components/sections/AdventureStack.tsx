'use client'

import { motion } from 'framer-motion'
import { Wrench, Map, Mountain, Camera, User } from 'lucide-react'
import SpotlightCard from '@/components/ui/SpotlightCard'

export default function AdventureStack() {
  const categories = [
    { 
      title: 'Professional Mechanic', 
      skills: ['Race-day Support (Cape Epic, Wines2Whales)', 'High-end Bicycle Assembly', 'Suspension Tuning & Service', 'Prototyping (Scott Sports HQ)', 'Precision Diagnostics'], 
      icon: Wrench,
      color: 'text-earth-gold'
    },
    { 
      title: 'Guiding & Coaching', 
      skills: ['International Tour Guiding (Switzerland/SA)', 'Route Logistics & Planning', 'Client Safety Management', 'Technical Skills Coaching', 'Fitness & Nutrition Strategy'], 
      icon: Map,
      color: 'text-nature-green'
    },
    { 
      title: 'Creative & Media', 
      skills: ['FPV Drone Piloting', 'Cinematography', 'Action Sports Photography', 'Video Editing', 'Content Creation'], 
      icon: Camera,
      color: 'text-blue-400'
    }
  ]

  return (
    <section id="adventure-stack" className="py-20 bg-dark-bg relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-nature-green/5 to-dark-bg z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="flex items-center justify-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Mountain size={48} className="text-earth-gold mr-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-nature-green glow-text-nature">
            Adventure & Mechanics
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <SpotlightCard
              key={category.title}
              className="glass-card p-6 rounded-lg shadow-lg"
              spotlightColor="rgba(34, 139, 34, 0.15)"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, translateY: -5 }}
            >
              <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
                <category.icon size={28} className={`${category.color} mr-3`} />
                <h3 className="font-display text-2xl font-semibold text-white">{category.title}</h3>
              </div>
              <ul className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    className="font-mono text-gray-300 flex items-start"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: (index * 0.1) + (skillIndex * 0.05), duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <span className={`mr-2 mt-1.5 w-1.5 h-1.5 rounded-full ${category.color.replace('text-', 'bg-')}`} />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
