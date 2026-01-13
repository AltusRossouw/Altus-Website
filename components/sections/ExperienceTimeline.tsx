'use client'

import { motion } from 'framer-motion'
import { Calendar, Briefcase, MapPin } from 'lucide-react'

export default function ExperienceTimeline() {
  const experiences = [
    {
      year: '2025 - Present',
      title: 'Software Engineer Intern',
      company: 'Azoteq',
      location: 'Paarl, South Africa',
      type: 'tech',
      description: 'Firmware development for custom ICs, IoT full-stack development, and MQTT integration.'
    },
    {
      year: '2024 - Present',
      title: 'Freelance Bicycle Mechanic',
      company: 'Self-Employed',
      location: 'South Africa',
      type: 'adventure',
      description: 'Professional mechanic for major events including Cape Epic & Wines2Whales. High-performance assembly and optimization.'
    },
    {
      year: '2023 - Present',
      title: 'Bicycle Tour Guide',
      company: 'Freelance',
      location: 'Switzerland & South Africa',
      type: 'adventure',
      description: 'Guiding international clients on mountain & gravel bike tours. Managed logistics and safety.'
    },
    {
      year: '2023 - 2024',
      title: 'Professional Development Mechanic',
      company: 'Scott Sports',
      location: 'Fribourg, Switzerland',
      type: 'adventure',
      description: 'Prototyping and maintenance of high-end bicycles. Technical support at international races and product launches.'
    },
    {
      year: '2023 (Jan - Jun)',
      title: 'Quality Management Team',
      company: 'Scott Sports',
      location: 'Fribourg, Switzerland',
      type: 'tech',
      description: 'Contributed to workshop design and database integration projects.'
    },
    {
      year: '2022 - 2023',
      title: 'Mechanic & Guide',
      company: 'Scott Sports',
      location: 'Munich, Germany / Paarl, South Africa',
      type: 'adventure',
      description: 'Delivered technical support at international dealer events. Guided large groups and managed guest experiences.'
    },
    {
      year: '2022',
      title: 'Computer Network Manager',
      company: 'Clift College',
      location: 'Paarl, South Africa',
      type: 'tech',
      description: 'Designed and maintained wired/wireless networks for 150+ clients. Server configuration and IT support.'
    },
    {
      year: '2022',
      title: 'Mountain Bike Coach',
      company: 'Mrace Coaching Systems',
      location: 'Paarl, South Africa',
      type: 'adventure',
      description: 'Coached riding skills, fitness, and nutrition strategies for cyclists of all levels.'
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
