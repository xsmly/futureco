import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import MartianBackground from '../components/MartianBackground';

// ── Hologram Tilt Card Component ──
function TiltCard({ role, onClick, delayIdx }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = -((y - centerY) / centerY) * 10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    setGlarePos({ 
      x: (x / rect.width) * 100, 
      y: (y / rect.height) * 100,
      opacity: 0.15 
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative text-left glass-card p-6 group cursor-pointer animate-fade-in-up delay-${delayIdx * 100}`}
      style={{
        transform,
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glare effect layer */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[16px] transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 60%)`,
        }}
      />

      <div style={{ transform: 'translateZ(20px)' }} className="flex items-start gap-4">
        <div className="w-10 h-10 shrink-0 rounded-lg bg-black/5 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(45,212,191,0.3)] transition-all duration-500">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-aerospace-charcoal group-hover:text-nebula-teal transition-colors duration-300">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        
        <div>
          <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-nebula-teal">
            {role.department}
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-nebula-teal transition-colors duration-300">
            {role.title}
          </h3>
          <p className="text-xs text-deep-slate leading-relaxed">
            {role.desc}
          </p>
          
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-aerospace-charcoal opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0">
            Initialize Session
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Text Scramble Component ──
function ScrambleText({ text, onComplete }) {
  const [displayText, setDisplayText] = useState('');
  const chars = '!<>-_\\\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    let frame = 0;
    let iteration = 0;
    const update = () => {
      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (i < iteration) {
          result += text[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplayText(result);
      
      if (iteration >= text.length) {
        if (onComplete) onComplete();
        return; // done
      }
      
      frame++;
      if (frame % 3 === 0) {
        iteration += 1;
      }
      requestAnimationFrame(update);
    };
    const animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [text]);

  return <span>{displayText}</span>;
}


// ── Main Landing Page ──
export default function LandingPage() {
  const ctx = useContext(AppContext);
  const [initializing, setInitializing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const roles = [
    {
      id: 'alex-morgan',
      title: 'Habitat Operations Engineer',
      department: 'Systems Engineering',
      desc: 'Oversee life support, power arrays, and structural integrity across Valles Marineris.',
    },
    {
      id: 'hydro-lead',
      title: 'Hydroponics Yield Specialist',
      department: 'Agricultural Sciences',
      desc: 'Optimize water reclamation and maximize caloric output in zero-G greenhouse modules.',
    },
    {
      id: 'eva-commander',
      title: 'EVA Systems Commander',
      department: 'Exterior Operations',
      desc: 'Manage depressurization protocols, spacesuit diagnostics, and external hardware repairs.',
    },
  ];

  // Global Parallax Effect
  useEffect(() => {
    const handleGlobalMouse = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // max shift 20px
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleGlobalMouse);
    return () => window.removeEventListener('mousemove', handleGlobalMouse);
  }, []);

  const handleSelectRole = (role) => {
    setInitializing(true);
    // Real JS timeout to simulate authentication handshake
    setTimeout(() => {
      ctx.setIsAuthenticated(true);
      ctx.setCurrentPage('overview');
    }, 2500);
  };

  return (
    <div className="min-h-screen relative flex font-space text-aerospace-charcoal overflow-hidden bg-white">
      
      {/* ── Left Pane: Visual Anchor ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 border-r border-precision-border">
        {/* The generated habitat image as background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out scale-105"
          style={{ 
            backgroundImage: 'url(/habitat-bg.png)',
            transform: `translate(${-mousePos.x * 0.8}px, ${-mousePos.y * 0.8}px) scale(1.05)`,
          }}
        />
        {/* Subtle gradient overlay to ensure text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        
        {/* Dynamic dust particles overlay */}
        <div className="absolute inset-0 mix-blend-screen opacity-60">
          <MartianBackground mousePos={mousePos} />
        </div>

        {/* Corporate Branding positioned over the image */}
        <div className="absolute top-12 left-12 z-20">
          <div className="flex items-center gap-3 animate-fade-in-up">
            <div className="w-12 h-12 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                <line x1="12" y1="22" x2="12" y2="15.5" />
                <polyline points="22 8.5 12 15.5 2 8.5" />
              </svg>
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-semibold tracking-wide shadow-black drop-shadow-md">FutureCo</h1>
              <p className="text-xs text-white/80 tracking-widest uppercase font-medium">Growth Platform</p>
            </div>
          </div>
        </div>
        
        {/* Decorative node info */}
        <div className="absolute bottom-12 left-12 z-20 text-white/60 font-mono text-xs">
          ENCRYPTED CONNECTION • VMA NODE 7 <br/>
          VALLES MARINERIS STATION ALPHA
        </div>
      </div>

      {/* ── Right Pane: Interaction ── */}
      <div className="w-full lg:w-1/2 flex flex-col relative bg-white overflow-y-auto">
        
        {/* Mobile Header (Only visible on small screens) */}
        <header className="lg:hidden p-6 flex items-center justify-between border-b border-precision-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nebula-teal/30 to-nebula-teal/10 border border-nebula-teal/30 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                <line x1="12" y1="22" x2="12" y2="15.5" />
                <polyline points="22 8.5 12 15.5 2 8.5" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-wide">FutureCo</h1>
              <p className="text-[10px] text-deep-slate tracking-widest uppercase">Growth Platform</p>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12 max-w-xl mx-auto w-full">
          {initializing ? (
            <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in-up">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-2 border-nebula-teal/30"></div>
                <div className="absolute inset-0 rounded-full border-2 border-nebula-teal border-t-transparent animate-spin"></div>
                <div className="absolute inset-2 rounded-full border border-mars-rust/20 border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
              </div>
              
              <div className="text-center">
                <h2 className="text-2xl font-semibold tracking-wide mb-2 text-nebula-teal">
                  <ScrambleText text="AUTHENTICATING CREDENTIALS..." />
                </h2>
                <p className="text-sm text-deep-slate font-mono animate-pulse-fast">
                  Handshake with Valles Marineris Station Alpha telemetry
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="mb-10 animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 leading-tight">
                  Welcome to <br className="hidden lg:block"/> Mars Habitat 2035.
                </h2>
                <p className="text-base text-deep-slate">
                  Select your operational assignment to initialize your terminal.
                </p>
              </div>

              <div className="flex flex-col gap-4" style={{ perspective: '1000px' }}>
                {roles.map((role, idx) => (
                  <TiltCard 
                    key={role.id} 
                    role={role} 
                    delayIdx={idx + 1}
                    onClick={() => handleSelectRole(role)} 
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

    </div>
  );
}
