import React from 'react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { profile } from '../mock'

const tocItems = [
  { num: "01", label: "About / Identity", target: "#hero" },
  { num: "02", label: "Education Timeline", target: "#education" },
  { num: "03", label: "Work & Ambitions", target: "#experience" },
  { num: "04", label: "Projects Inventory", target: "#projects" },
  { num: "05", label: "Certifications", target: "#certificates" },
  { num: "06", label: "Contact channels", target: "#contact" },
]

function TableOfContents() {
  return (
    <div className="w-full py-24 px-6 md:px-12 bg-black/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Heading */}
        <div className="lg:col-span-4">
          <span className="font-mono text-xs text-accent tracking-widest uppercase mb-4 block">
            // INDEXING SYSTEM
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-fg-light leading-tight">
            Table of <br />
            <span className="italic font-normal text-accent/80">contents</span>
          </h2>
          <p className="font-sans font-light text-fg-light/50 text-sm mt-4 max-w-xs leading-relaxed">
            Navigate through my academic, development, and professional milestones.
          </p>
        </div>

        {/* Center/Right Column: Interactive Table of Contents */}
        <div className="lg:col-span-8 flex flex-col w-full divide-y divide-white/10 border-t border-b border-white/10">
          {tocItems.map((item, idx) => (
            <a 
              key={idx} 
              href={item.target} 
              className="group py-6 flex items-center justify-between hover:bg-white/[0.01] px-4 -mx-4 transition-all duration-300 rounded"
            >
              <div className="flex items-center gap-6 md:gap-10">
                <span className="font-mono text-xs text-accent/70 tracking-wider">
                  {item.num}
                </span>
                <span className="font-serif text-2xl md:text-3xl text-fg-light/80 group-hover:text-fg-light group-hover:italic transition-all duration-300">
                  {item.label}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline font-mono text-[10px] text-fg-light/30 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  GO TO SECTION
                </span>
                <ArrowUpRight 
                  size={20} 
                  className="text-fg-light/40 group-hover:text-accent transform group-hover:rotate-45 transition-transform duration-300" 
                />
              </div>
            </a>
          ))}
        </div>

      </div>

      {/* Footer Meta Row for Table of Contents */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between border-t border-white/5 mt-16 pt-8 gap-4">
        
        {/* Status Indicator */}
        <div className="flex items-center gap-2.5">
          <CheckCircle2 size={14} className="text-accent animate-pulse" />
          <span className="font-mono text-xs tracking-wider text-fg-light/65">
            Active status: <span className="text-fg-light font-medium">{profile.availability}</span>
          </span>
        </div>

        {/* LinkedIn Quick Link */}
        <a 
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-xs text-fg-light/50 hover:text-accent tracking-widest transition-colors duration-300 border-b border-white/10 hover:border-accent pb-0.5"
        >
          CONNECT ON LINKEDIN
          <ArrowUpRight size={12} />
        </a>

      </div>
    </div>
  )
}

export default TableOfContents
