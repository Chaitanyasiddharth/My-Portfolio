import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TableOfContents from '../components/TableOfContents'
import Marquee from '../components/Marquee'
import Education from '../components/Education'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Certificates from '../components/Certificates'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ChatWidget from '../components/ChatWidget'

function Portfolio() {
  return (
    <div className="relative min-h-screen w-full bg-bg-dark text-fg-light select-none">
      <Navbar />
      
      {/* Main content sections with IDs for smooth-scroll anchoring */}
      <main className="w-full">
        <section id="hero">
          <Hero />
        </section>
        
        <section id="toc" className="border-t border-white/5">
          <TableOfContents />
        </section>
        
        <section id="marquee" className="py-8 bg-black/20 overflow-hidden">
          <Marquee />
        </section>
        
        <section id="education" className="border-t border-white/5">
          <Education />
        </section>
        
        <section id="experience" className="border-t border-white/5">
          <Experience />
        </section>
        
        <section id="projects" className="border-t border-white/5">
          <Projects />
        </section>
        
        <section id="certificates" className="border-t border-white/5">
          <Certificates />
        </section>
        
        <section id="contact" className="border-t border-white/5">
          <Contact />
        </section>
      </main>
      
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default Portfolio
