import React from 'react'
import { Award, ShieldCheck } from 'lucide-react'
import { certificates } from '../mock'

function Certificates() {
  return (
    <div className="w-full py-24 px-6 md:px-12 bg-black/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">
            // ACCREDITATIONS
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-fg-light leading-tight">
            Certifications & <span className="italic font-normal text-accent/80">badges</span>
          </h2>
        </div>

        {/* Responsive Grid layout (1 -> 2 -> 4 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {certificates.map((cert, idx) => (
            <div 
              key={idx}
              className="group relative rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] p-6 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
            >
              
              {/* Top Row: Circular Award Icon */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                  <Award size={18} className="text-fg-light/60 group-hover:text-accent transition-colors duration-300" />
                </div>
                
                {/* Monospace Year */}
                <span className="font-mono text-xs text-fg-light/40 tracking-wider">
                  {cert.year}
                </span>
              </div>

              {/* Middle Row: Title (serif) */}
              <div className="mb-6">
                <h3 className="font-serif text-lg md:text-xl text-fg-light group-hover:text-accent/90 transition-colors duration-300 leading-snug">
                  {cert.title}
                </h3>
              </div>

              {/* Bottom Row: Footnote metadata (Issuer & Credential ID) */}
              <div className="border-t border-white/5 pt-4 flex flex-col gap-1.5">
                <div className="font-sans text-[11px] text-fg-light/60 font-light flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-accent/70" />
                  {cert.issuer}
                </div>
                <div className="font-mono text-[9px] text-fg-light/30 uppercase tracking-widest">
                  ID: {cert.credentialId}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Certificates
