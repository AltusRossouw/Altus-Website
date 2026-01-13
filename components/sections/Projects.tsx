'use client'

import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      title: 'I2C-MQTT-Bridge',
      description: 'Bridge between I2C devices and MQTT networks. Enables legacy sensors to communicate with modern IoT infrastructure.',
      tech: ['ESP32', 'MQTT', 'C'],
    },
    {
      title: 'LD2420-ESP Integration',
      description: 'ESP32 implementation for radar sensor integration. Custom protocols for precision measurement and real-time data transmission.',
      tech: ['ESP32', 'Sensors', 'C++'],
    },
    {
      title: 'Real-time Sensor Platform',
      description: 'Full-stack IoT dashboard for sensor monitoring. Web interface with live data visualization and configuration.',
      tech: ['React', 'MQTT', 'Python'],
    },
    {
      title: 'OrbitX Cloud Platform',
      description: 'Cloud infrastructure platform with real-time monitoring and enterprise-grade security solutions.',
      tech: ['React', 'TypeScript', 'Cloud'],
    },
    {
      title: 'IntellixLabs Website',
      description: 'Professional corporate website for technology consulting firm. Clean, responsive design.',
      tech: ['Next.js', 'Tailwind CSS'],
    },
    {
      title: 'Firmware Tools Collection',
      description: 'Collection of utilities and libraries for embedded development and microcontroller programming.',
      tech: ['C', 'Python', 'Tools'],
    },
  ]

  return (
    <section id="projects" className="section">
      <div className="container-custom">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>
        
        <motion.p
          className="text-text-secondary mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          A selection of engineering and web development projects. More details coming soon.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="card p-6 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <span className="flex items-center gap-1 text-xs font-mono text-text-secondary bg-accent/10 px-2 py-1 rounded border border-accent/20">
                  <Clock size={12} />
                  Soon
                </span>
              </div>
              
              <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-mono text-text-secondary bg-dark-bg border border-dark-border rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
