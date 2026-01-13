'use client'

import { motion } from 'framer-motion'

export default function About() {
  const skills = [
    'C/C++',
    'Python',
    'Swift',
    'ESP32',
    'MQTT',
    'Docker',
    'React',
    'Next.js',
    'TypeScript',
    'Microcontrollers',
    'IoT',
  ]

  return (
    <section id="about" className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
            About
          </h2>
          
          <div className="max-w-3xl">
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              I'm a Software Engineering student with hands-on experience in embedded systems, 
              IoT, and full-stack development. At Azoteq, I work on firmware for custom ICs 
              and build real-time sensor monitoring platforms using MQTT and modern web technologies.
            </p>
            
            <p className="text-lg text-text-secondary leading-relaxed mb-10">
              My background combines technical precision from the cycling industry—working with 
              Scott Sports in Switzerland—with software engineering. I bring the same attention 
              to detail whether debugging firmware or optimizing system performance.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                className="skill-tag"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
