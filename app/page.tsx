'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useAnalytics } from '@/lib/analytics'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Logo from '@/components/ui/Logo'

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { trackEvent } = useAnalytics()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    trackEvent('mobile_menu_toggle', { 
      action: isMobileMenuOpen ? 'close' : 'open',
      location: 'navigation' 
    })
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as Element
        if (!target.closest('nav')) {
          closeMobileMenu()
        }
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-accent/30 selection:text-white">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container-custom py-4">
          <div className="flex justify-between items-center">
            <motion.a
              href="#"
              className="flex items-center gap-2 text-lg font-semibold text-text-primary hover:text-accent transition-colors group"
              whileHover={{ scale: 1.02 }}
            >
              <Logo />
              <span className="group-hover:text-accent transition-colors">Altus Rossouw</span>
            </motion.a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => trackEvent('desktop_menu_click', { 
                    menu_item: item.label.toLowerCase(),
                    location: 'desktop_navigation' 
                  })}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Dropdown Menu */}
          <motion.div
            className={`md:hidden overflow-hidden ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}
            initial={false}
            animate={{ 
              height: isMobileMenuOpen ? 'auto' : 0,
              opacity: isMobileMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="py-4 space-y-1 border-t border-dark-border mt-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-dark-card rounded-lg transition-all"
                  onClick={() => {
                    closeMobileMenu()
                    trackEvent('mobile_menu_click', { 
                      menu_item: item.label.toLowerCase(),
                      location: 'mobile_navigation' 
                    })
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isMobileMenuOpen ? 1 : 0,
                    x: isMobileMenuOpen ? 0 : -20
                  }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-dark-border">
        <div className="container-custom">
          <div className="text-center text-text-secondary text-sm">
            <p>&copy; {new Date().getFullYear()} Altus Rossouw</p>
            <p className="mt-2">
              Built with <span className="text-accent">Next.js</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
