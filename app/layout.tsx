import type { Metadata } from 'next'
import './globals.css'

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
      <body className="bg-dark-bg text-white">{children}</body>
    </html>
  )
}
