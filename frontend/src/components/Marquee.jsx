import React from 'react'
import { skills } from '../mock'

function Marquee() {
  // Double the array to make the looping animation seamless
  const marqueeSkills = [...skills, ...skills, ...skills]

  return (
    <div className="w-full border-t border-b border-white/5 py-6 bg-black/10 overflow-hidden relative select-none">
      
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-transparent to-bg-dark pointer-events-none z-10"></div>
      
      <div className="w-full flex">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
          {marqueeSkills.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-12">
              <span className="font-serif italic font-normal text-4xl md:text-5xl lg:text-6xl text-fg-light/85 tracking-tight hover:text-accent transition-colors duration-300">
                {skill}
              </span>
              <span className="font-mono text-xs text-accent opacity-50 tracking-wider">
                ◆
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Marquee
