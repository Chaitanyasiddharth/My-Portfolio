import React, { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, Loader, Trash2, ArrowUpRight } from 'lucide-react'
import { profile } from '../mock'
const API_BASE_URL = "https://my-portfolio-backend-7v5t.onrender.com";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState('')

  const messagesEndRef = useRef(null)

  // Initialize or fetch session ID on mount
  useEffect(() => {
    let session = sessionStorage.getItem('portfolio_chat_session')
    if (!session) {
      session = 'session_' + Math.random().toString(36).substring(2, 15)
      sessionStorage.setItem('portfolio_chat_session', session)
    }
    setSessionId(session)
    loadHistory(session)
  }, [])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Fetch past messages from backend
  const loadHistory = async (session) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/history/${session}`)
      if (response.ok) {
        const data = await response.json()
        if (data.history && data.history.length > 0) {
          setMessages(data.history)
        } else {
          // Welcome greeting if history is empty
          setMessages([
            {
              role: 'assistant',
              content: `Hi there! I am Chaitanya's virtual AI assistant. Feel free to ask me anything about his skills, education, or projects!`
            }
          ])
        }
      }
    } catch (err) {
      console.error('Failed to load chat history:', err)
      setMessages([
        {
          role: 'assistant',
          content: `Hi! I am Chaitanya's assistant. (Note: Could not connect to the backend server to load history. Please verify it is running.)`
        }
      ])
    }
  }

  // Clear chat logs
  const handleClearChat = () => {
    const freshSession = 'session_' + Math.random().toString(36).substring(2, 15)
    sessionStorage.setItem('portfolio_chat_session', freshSession)
    setSessionId(freshSession)
    setMessages([
      {
        role: 'assistant',
        content: `Conversation history cleared. Ask me anything about Chaitanya!`
      }
    ])
  }

  // Send message and stream response via SSE
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const userMsg = inputText.trim()
    setInputText('')

    // 1. Add user message locally
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setIsTyping(true)

    // 2. Prepare empty assistant message for streaming
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/stream`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsg,
          session_id: sessionId,
        }),
      })

      if (!response.ok) {
        throw new Error('Streaming connection failed')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')

        // Keep incomplete last line in the buffer
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim()
            if (dataStr === '[DONE]') {
              break
            }
            if (dataStr.startsWith('[ERROR]')) {
              setMessages((prev) => {
                const updated = [...prev]
                updated[updated.length - 1].content = `Connection Error: ${dataStr.slice(7)}`
                return updated
              })
              break
            }
            try {
              const data = JSON.parse(dataStr)
              if (data.token) {
                setMessages((prev) => {
                  const updated = [...prev]
                  updated[updated.length - 1].content += data.token
                  return updated
                })
              }
            } catch (err) {
              console.error('Error parsing token:', err)
            }
          }
        }
      }
    } catch (err) {
      console.error(err)
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1].content = 'Failed to fetch response. Make sure the backend server is running.'
        return updated
      })
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-fg-light hover:bg-accent text-bg-dark flex items-center justify-center shadow-[0_4px_25px_rgba(52,211,153,0.25)] transition-all duration-300 transform hover:scale-105 active:scale-95 relative"
      >
        {isOpen ? (
          <X size={22} className="text-bg-dark" />
        ) : (
          <>
            <MessageSquare size={22} className="text-bg-dark" />
            <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-accent border-2 border-fg-light animate-pulse"></span>
          </>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="absolute bottom-18 right-0 w-[360px] max-w-[calc(100vw-2rem)] h-[480px] bg-bg-dark/95 backdrop-blur-md border border-white/10 rounded-xl flex flex-col overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.6)] animate-fade-in-up">

          {/* Header */}
          <div className="px-5 py-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></span>
              <span className="font-mono text-xs tracking-wider text-fg-light/80">
                CORE_ASSISTANT
              </span>
            </div>

            {/* Clear Chat Button */}
            <button
              onClick={handleClearChat}
              title="Clear Conversation"
              className="text-fg-light/40 hover:text-red-400 transition-colors p-1.5 rounded hover:bg-white/5"
            >
              <Trash2 size={13} />
            </button>
          </div>

          {/* Messages Logs Area */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 select-text">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
              >
                {/* Role label in mono */}
                <span className="font-mono text-[8px] text-fg-light/30 tracking-widest uppercase mb-1.5">
                  {msg.role === 'user' ? 'VISITOR' : 'CLAUDE'}
                </span>

                {/* Bubble content */}
                <div
                  className={`px-4 py-3 rounded-lg text-xs leading-relaxed ${msg.role === 'user'
                      ? 'bg-accent/10 border border-accent/25 text-accent rounded-tr-none'
                      : 'bg-white/[0.03] border border-white/5 text-fg-light/90 rounded-tl-none'
                    }`}
                >
                  {msg.content || (isTyping && idx === messages.length - 1 ? (
                    <span className="inline-block w-1 h-3 bg-accent animate-cursor-blink"></span>
                  ) : '')}
                </div>
              </div>
            ))}
            {isTyping && messages[messages.length - 1]?.content && (
              <div className="self-start flex items-center gap-1.5 text-fg-light/30 font-mono text-[9px] tracking-wider mt-1 animate-pulse">
                <Loader size={8} className="animate-spin text-accent" />
                STREAMING RESPONSE...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Submission Area */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-white/5 bg-black/20 flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask about skills, projects, background..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isTyping}
              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs font-sans text-fg-light focus:outline-none focus:border-accent/40 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isTyping || !inputText.trim()}
              className="px-3.5 rounded-lg bg-fg-light text-bg-dark hover:bg-accent hover:text-bg-dark transition-all duration-300 disabled:opacity-40 flex items-center justify-center"
            >
              <Send size={12} />
            </button>
          </form>

        </div>
      )}

    </div>
  )
}

export default ChatWidget
