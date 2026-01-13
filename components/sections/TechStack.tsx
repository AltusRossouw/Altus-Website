'use client'

import { motion } from 'framer-motion'
import { Cpu, Code, Wifi, Zap } from 'lucide-react'
import SpotlightCard from '@/components/ui/SpotlightCard'

export default function TechStack() {
  const categories = [
    { title: 'Embedded Systems', skills: ['ESP32/ESP8266', 'Arduino IDE', 'PlatformIO', 'Assembly Language', 'Real-time Systems'], icon: Cpu },
    { title: 'Programming', skills: ['C/C++', 'Python', 'JavaScript/HTML/CSS', 'Embedded C', 'Hardware Debugging'], icon: Code },
    { title: 'IoT & Communication', skills: ['MQTT Messaging', 'I2C Protocols', 'Wireless Networks', 'IoT Device Management', 'Network Protocols'], icon: Wifi },
    { title: 'Sensor & Radar Tech', skills: ['mmWave Technology', 'Sensor Integration', 'Radar Detection Systems', 'Data Processing', 'Environmental Sensing'], icon: Zap },
    { title: 'Web Development', skills: ['React/Next.js', 'TypeScript/JavaScript', 'Tailwind CSS', 'Framer Motion', 'Responsive Design', 'Real-time Interfaces', 'Analytics Integration', 'Enterprise Solutions'], icon: Code },
    { title: 'Tools & Platforms', skills: ['Git Version Control', 'GitHub', 'Circuit Design', 'Hardware Analysis', 'Open Source Development'], icon: Cpu },
  ]

  return (
    <section id="tech-stack" className="py-20 bg-dark-card/30 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold text-center mb-12 text-electric-blue glow-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Engineering Stack
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <SpotlightCard
              key={category.title}
              className="glass-card p-6 rounded-lg"
              spotlightColor="rgba(0, 212, 255, 0.15)"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <category.icon size={24} className="text-electric-blue mr-3" />
                <h3 className="font-display text-xl font-semibold text-white">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    className="font-mono text-gray-300"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: (index * 0.1) + (skillIndex * 0.05), duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    • {skill}
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
