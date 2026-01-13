'use client'

import { motion } from 'framer-motion'
import { Calendar, Briefcase, MapPin } from 'lucide-react'

export default function ExperienceTimeline() {
  const experiences = [
    {
      year: 'Sep 2024 - Present',
      title: 'Mountain Bike Tour Guide',
      company: 'Beyond Bike',
      location: 'Paarl, South Africa',
      type: 'adventure',
      description: 'Passionate MTB guide providing safe, fun, and memorable trail experiences. Skilled in route planning, trail knowledge, and client engagement. Leading groups, coaching skills, and sharing local trail insights.'
    },
    {
      year: 'May 2025 - Dec 2025',
      title: 'Software Engineer Intern',
      company: 'Azoteq',
      location: 'Paarl, South Africa',
      type: 'tech',
      description: 'Embedded systems and IoT projects, developing firmware and software solutions for sensor integration. Experience with microcontrollers, MQTT protocols, and web interfaces for real-time sensor monitoring platforms.'
    },
    {
      year: 'Jan 2023 - Aug 2024',
      title: 'Mountain Bike Development Mechanic',
      company: 'Scott Sports SA',
      location: 'Givisiez, Fribourg, Switzerland',
      type: 'adventure',
      description: 'Full-time development mechanic working on high-end mountain bike prototyping, assembly, and maintenance at Scott Sports headquarters.'
    },
    {
      year: 'Dec 2022',
      title: 'Bicycle Mechanic',
      company: 'Scott Sports Germany',
      location: 'Germany',
      type: 'adventure',
      description: 'Freelance bicycle mechanic providing technical support at international dealer events.'
    },
    {
      year: 'Oct 2022 - Dec 2022',
      title: 'Bicycle Mechanic',
      company: 'Scott Sports Africa',
      location: 'South Africa',
      type: 'adventure',
      description: 'Part-time bicycle mechanic supporting Scott Sports Africa operations and events.'
    },
    {
      year: 'Jan 2022 - Nov 2022',
      title: 'Head Coach',
      company: 'Mrace Coaching Systems',
      location: 'South Africa',
      type: 'adventure',
      description: 'Head coach teaching riding skills, fitness strategies, and nutrition to cyclists of all levels.'
    }
  ]

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Professional <span className="text-electric-blue">Journey</span>
        </motion.h2>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-electric-blue via-nature-green to-cyber-purple opacity-30" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center relative`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Content Box */}
                <div className="w-full md:w-5/12 p-4">
                  <div className={`glass-card p-6 rounded-lg ${
                    exp.type === 'tech' 
                      ? 'border-electric-blue/30 hover:border-electric-blue' 
                      : 'border-nature-green/30 hover:border-nature-green'
                  } relative group`}>
                    
                    {/* Date Badge (Mobile) */}
                    <span className="font-mono md:hidden inline-block px-3 py-1 mb-3 rounded-full text-xs font-bold bg-gray-800 text-gray-300">
                      {exp.year}
                    </span>

                    <h3 className={`font-display text-xl font-bold mb-1 ${
                      exp.type === 'tech' ? 'text-electric-blue' : 'text-nature-green'
                    }`}>
                      {exp.title}
                    </h3>
                    
                    <div className="flex items-center text-white mb-2 font-medium">
                      <Briefcase size={16} className="mr-2 opacity-70" />
                      {exp.company}
                    </div>
                    
                    <div className="flex items-center text-gray-400 text-sm mb-4">
                      <MapPin size={14} className="mr-2 opacity-70" />
                      {exp.location}
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Type Indicator Icon */}
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity">
                      {exp.type === 'tech' ? (
                        <div className="text-electric-blue text-xs border border-electric-blue px-2 py-0.5 rounded font-mono">TECH</div>
                      ) : (
                        <div className="text-nature-green text-xs border border-nature-green px-2 py-0.5 rounded font-mono">ADV</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-dark-bg border-4 border-gray-700 z-10 hidden md:flex">
                  <div className={`w-3 h-3 rounded-full ${
                    exp.type === 'tech' ? 'bg-electric-blue' : 'bg-nature-green'
                  }`} />
                </div>

                {/* Date (Desktop) */}
                <div className="w-full md:w-5/12 p-4 hidden md:block text-center md:text-left">
                  <div className={`font-mono text-lg font-bold ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-gray-400`}>
                    {exp.year}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
