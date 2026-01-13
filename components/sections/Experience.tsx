'use client'

import { motion } from 'framer-motion'

export default function Experience() {
  const experiences = [
    {
      year: 'May 2025 - Dec 2025',
      title: 'Software Engineer Intern',
      company: 'Azoteq',
      location: 'Paarl, South Africa',
      description: 'Embedded systems and IoT projects. Firmware development, MQTT protocols, and real-time sensor monitoring platforms.',
      skills: ['Python', 'C', 'Swift', 'Docker', 'Microcontrollers', 'IoT']
    },
    {
      year: 'Sep 2024 - Present',
      title: 'Mountain Bike Tour Guide',
      company: 'Beyond Bike',
      location: 'Paarl, South Africa',
      description: 'Route planning, client engagement, and group leadership. Technical coaching and safety management.',
      skills: ['Leadership', 'Client Management', 'Problem Solving']
    },
    {
      year: 'Jan 2023 - Aug 2024',
      title: 'Development Mechanic',
      company: 'Scott Sports SA',
      location: 'Fribourg, Switzerland',
      description: 'High-end bicycle prototyping and assembly. Precision diagnostics and technical problem-solving at international level.',
      skills: ['Precision Engineering', 'Prototyping', 'Quality Control']
    },
    {
      year: 'Oct 2022 - Dec 2022',
      title: 'Bicycle Mechanic',
      company: 'Scott Sports Africa',
      location: 'South Africa',
      description: 'Technical support for dealer events and product launches.',
      skills: ['Technical Support', 'Event Coordination']
    },
    {
      year: 'Jan 2022 - Nov 2022',
      title: 'Head Coach',
      company: 'Mrace Coaching Systems',
      location: 'South Africa',
      description: 'Led coaching programs for cyclists of all levels. Developed training strategies and managed client relationships.',
      skills: ['Leadership', 'Communication', 'Strategy']
    }
  ]

  return (
    <section id="experience" className="section bg-dark-card/30">
      <div className="container-custom">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-text-primary mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative pl-8 border-l-2 border-dark-border hover:border-accent/50 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dark-bg border-2 border-dark-border" />
              
              <div className="pb-8">
                <span className="text-sm font-mono text-text-secondary">
                  {exp.year}
                </span>
                
                <h3 className="text-xl font-semibold text-text-primary mt-1">
                  {exp.title}
                </h3>
                
                <p className="text-accent font-medium">
                  {exp.company}
                </p>
                
                <p className="text-sm text-text-secondary mb-3">
                  {exp.location}
                </p>
                
                <p className="text-text-secondary mb-4">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs font-mono text-text-secondary bg-dark-card border border-dark-border rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
