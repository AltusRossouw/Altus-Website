'use client'

import { motion } from 'framer-motion'
import { Cpu, Zap, Wifi, Code, Mail, Github, Linkedin, ExternalLink, Instagram } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAnalytics } from '../lib/analytics'

const CircuitLine = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute h-0.5 bg-gradient-to-r from-transparent via-electric-blue to-transparent"
    initial={{ width: 0, opacity: 0 }}
    animate={{ width: '100%', opacity: [0, 1, 0] }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: 3,
    }}
  />
)

const FloatingIcon = ({ 
  Icon, 
  color, 
  size = 24, 
  delay = 0,
  position 
}: { 
  Icon: any;
  color: string;
  size?: number;
  delay?: number;
  position: { top: string; left: string };
}) => (
  <motion.div
    className={`absolute ${color}`}
    style={{ top: position.top, left: position.left }}
    animate={{
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Icon size={size} />
  </motion.div>
)

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden circuit-bg">
      {/* Floating Icons Background */}
      <FloatingIcon Icon={Cpu} color="text-electric-blue" delay={0} position={{ top: "10%", left: "10%" }} />
      <FloatingIcon Icon={Zap} color="text-neon-green" delay={1} position={{ top: "20%", left: "80%" }} />
      <FloatingIcon Icon={Wifi} color="text-cyber-purple" delay={2} position={{ top: "60%", left: "5%" }} />
      <FloatingIcon Icon={Code} color="text-circuit-orange" delay={3} position={{ top: "70%", left: "85%" }} />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 bg-dark-bg/90 backdrop-blur-sm border-b border-dark-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <motion.h1
              className="text-lg sm:text-xl font-bold text-electric-blue glow-text"
              whileHover={{ scale: 1.05 }}
            >
              Altus Rossouw
            </motion.h1>
            <div className="flex space-x-3 sm:space-x-4 md:space-x-6">
              {['About', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-xs sm:text-sm md:text-base text-white hover:text-electric-blue transition-colors duration-300 whitespace-nowrap"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-electric-blue glow-text">IoT</span> &{' '}
              <br />
              <span className="text-cyber-purple glow-text">Software</span> Engineer
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Experienced embedded systems developer specializing in ESP32, radar systems, and MQTT communications
            </motion.p>

            <motion.div
              className="flex justify-center space-x-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="px-8 py-4 bg-gradient-to-r from-electric-blue to-cyber-purple text-white font-semibold rounded-lg neon-border inline-block"
                onClick={() => trackEvent('button_click', { button: 'view_projects', location: 'hero' })}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.span>
              </motion.a>
              <motion.a
                href="https://github.com/AltusRossouw"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-neon-green text-neon-green font-semibold rounded-lg hover:bg-neon-green hover:text-dark-bg transition-all duration-300 inline-block"
                onClick={() => trackEvent('external_link_click', { link: 'github_profile', location: 'hero' })}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View GitHub Profile
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Circuit Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            <div className="absolute top-1/4 left-0 right-0">
              <CircuitLine delay={0} />
            </div>
            <div className="absolute top-1/2 left-0 right-0">
              <CircuitLine delay={1} />
            </div>
            <div className="absolute top-3/4 left-0 right-0">
              <CircuitLine delay={2} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-dark-card/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-electric-blue glow-text">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.p
                  className="text-lg text-gray-300 mb-6 leading-relaxed"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  I'm an experienced embedded systems developer with a strong focus on IoT solutions, 
                  ESP32 microcontrollers, and communication protocols. With 8+ years of active development 
                  since 2016, I've built a portfolio of 15+ public repositories demonstrating expertise 
                  in hardware-software integration and real-world IoT applications.
                </motion.p>
                <motion.p
                  className="text-lg text-gray-300 mb-6 leading-relaxed"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  My expertise spans radar systems development, sensor integration, MQTT communications, 
                  and web-based interfaces. I specialize in bridging legacy systems with modern IoT 
                  infrastructure, creating innovative solutions that make technology more accessible and efficient.
                </motion.p>
              </div>
              <motion.div
                className="relative"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-full h-64 bg-gradient-to-br from-electric-blue/20 to-neon-green/20 rounded-lg border border-electric-blue/30 flex items-center justify-center">
                  <Cpu size={80} className="text-electric-blue" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-neon-green glow-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Technical Skills
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Embedded Systems', skills: ['ESP32/ESP8266', 'Arduino IDE', 'PlatformIO', 'Assembly Language', 'Real-time Systems'], icon: Cpu },
              { title: 'Programming', skills: ['C/C++', 'Python', 'JavaScript/HTML/CSS', 'Embedded C', 'Hardware Debugging'], icon: Code },
              { title: 'IoT & Communication', skills: ['MQTT Messaging', 'I2C Protocols', 'Wireless Networks', 'IoT Device Management', 'Network Protocols'], icon: Wifi },
              { title: 'Sensor & Radar Tech', skills: ['mmWave Technology', 'Sensor Integration', 'Radar Detection Systems', 'Data Processing', 'Environmental Sensing'], icon: Zap },
              { title: 'Web Development', skills: ['Web UI Development', 'Responsive Design', 'Full-stack Applications', 'Real-time Interfaces', 'Enterprise Solutions'], icon: Code },
              { title: 'Tools & Platforms', skills: ['Git Version Control', 'GitHub', 'Circuit Design', 'Hardware Analysis', 'Open Source Development'], icon: Cpu },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                className="bg-dark-card p-6 rounded-lg border border-dark-border hover:border-electric-blue transition-colors duration-300"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  <category.icon size={24} className="text-electric-blue mr-3" />
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      className="text-gray-300"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: (index * 0.1) + (skillIndex * 0.05), duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      • {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-dark-card/50">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-cyber-purple glow-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-dark-card p-6 rounded-lg border border-dark-border hover:border-current transition-all duration-300 group"
                style={{ '--tw-border-opacity': '0.3' } as any}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`text-${project.color} mb-4`}>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 bg-${project.color}/20 text-${project.color} rounded-full text-sm border border-${project.color}/30`}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-circuit-orange glow-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          
          <div className="max-w-2xl mx-auto text-center">
            <motion.p
              className="text-lg text-gray-300 mb-8"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to discuss your next IoT or embedded systems project? 
              Let's collaborate to create innovative solutions that bridge hardware and software.
            </motion.p>
            
            <motion.div
              className="flex justify-center space-x-8 mb-8"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                { Icon: Mail, label: 'Email', href: 'mailto:altusrossouw2@gmail.com' },
                { Icon: Github, label: 'GitHub Profile', href: 'https://github.com/AltusRossouw' },
                { Icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/altus-rossouw-92b234245' },
                { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com/altus.rossouw' },
              ].map(({ Icon, label, href }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  className="flex flex-col items-center text-gray-300 hover:text-electric-blue transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -5 }}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                  viewport={{ once: true }}
                  onClick={() => trackEvent('contact_click', { contact_method: label.toLowerCase(), location: 'contact_section' })}
                >
                  <Icon size={32} />
                  <span className="mt-2 text-sm">{label}</span>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="https://github.com/AltusRossouw"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-circuit-orange to-electric-blue text-white font-semibold rounded-lg neon-border inline-block"
                onClick={() => trackEvent('cta_click', { cta: 'connect_github', location: 'contact_section' })}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect on GitHub
                </motion.span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-dark-border bg-dark-bg">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Altus Rossouw. All rights reserved.</p>
            <p className="mt-2 text-sm">Built with Next.js, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
