'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { useAnalytics } from '@/lib/analytics'

const socialLinks = [
  {
    Icon: Mail,
    label: 'Email',
    href: 'mailto:altusrossouw2@gmail.com',
    username: 'altusrossouw2@gmail.com',
  },
  {
    Icon: Github,
    label: 'GitHub',
    href: 'https://github.com/AltusRossouw',
    username: '@AltusRossouw',
  },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/altus-rossouw-92b234245',
    username: 'Altus Rossouw',
  },
]

export default function Contact() {
  const { trackEvent } = useAnalytics()

  return (
    <section id="contact" className="section">
      <div className="container-custom">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-4">
            Let's Connect
          </h2>
          <p className="text-text-secondary mb-12 max-w-md mx-auto">
            Open to opportunities in embedded systems and software engineering.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {socialLinks.map(({ Icon, label, href, username }) => (
            <a
              key={label}
              href={href}
              target={label === 'Email' ? undefined : '_blank'}
              rel={label === 'Email' ? undefined : 'noopener noreferrer'}
              className="group flex items-center gap-3 px-6 py-4 card hover:border-accent/50 transition-all duration-300 w-full sm:w-auto"
              onClick={() =>
                trackEvent('contact_click', {
                  contact_method: label.toLowerCase(),
                  location: 'contact_section',
                })
              }
            >
              <Icon
                size={20}
                className="text-text-secondary group-hover:text-accent transition-colors"
              />
              <div className="text-left">
                <p className="text-xs text-text-secondary">{label}</p>
                <p className="text-sm text-text-primary group-hover:text-accent transition-colors">
                  {username}
                </p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
