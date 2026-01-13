'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useAnalytics } from '@/lib/analytics'
import Hero from '@/components/sections/Hero'
import Bio from '@/components/sections/Bio'
import ExperienceTimeline from '@/components/sections/ExperienceTimeline'
import TechStack from '@/components/sections/TechStack'
import AdventureStack from '@/components/sections/AdventureStack'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import CircuitBackground from '@/components/ui/CircuitBackground'
import TopoBackground from '@/components/ui/TopoBackground'

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

  // Close mobile menu when clicking outside
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
    { label: 'Journey', href: '#experience' },
    { label: 'Engineering', href: '#tech-stack' },
    { label: 'Adventure', href: '#adventure-stack' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-dark-bg text-white selection:bg-electric-blue selection:text-white">
      
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 z-0 opacity-50">
         {/* We layer both backgrounds; specific sections will use background-color to mask/reveal as needed */}
         <div className="absolute inset-0 opacity-40"><CircuitBackground /></div>
         <div className="absolute inset-0 opacity-20 mix-blend-overlay"><TopoBackground /></div>
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 bg-dark-bg/90 backdrop-blur-md border-b border-dark-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <motion.a
              href="#"
              className="text-lg sm:text-xl font-bold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-electric-blue">Altus</span>
              <span className="text-gray-500">|</span>
              <span className="text-nature-green">Rossouw</span>
            </motion.a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1 lg:space-x-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors duration-300 px-2 py-1 relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => trackEvent('desktop_menu_click', { 
                    menu_item: item.label.toLowerCase().replace(' ', '-'),
                    location: 'desktop_navigation' 
                  })}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-electric-blue to-nature-green group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-white hover:text-electric-blue transition-colors duration-300"
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.1 }}
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="py-4 space-y-2 border-t border-dark-border mt-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-3 text-white hover:bg-white/5 transition-all duration-300 rounded-lg"
                  onClick={() => {
                    closeMobileMenu()
                    trackEvent('mobile_menu_click', { 
                      menu_item: item.label.toLowerCase().replace(' ', '-'),
                      location: 'mobile_navigation' 
                    })
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isMobileMenuOpen ? 1 : 0,
                    x: isMobileMenuOpen ? 0 : -20
                  }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <Bio />
        <ExperienceTimeline />
        <TechStack />
        <AdventureStack />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-dark-border bg-dark-bg relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Altus Rossouw. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Built with <span className="text-electric-blue">Next.js</span> & <span className="text-nature-green">Grit</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
