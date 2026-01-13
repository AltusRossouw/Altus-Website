'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Instagram, Menu, X } from 'lucide-react'
import { useAnalytics } from '@/lib/analytics'

export default function Contact() {
  const { trackEvent } = useAnalytics()

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold text-center mb-12 text-circuit-orange glow-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>
        
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            className="text-lg text-gray-300 mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Whether you need an <span className="text-electric-blue">IoT specialist</span> for your next embedded project or an experienced <span className="text-nature-green">mechanic/guide</span> for your next expedition, let's connect.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { Icon: Mail, label: 'Email', href: 'mailto:altusrossouw2@gmail.com', color: 'hover:text-circuit-orange' },
              { Icon: Github, label: 'GitHub', href: 'https://github.com/AltusRossouw', color: 'hover:text-electric-blue' },
              { Icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/altus-rossouw-92b234245', color: 'hover:text-cyber-purple' },
              { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com/altus.rossouw', color: 'hover:text-nature-green' },
            ].map(({ Icon, label, href, color }, index) => (
              <motion.a
                key={label}
                href={href}
                className={`flex flex-col items-center text-gray-400 ${color} transition-colors duration-300`}
                whileHover={{ scale: 1.1, y: -5 }}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                viewport={{ once: true }}
                onClick={() => trackEvent('contact_click', { contact_method: label.toLowerCase(), location: 'contact_section' })}
              >
                <div className="p-4 bg-dark-card border border-dark-border rounded-full mb-3">
                  <Icon size={28} />
                </div>
                <span className="text-sm font-medium">{label}</span>
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
              className="px-8 py-4 bg-gradient-to-r from-electric-blue to-nature-green text-white font-semibold rounded-lg shadow-lg hover:shadow-electric-blue/20 transition-all duration-300 inline-block"
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
  )
}
