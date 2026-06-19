import { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

export default function DevelopmentAssistant() {
  const ctx = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ctx.chatMessages]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    ctx.processMessage(trimmed);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // --- Closed state: floating orb ---
  if (!ctx.chatOpen) {
    return (
      <button
        className="orb-button fixed right-6 bottom-6 z-50 animate-pulse-glow"
        onClick={() => ctx.setChatOpen(true)}
        aria-label="Open Development Assistant"
      >
        {/* Diamond / crystal icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0F172A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L4 9l8 13 8-13z" />
          <path d="M4 9h16" />
          <path d="M12 2l4 7-4 13-4-13z" opacity="0.5" />
        </svg>
      </button>
    );
  }

  // --- Open state: drawer overlay + panel ---
  return (
    <>
      {/* Overlay */}
      <div
        className="drawer-overlay"
        onClick={() => ctx.setChatOpen(false)}
      />

      {/* Drawer panel */}
      <div className="drawer-panel flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-precision-border">
          <div className="flex items-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L4 9l8 13 8-13z" />
              <path d="M4 9h16" />
            </svg>
            <h2 className="text-lg font-semibold text-aerospace-charcoal">
              Development Assistant
            </h2>
            <span className="badge-flight">Sol 61</span>
          </div>
          <button
            onClick={() => ctx.setChatOpen(false)}
            className="p-1.5 rounded-lg transition-all duration-300 hover:bg-black/5"
            aria-label="Close Assistant"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Chat messages area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {ctx.chatMessages.length === 0 ? (
            /* Welcome state */
            <div className="flex flex-col items-center text-center pt-8 space-y-6">
              {/* Decorative icon */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-slate-100 border border-precision-border">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                  <path d="M8 18l1-3" opacity="0.5" />
                  <path d="M16 18l-1-3" opacity="0.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-aerospace-charcoal mb-2">
                  Welcome, Habitat Crew
                </h3>
                <p className="text-sm text-deep-slate leading-relaxed max-w-xs mx-auto">
                  I can help you navigate your development journey on Mars. Ask me about priorities,
                  learning paths, evidence reviews, or manager prep.
                </p>
              </div>

              {/* Suggested prompts */}
              {ctx.suggestedPrompts && ctx.suggestedPrompts.length > 0 && (
                <div className="w-full space-y-2 pt-2">
                  <p className="text-xs text-deep-slate/70 uppercase tracking-wider font-medium">
                    Suggested Prompts
                  </p>
                  <div className="flex flex-col gap-2">
                    {ctx.suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        className="btn-secondary text-left text-sm px-4 py-3 w-full"
                        onClick={() => ctx.processMessage(prompt)}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Chat log */
            <>
              {ctx.chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 ${
                      msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                    }`}
                  >
                    {/* Role indicator */}
                    <div className="flex items-center gap-2 mb-1.5">
                      {msg.role === 'user' ? (
                        <>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#0F172A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="8" r="4" />
                            <path d="M5 20c0-4 3.5-7 7-7s7 3 7 7" />
                          </svg>
                          <span className="text-xs font-medium text-flight-teal opacity-70">
                            You
                          </span>
                        </>
                      ) : (
                        <>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#0F172A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 2L4 9l8 13 8-13z" />
                            <path d="M4 9h16" />
                          </svg>
                          <span className="text-xs font-medium text-aerospace-charcoal opacity-50">
                            Assistant
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-aerospace-charcoal leading-relaxed">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}

              {/* Suggested prompts below chat */}
              {ctx.suggestedPrompts && ctx.suggestedPrompts.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs text-deep-slate/70 uppercase tracking-wider font-medium mb-2">
                    Suggested Prompts
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ctx.suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        className="btn-secondary text-xs px-3 py-2"
                        onClick={() => ctx.processMessage(prompt)}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </>
          )}
        </div>

        {/* Input area */}
        <div className="px-6 py-4 border-t border-precision-border">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your development..."
              className="flex-1 bg-white/80 border border-precision-border rounded-xl px-4 py-3 text-sm text-aerospace-charcoal placeholder-deep-slate/50 focus:outline-none focus:border-flight-teal transition-all duration-300 font-[inherit]"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-200 border border-precision-border transition-all duration-300 hover:bg-slate-300 hover:shadow-sm flex-shrink-0"
              aria-label="Send message"
            >
              {/* Arrow / send icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0F172A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
