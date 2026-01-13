import type { Metadata } from 'next'
import './globals.css'
import GrainOverlay from '@/components/ui/GrainOverlay'
import DotGrid from '@/components/ui/DotGrid'

export const metadata: Metadata = {
  title: 'Altus Rossouw - Embedded Systems Developer & IoT Specialist',
  description: 'Experienced embedded systems developer specializing in ESP32, radar systems, MQTT communications, and IoT solutions. 8+ years of expertise with 15+ open source projects.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script 
          defer 
          src="https://umami.intellixlabs.co.za/script.js" 
          data-website-id="01664ec1-1cd3-440f-abfe-d63b8420e31e"
        />
      </head>
      <body className="bg-dark-bg text-white">
        <DotGrid />
        <GrainOverlay />
        {children}
      </body>
    </html>
  )
}
