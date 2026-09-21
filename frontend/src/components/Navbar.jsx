import React, { useState, useEffect } from 'react'
import { profile } from '../mock'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    // Scroll listener to toggle background transparency & backdrop blur
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Trigger initially

    // Live Clock: format to Asia/Kolkata (IST) in HH:MM format
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }
      try {
        const istTime = new Intl.DateTimeFormat('en-US', options).format(new Date())
        setTimeStr(istTime)
      } catch (err) {
        // Fallback
        const d = new Date()
        const hh = String(d.getHours()).padStart(2, '0')
        const mm = String(d.getMinutes()).padStart(2, '0')
        setTimeStr(`${hh}:${mm}`)
      }
    }

    updateTime()
    // Refresh every 30 seconds as specified in requirements
    const interval = setInterval(updateTime, 30000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
      isScrolled 
        ? 'bg-bg-dark/80 backdrop-blur-md border-white/5 py-4' 
        : 'bg-transparent border-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Left Side: Brand Identity + Pulsing Dot */}
        <a href="#hero" className="flex items-center gap-3 group">
          <span className="font-mono text-sm tracking-widest text-fg-light/90 group-hover:text-accent transition-colors duration-300">
            {profile.name.toUpperCase().replace(' ', ' / ')}
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#hero" className="font-mono text-xs tracking-wider text-fg-light/75 hover:text-fg-light transition-colors link-hover">
            ABOUT
          </a>
          <a href="#projects" className="font-mono text-xs tracking-wider text-fg-light/75 hover:text-fg-light transition-colors link-hover">
            WORK
          </a>
          <a href="#contact" className="font-mono text-xs tracking-wider text-fg-light/75 hover:text-fg-light transition-colors link-hover">
            CONTACT
          </a>
        </div>

        {/* Right Side: Location Code + Live IST Time */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span className="font-mono text-[10px] tracking-wider text-fg-light/60">
              {profile.locationCode}
            </span>
          </div>
          <div className="font-mono text-xs text-fg-light/80 flex items-center gap-1.5">
            <span className="text-[10px] text-fg-light/40">IST</span>
            <span className="font-medium tabular-nums">{timeStr}</span>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
