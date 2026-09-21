import React from 'react'
import { GraduationCap, Award, BookOpen } from 'lucide-react'
import { education, focusAreas } from '../mock'

function Education() {
  return (
    <div className="w-full py-24 px-6 md:px-12 bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">
            // ACADEMIC FRAMEWORK
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-fg-light leading-tight">
            Academic <span className="italic font-normal text-accent/80">timeline</span>
          </h2>
        </div>

        {/* 12-Column Main Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Timeline (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-12 relative border-l border-white/5 pl-6 md:pl-10 ml-2">
            
            {education.map((item, idx) => (
              <div key={idx} className="relative group">
                
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-bg-dark border border-white/20 group-hover:border-accent group-hover:bg-accent transition-all duration-300 z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-bg-dark"></div>
                </div>

                {/* Sub-grid: 3 cols for year range, 9 cols for academic details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                  
                  {/* Years (3 cols) */}
                  <div className="md:col-span-3">
                    <span className="font-mono text-sm font-semibold tracking-wider text-fg-light/60 group-hover:text-accent transition-colors duration-300">
                      {item.year}
                    </span>
                  </div>

                  {/* Details (9 cols) */}
                  <div className="md:col-span-9 flex flex-col items-start">
                    
                    {/* Header Row: Degree & Status */}
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-serif text-2xl text-fg-light font-medium group-hover:text-fg-light/95 transition-colors duration-300">
                        {item.degree}
                      </h3>
                      
                      {/* Status Badges: green/emerald for Ongoing, white/10 for Completed */}
                      {item.status === 'Ongoing' ? (
                        <span className="px-2.5 py-0.5 text-[9px] font-mono rounded-full bg-emerald-500/10 text-accent border border-emerald-500/20 animate-pulse">
                          ONGOING
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 text-[9px] font-mono rounded-full bg-white/5 text-fg-light/40 border border-white/10">
                          COMPLETED
                        </span>
                      )}
                    </div>

                    {/* Institution */}
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap size={14} className="text-fg-light/40" />
                      <span className="font-sans text-sm text-fg-light/70 font-light">
                        {item.institution}
                      </span>
                      <span className="text-fg-light/30 text-xs font-mono">•</span>
                      <span className="font-mono text-[11px] text-fg-light/40">
                        {item.location}
                      </span>
                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* Right Side: Sticky Focus Areas (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-8 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
              
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <BookOpen size={16} className="text-accent" />
                <h3 className="font-mono text-xs tracking-widest text-fg-light/80 uppercase">
                  Focus Areas & Levels
                </h3>
              </div>

              {/* Focus list */}
              <ul className="flex flex-col gap-5">
                {focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-start justify-between gap-4 group">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-[10px] text-fg-light/30 mt-0.5 group-hover:text-accent transition-colors duration-200">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-sans text-xs text-fg-light/80 leading-normal font-light">
                        {area.name}
                      </span>
                    </div>
                    
                    <span className="font-mono text-[9px] tracking-widest text-accent/80 bg-accent/5 border border-accent/10 px-2 py-0.5 rounded uppercase flex-shrink-0">
                      {area.level}
                    </span>
                  </li>
                ))}
              </ul>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Education
