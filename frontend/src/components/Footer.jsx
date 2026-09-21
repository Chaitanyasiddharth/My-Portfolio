import React from 'react'
import { ArrowUp } from 'lucide-react'
import { profile } from '../mock'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-white/5 py-12 px-6 md:px-12 bg-bg-dark text-fg-light/45 select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Copyright (dynamic year) */}
        <div className="font-mono text-xs tracking-wider">
          © {currentYear} {profile.name}. All rights reserved.
        </div>

        {/* Center: Version tag */}
        <div className="font-mono text-[10px] tracking-widest uppercase">
          BUILD VERSION: <span className="text-fg-light/60">v{profile.version}</span>
        </div>

        {/* Right Side: Back to top link */}
        <a 
          href="#hero" 
          className="flex items-center gap-2 font-mono text-xs tracking-widest text-fg-light/65 hover:text-accent transition-colors duration-300 link-hover"
        >
          BACK TO TOP
          <ArrowUp size={12} />
        </a>

      </div>
    </footer>
  )
}

export default Footer
