import { ArrowUpRight } from 'lucide-react'
import { projects, profile } from '../mock'

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

function Projects() {
  return (
    <div className="w-full py-24 px-6 md:px-12 bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">
            // INVENTORY OF WORK
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-fg-light leading-tight">
            Selected <span className="italic font-normal text-accent/80">projects</span>
          </h2>
        </div>

        {/* Table-Style Project Rows */}
        <div className="flex flex-col w-full border-t border-white/10 divide-y divide-white/10 mb-16">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center py-8 px-4 -mx-4 hover:bg-white/[0.01] transition-all duration-300 rounded"
            >
              
              {/* Col 1: Number (lg:col-span-1) */}
              <div className="lg:col-span-1 flex items-center">
                <span className="font-mono text-xs text-accent/70 tracking-widest">
                  {project.id}
                </span>
              </div>

              {/* Col 2: Title & Subtitle (lg:col-span-3) */}
              <div className="lg:col-span-3 flex flex-col items-start gap-1">
                <span className="font-mono text-[10px] tracking-widest text-fg-light/45 uppercase">
                  {project.subtitle}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-fg-light group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
              </div>

              {/* Col 3: Description (lg:col-span-4) */}
              <div className="lg:col-span-4">
                <p className="font-sans font-light text-sm text-fg-light/65 leading-relaxed max-w-md">
                  {project.description}
                </p>
              </div>

              {/* Col 4: Stack Chips (lg:col-span-3) */}
              <div className="lg:col-span-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech, techIdx) => (
                  <span 
                    key={techIdx}
                    className="px-2.5 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/5 text-fg-light/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Col 5: Status Badge & Arrow (lg:col-span-1) */}
              <div className="lg:col-span-1 flex items-center justify-between lg:justify-end gap-4">
                {/* Status Badges: color coded (Live = emerald, Ongoing = white/10) */}
                {project.status === 'Live' ? (
                  <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-emerald-500/10 text-accent border border-emerald-500/20">
                    LIVE
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-white/5 text-fg-light/40 border border-white/10">
                    ONGOING
                  </span>
                )}
                
                <ArrowUpRight 
                  size={18} 
                  className="text-fg-light/40 group-hover:text-accent transform group-hover:rotate-45 transition-transform duration-300"
                />
              </div>

            </div>
          ))}
        </div>

        {/* GitHub link at the bottom */}
        <div className="flex justify-center">
          <a 
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.01] hover:bg-white/[0.03] text-fg-light font-mono text-xs tracking-widest transition-all duration-300 group"
          >
            <GithubIcon className="text-fg-light/70 group-hover:text-accent w-[15px] h-[15px]" />
            VIEW ALL REPOSITORIES
            <ArrowUpRight size={14} className="text-fg-light/40 group-hover:text-accent transform group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </div>

      </div>
    </div>
  )
}

export default Projects
