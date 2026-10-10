import React, { useState } from 'react'
import { Copy, Check, Mail, Send, ArrowRight, Loader } from 'lucide-react'
import { profile } from '../mock'

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

function Contact() {
  const [copied, setCopied] = useState(false)
  const [roleInput, setRoleInput] = useState('')
  const [pitch, setPitch] = useState('')
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // Copy email to clipboard function
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setShowToast(true)
    setTimeout(() => setCopied(false), 2000)
    setTimeout(() => setShowToast(false), 3000)
  }

  // SSE handler for streaming the tailored pitch
  const handleGeneratePitch = async (e) => {
    e.preventDefault()
    if (!roleInput.trim()) return

    setPitch('')
    setIsSummarizing(true)

    try {
      const response = await fetch('https://my-portfolio-backend-7v5t.onrender.com/api/summarize/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: roleInput }),
      })

      if (!response.ok) {
        throw new Error('Failed to start streaming pitch')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')

        // Save the incomplete last line back to buffer
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim()
            if (dataStr === '[DONE]') {
              break
            }
            if (dataStr.startsWith('[ERROR]')) {
              setPitch((prev) => prev + '\n\n' + dataStr)
              break
            }
            try {
              const data = JSON.parse(dataStr)
              if (data.token) {
                setPitch((prev) => prev + data.token)
              }
            } catch (err) {
              console.error('Error parsing token:', err)
            }
          }
        }
      }
    } catch (err) {
      console.error(err)
      setPitch('Error: Could not connect to the backend server. Please verify it is running on port 8000.')
    } finally {
      setIsSummarizing(false)
    }
  }

  return (
    <div className="w-full py-24 px-6 md:px-12 bg-bg-dark radial-glow-contact relative overflow-hidden">

      {/* Toast Alert */}
      {showToast && (
        <div className="fixed bottom-8 left-8 z-50 px-4 py-3 rounded border border-accent/20 bg-bg-dark/90 text-accent font-mono text-[10px] tracking-widest uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(52,211,153,0.15)] animate-bounce">
          <Check size={12} />
          EMAIL COPIED TO CLIPBOARD!
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start z-10 relative">

        {/* Left Side: Contact Info & Copy Email (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">

          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">
            // GET IN TOUCH
          </span>

          <h2 className="font-serif text-5xl md:text-6xl text-fg-light leading-tight mb-8">
            Let's build <br />
            <span className="italic font-normal text-accent/80">something</span>.
          </h2>

          <p className="font-sans font-light text-fg-light/60 text-sm leading-relaxed mb-8 max-w-sm">
            Whether you want to discuss machine learning, internships, or building complex web applications, my channels are always open.
          </p>

          {/* Click to Copy Email Card */}
          <div
            onClick={handleCopyEmail}
            className="group w-full max-w-sm rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-6 mb-8 cursor-pointer transition-all duration-300 hover:border-accent/20 shadow-[0_0_20px_rgba(0,0,0,0.1)] flex items-center justify-between"
          >
            <div className="flex flex-col items-start gap-1">
              <span className="font-mono text-[9px] tracking-widest text-fg-light/40 uppercase">
                CLICK TO COPY EMAIL
              </span>
              <span className="font-sans text-sm font-semibold text-fg-light group-hover:text-accent transition-colors duration-300">
                {profile.email}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
              {copied ? (
                <Check size={15} className="text-accent" />
              ) : (
                <Copy size={15} className="text-fg-light/60 group-hover:text-accent transition-colors duration-300" />
              )}
            </div>
          </div>

          {/* Social Quick links */}
          <div className="flex flex-col gap-3 w-full max-w-sm">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <LinkedinIcon className="text-fg-light/50 group-hover:text-accent w-[14px] h-[14px]" />
                <span className="font-mono text-xs text-fg-light/70">{profile.linkedinUsername}</span>
              </div>
              <ArrowRight size={13} className="text-fg-light/35 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <GithubIcon className="text-fg-light/50 group-hover:text-accent w-[14px] h-[14px]" />
                <span className="font-mono text-xs text-fg-light/70">{profile.githubUsername}</span>
              </div>
              <ArrowRight size={13} className="text-fg-light/35 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </a>
          </div>

        </div>

        {/* Right Side: Interactive AI Resume Summarizer Pitch block (7 cols) */}
        <div className="lg:col-span-7 w-full lg:pl-8">
          <div className="rounded-xl border border-white/5 bg-white/[0.01] p-8 shadow-[0_0_50px_rgba(0,0,0,0.35)] relative">

            <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                <h3 className="font-mono text-xs tracking-widest text-fg-light/80 uppercase">
                  AI Resume Summarizer
                </h3>
              </div>
              <span className="font-mono text-[9px] tracking-widest text-fg-light/30">
                CLAUDE INTEGRATION
              </span>
            </div>

            <p className="font-sans font-light text-xs text-fg-light/50 mb-6 leading-relaxed">
              Type in a hiring role (e.g. <strong>React Developer</strong>, <strong>ML Intern</strong>, or <strong>Data Scientist</strong>), and the AI chatbot will stream a 3-paragraph tailored pitch explaining my fit.
            </p>

            {/* Input Form */}
            <form onSubmit={handleGeneratePitch} className="flex gap-2.5 mb-6">
              <input
                type="text"
                placeholder="Enter role (e.g., ML Research Intern)..."
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                disabled={isSummarizing}
                className="flex-1 px-4 py-3 rounded-lg border border-white/10 bg-black/40 text-sm font-sans text-fg-light focus:outline-none focus:border-accent/40 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSummarizing || !roleInput.trim()}
                className="px-6 py-3 rounded-lg bg-white/[0.03] border border-white/10 hover:border-accent/40 text-fg-light hover:text-accent font-mono text-xs tracking-wider transition-all duration-300 disabled:opacity-40 flex items-center gap-2"
              >
                {isSummarizing ? (
                  <Loader size={12} className="animate-spin" />
                ) : (
                  <Send size={12} />
                )}
                GENERATE
              </button>
            </form>

            {/* Pitch streaming response container */}
            <div className="min-h-[160px] p-5 rounded-lg border border-white/5 bg-black/30 font-sans text-sm text-fg-light/80 leading-relaxed text-left flex flex-col justify-start relative select-text">
              {isSummarizing && !pitch && (
                <div className="flex items-center gap-2 text-fg-light/40 font-mono text-[11px] tracking-wider">
                  <Loader size={12} className="animate-spin" />
                  ANALYZING ROLE & COMPILING PROFILE...
                </div>
              )}

              {!pitch && !isSummarizing && (
                <div className="text-fg-light/30 font-mono text-xs italic py-6 text-center w-full">
                  Waiting for role selection...
                </div>
              )}

              {pitch && (
                <div className="whitespace-pre-line text-sm font-light text-fg-light/95 leading-relaxed">
                  {pitch}
                  {isSummarizing && (
                    <span className="inline-block w-1.5 h-3 bg-accent ml-1 animate-cursor-blink"></span>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact
