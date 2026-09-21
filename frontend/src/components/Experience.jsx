import React from 'react'
import { Briefcase, ArrowUpRight } from 'lucide-react'
import { experience } from '../mock'

function Experience() {
  return (
    <div className="w-full py-24 px-6 md:px-12 bg-black/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">
            // EXPERIENCE MODULE
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-fg-light leading-tight">
            Work & <span className="italic font-normal text-accent/80">ambitions</span>
          </h2>
        </div>

        {/* Two-card layout (stacks on mobile, side-by-side on md+) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {experience.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-8 md:p-10 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.2)] hover:border-white/10"
            >
              
              {/* Interactive ping-dot in the top-right that scales on hover */}
              <div className="absolute top-8 right-8 flex items-center justify-center">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent transform group-hover:scale-150 transition-transform duration-300"></span>
                </span>
              </div>

              {/* Timeframe / Period */}
              <div className="font-mono text-xs text-fg-light/40 tracking-widest uppercase mb-6">
                // PERIOD: {item.period}
              </div>

              {/* Role Title (Large Editorial font) */}
              <h3 className="font-serif text-3xl md:text-4xl text-fg-light group-hover:text-accent transition-colors duration-300 mb-2 leading-tight">
                {item.title}
              </h3>
              
              {/* Role Description Header */}
              <div className="flex items-center gap-2 mb-6 text-fg-light/80">
                <Briefcase size={13} className="text-fg-light/40" />
                <span className="font-sans text-xs font-semibold tracking-wide">
                  {item.role}
                </span>
                <span className="text-fg-light/30 text-xs font-mono">•</span>
                <span className="font-mono text-[10px] tracking-wider text-fg-light/50">
                  {item.company}
                </span>
              </div>

              {/* Description Paragraph */}
              <p className="font-sans font-light text-sm text-fg-light/65 leading-relaxed mb-8 max-w-xl">
                {item.description}
              </p>

              {/* Technology Stack Tags */}
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                {item.tags.map((tag, tagIdx) => (
                  <span 
                    key={tagIdx} 
                    className="px-3 py-1 text-[10px] font-mono rounded-full bg-white/5 border border-white/5 text-fg-light/70 hover:border-accent/30 hover:text-accent transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Experience
