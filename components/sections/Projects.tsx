'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useAnalytics } from '@/lib/analytics'
import SpotlightCard from '@/components/ui/SpotlightCard'

export default function Projects() {
  const { trackEvent } = useAnalytics()

  const projects = [
    {
      title: 'I2C-MQTT-Bridge',
      description: 'Seamless bridge between I2C devices and MQTT networks. Enables legacy sensors to communicate with modern IoT infrastructure with industrial-grade reliability.',
      tech: ['I2C Protocol', 'MQTT', 'ESP32', 'IoT Integration'],
      color: 'neon-green',
      link: 'https://github.com/AltusRossouw'
    },
    {
      title: 'LD2420-ESP Integration',
      description: 'ESP32 implementation for LD2420 sensor integration. Custom communication protocols with precision measurement and real-time data transmission.',
      tech: ['ESP32', 'Sensor Integration', 'Custom Protocols', 'Data Processing'],
      color: 'cyber-purple',
      link: 'https://github.com/AltusRossouw'
    },
    {
      title: 'WebUntisApp',
      description: 'Full-stack web application with modern UI/UX design. Demonstrates proficiency in integrating web technologies and embedded systems.',
      tech: ['JavaScript', 'HTML/CSS', 'Full-stack', 'Responsive Design'],
      color: 'circuit-orange',
      link: 'https://github.com/AltusRossouw'
    },
    {
      title: 'IntellixLabs WebUI',
      description: 'Enterprise-level web interface with advanced front-end development. Commercial-grade software solution with professional responsive design.',
      tech: ['Web UI', 'Enterprise Solutions', 'Responsive Design', 'Professional Grade'],
      color: 'electric-blue',
      link: 'https://github.com/AltusRossouw'
    },
    {
      title: '15+ Open Source Projects',
      description: '8+ years of consistent GitHub activity with comprehensive documentation and community engagement. Active contributor to open-source IoT solutions.',
      tech: ['Open Source', 'GitHub', 'Documentation', 'Community'],
      color: 'neon-green',
      link: 'https://github.com/AltusRossouw'
    }
  ]

  const webProjects = [
    {
      title: 'OrbitX Cloud Platform',
      description: 'Advanced cloud infrastructure platform with modern UI/UX design. Features real-time monitoring, scalable architecture, and enterprise-grade security solutions.',
      url: 'https://orbitx.cloud',
      tech: ['React', 'TypeScript', 'Cloud Infrastructure', 'Real-time Monitoring', 'Enterprise Security'],
      color: 'electric-blue',
      features: ['Cloud Management', 'Real-time Analytics', 'Scalable Architecture', 'Security Solutions']
    },
    {
      title: 'IntellixLabs Corporate Site',
      description: 'Professional corporate website for technology consulting firm. Clean, modern design with responsive layout and integrated business solutions.',
      url: 'https://intellixlabs.co.za',
      tech: ['Next.js', 'Tailwind CSS', 'Responsive Design', 'Business Integration', 'Professional UI'],
      color: 'cyber-purple',
      features: ['Corporate Branding', 'Service Showcase', 'Contact Integration', 'Professional Design']
    },
    {
      title: 'Personal Portfolio',
      description: 'This portfolio website demonstrating modern web development practices. Built with Next.js, TypeScript, and advanced animations for optimal user experience.',
      url: 'https://altusrossouw.co.za',
      tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Analytics Integration'],
      color: 'neon-green',
      features: ['Interactive Animations', 'Responsive Design', 'Analytics Tracking', 'Modern UI/UX']
    }
  ]

  return (
    <section id="projects" className="py-20 bg-dark-card/50">
      <div className="container mx-auto px-6">
        
        {/* Engineering Projects */}
        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold text-center mb-12 text-cyber-purple glow-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Featured Engineering Projects
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <SpotlightCard
              key={project.title}
              className="glass-card p-6 rounded-lg group"
              style={{ '--tw-border-opacity': '0.3' } as any}
              spotlightColor="rgba(0, 212, 255, 0.15)"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`text-${project.color} mb-4`}>
                <h3 className="font-display text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`font-mono px-3 py-1 bg-${project.color}/20 text-${project.color} rounded-full text-sm border border-${project.color}/30`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <motion.button
                  className={`flex items-center text-${project.color} hover:underline`}
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    trackEvent('project_click', { project: project.title, location: 'projects_section' })
                    window.open(project.link, '_blank')
                  }}
                >
                  View Project <ExternalLink size={16} className="ml-1" />
                </motion.button>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Web Development Projects */}
        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold text-center mb-12 text-neon-green glow-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Web Development Portfolio
        </motion.h2>
        
        <motion.p
          className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Professional web development projects showcasing modern technologies, responsive design, 
          and enterprise-level solutions across various industries.
        </motion.p>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {webProjects.map((project, index) => (
            <SpotlightCard
              key={project.title}
              className="glass-card p-6 rounded-lg group"
              style={{ '--tw-border-opacity': '0.3' } as any}
              spotlightColor="rgba(0, 212, 255, 0.15)"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`text-${project.color} mb-4`}>
                <h3 className="font-display text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-display text-sm font-semibold text-white mb-2">Key Features:</h4>
                  <ul className="font-mono text-sm text-gray-300 space-y-1">
                    {project.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`font-mono px-3 py-1 bg-${project.color}/20 text-${project.color} rounded-full text-sm border border-${project.color}/30`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center text-${project.color} hover:underline`}
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    trackEvent('web_project_click', { project: project.title, url: project.url, location: 'web_development_section' })
                  }}
                >
                  Visit Website <ExternalLink size={16} className="ml-1" />
                </motion.a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
