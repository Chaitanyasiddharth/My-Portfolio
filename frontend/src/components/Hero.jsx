import React from 'react'
import { MapPin, ArrowDown } from 'lucide-react'
import { profile } from '../mock'

function Hero() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center pt-24 px-6 md:px-12 grid-overlay radial-glow-hero overflow-hidden">
      
      {/* Subtle border decor lines */}
      <div className="absolute top-0 right-1/4 h-full w-px bg-white/[0.02] hidden lg:block"></div>
      <div className="absolute top-0 left-1/4 h-full w-px bg-white/[0.02] hidden lg:block"></div>

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 z-10 py-12">
        
        {/* Left Column: Heading and Details */}
        <div className="flex-1 flex flex-col items-start text-left animate-fade-in-up">
          
          {/* Location Badge + Meta */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.01] shadow-[0_0_15px_rgba(52,211,153,0.01)]">
              <MapPin size={13} className="text-accent" />
              <span className="font-mono text-xs tracking-wider text-fg-light/80">
                {profile.location}
              </span>
            </div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              // {profile.availability.toUpperCase()}
            </span>
          </div>

          {/* Monospace Preheading */}
          <div className="font-mono text-xs text-fg-light/45 tracking-widest uppercase mb-4">
            [ hello, i am ]
          </div>

          {/* Huge Name Heading (fluid serif name with italic surname) */}
          <h1 className="font-serif leading-[0.95] text-fg-light tracking-tight mb-8" style={{ fontSize: 'clamp(3.5rem, 9.5vw, 7.5rem)' }}>
            {profile.name.split(' ')[0]} <br />
            <span className="italic font-normal text-accent/90">{profile.name.split(' ')[1]}</span>
          </h1>

          {/* Two Column details row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full border-t border-white/10 pt-8 mb-8">
            
            {/* Column 1: Role / Affiliation */}
            <div className="md:col-span-4 flex flex-col gap-1.5">
              <div className="font-mono text-[10px] tracking-wider text-fg-light/40 uppercase">// CURRENT ROLE</div>
              <div className="font-sans font-semibold text-fg-light/90 text-sm">{profile.title}</div>
              <div className="inline-flex items-center self-start px-2.5 py-0.5 mt-1 text-[10px] font-mono rounded bg-emerald-500/10 text-accent border border-emerald-500/20">
                Alliance University
              </div>
            </div>

            {/* Column 2: Bio Description */}
            <div className="md:col-span-8">
              <div className="font-mono text-[10px] tracking-wider text-fg-light/40 uppercase mb-2.5">// BIOGRAPHY</div>
              <p className="font-sans font-light text-fg-light/70 text-sm leading-relaxed max-w-lg">
                {profile.bio}
              </p>
            </div>

          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 w-full">
            <a 
              href="#projects" 
              className="px-8 py-3.5 rounded-full bg-fg-light text-bg-dark font-sans text-xs font-semibold tracking-wider hover:bg-accent transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]"
            >
              VIEW WORK
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3.5 rounded-full border border-white/10 hover:border-white/30 bg-transparent text-fg-light font-mono text-xs tracking-widest hover:bg-white/[0.02] transition-all duration-300"
            >
              GET IN TOUCH
            </a>
          </div>

        </div>

        {/* Right Column: Profile Photo with Status Ring & Grayscale-to-Color hover */}
        <div className="flex-shrink-0 relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          
          {/* Outer Rotating Status Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-accent/25 animate-[spin_60s_linear_infinite]"></div>
          
          {/* Inner Accent Ring */}
          <div className="absolute inset-2 rounded-full border border-white/5"></div>
          
          {/* Version Tag */}
          <div className="absolute -top-3 -right-3 px-3 py-1 bg-bg-dark border border-white/10 rounded-full font-mono text-[9px] tracking-widest text-fg-light/60 z-20">
            v{profile.version}
          </div>

          {/* Profile Photo Wrapper */}
          <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border border-white/15 bg-[#141414] relative z-10 group shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            
            {/* The grayscale-to-color transition photo */}
            <img 
              src={profile.avatarUrl} 
              alt={profile.name}
              className="w-full h-full object-cover grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-[700ms] ease-in-out"
              onError={(e) => {
                // Fallback to a beautiful placeholder gradient if connection fails
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            
            {/* Premium Fallback CSS Avatar */}
            <div className="hidden absolute inset-0 flex-col items-center justify-center bg-gradient-to-br from-bg-dark to-zinc-900 text-fg-light/20">
              <span className="font-serif text-5xl tracking-widest text-accent/30 font-medium">CS</span>
              <span className="font-mono text-[9px] tracking-wider mt-2 opacity-50">PORTFOLIO AVATAR</span>
            </div>

          </div>

        </div>

      </div>

      {/* Floating Scroll Indicator (Right aligned) */}
      <div className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-4 z-10 animate-bounce">
        <span className="font-mono text-[9px] tracking-widest text-fg-light/40 rotate-90 translate-y-[-15px]">SCROLL</span>
        <div className="w-px h-10 bg-white/20 relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-accent"></div>
        </div>
      </div>

    </div>
  )
}

export default Hero
