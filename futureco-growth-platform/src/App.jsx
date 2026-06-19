import { useContext, useState } from 'react';
import { AppContext } from './context/AppContext';
import MartianBackground from './components/MartianBackground';
import AstronautSVG from './components/AstronautSVG';
import Drawer from './components/Drawer';
import DevelopmentAssistant from './components/DevelopmentAssistant';
import Overview from './pages/Overview';
import GrowthRoadmap from './pages/GrowthRoadmap';
import Support from './pages/Support';
import Learning from './pages/Learning';
import WorkSkills from './pages/WorkSkills';
import CheckIn from './pages/CheckIn';
import Recognition from './pages/Recognition';
import PrivacyControls from './pages/PrivacyControls';
import ManagerView from './pages/ManagerView';
import LandingPage from './pages/LandingPage';

const navItems = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'roadmap', label: 'Growth Roadmap', icon: 'roadmap' },
  { id: 'support', label: 'Support', icon: 'support' },
  { id: 'learning', label: 'Learning', icon: 'learning' },
  { id: 'skills', label: 'Work & Skills', icon: 'skills' },
  { id: 'checkin', label: 'Confidence', icon: 'checkin' },
  { id: 'recognition', label: 'Recognition', icon: 'recognition' },
  { id: 'privacy', label: 'Privacy', icon: 'privacy' },
  { id: 'manager', label: 'Manager View', icon: 'manager' },
];

function NavIcon({ type, active }) {
  const color = active ? '#2DD4BF' : '#0F172A';
  const opacity = active ? 1 : 0.5;

  const icons = {
    dashboard: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    roadmap: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    support: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    learning: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    skills: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    checkin: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    recognition: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
    privacy: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    manager: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
  };

  return icons[type] || null;
}

function renderPage(page) {
  switch (page) {
    case 'overview': return <Overview />;
    case 'roadmap': return <GrowthRoadmap />;
    case 'support': return <Support />;
    case 'learning': return <Learning />;
    case 'skills': return <WorkSkills />;
    case 'checkin': return <CheckIn />;
    case 'recognition': return <Recognition />;
    case 'privacy': return <PrivacyControls />;
    case 'manager': return <ManagerView />;
    default: return <Overview />;
  }
}

export default function App() {
  const ctx = useContext(AppContext);
  const [navCollapsed, setNavCollapsed] = useState(false);

  if (!ctx.isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen font-space text-aerospace-charcoal relative">
      {/* Background */}
      <MartianBackground />

      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-30 glass-card-subtle border-b border-precision-border"
        style={{ borderRadius: 0, backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: Logo & Mission */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setNavCollapsed(!navCollapsed)}
              className="lg:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
              aria-label="Toggle navigation"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nebula-teal/30 to-nebula-teal/10 border border-nebula-teal/30 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                  <line x1="12" y1="22" x2="12" y2="15.5" />
                  <polyline points="22 8.5 12 15.5 2 8.5" />
                </svg>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-aerospace-charcoal tracking-wide">FutureCo Growth</h1>
                <p className="text-[10px] text-deep-slate tracking-widest uppercase">Mars Habitat Platform</p>
              </div>
            </div>
          </div>

          {/* Center: Mission Context */}
          <div className="hidden md:flex items-center gap-6 text-xs text-deep-slate">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-nebula-teal animate-pulse" />
              <span>Sol {ctx.user.sol}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.5" opacity="0.4" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{ctx.user.localTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="1.5" opacity="0.6" strokeLinecap="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="text-mars-rust/70">Earth delay: {ctx.user.earthConnectionDelay}</span>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-1 glass-card-subtle px-1 py-1" style={{ borderRadius: '8px' }}>
              <button
                onClick={() => { ctx.setViewMode('alex'); ctx.setCurrentPage('overview'); }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                  ctx.viewMode === 'alex'
                    ? 'bg-nebula-teal/15 text-nebula-teal border border-nebula-teal/20'
                    : 'text-deep-slate hover:text-aerospace-charcoal'
                }`}
              >
                Alex View
              </button>
              <button
                onClick={() => { ctx.setViewMode('manager'); ctx.setCurrentPage('manager'); }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                  ctx.viewMode === 'manager'
                    ? 'bg-mars-rust/15 text-mars-rust border border-mars-rust/20'
                    : 'text-deep-slate hover:text-aerospace-charcoal'
                }`}
              >
                Manager View
              </button>
            </div>

            {/* Reset */}
            <button
              onClick={ctx.resetPresentation}
              className="btn-secondary text-xs py-1.5 px-3 hidden sm:block"
            >
              Reset
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nebula-teal/20 to-transparent border border-nebula-teal/20 flex items-center justify-center text-xs font-medium text-nebula-teal">
              {ctx.viewMode === 'alex' ? ctx.user.avatar : ctx.manager.avatar}
            </div>
          </div>
        </div>
      </header>

      {/* Layout: Sidebar + Content */}
      <div className="pt-[56px] flex min-h-screen">
        {/* Sidebar Navigation */}
        <nav className={`fixed left-0 top-[56px] bottom-0 w-56 z-20 flex flex-col border-r border-precision-border bg-white/80 backdrop-blur-xl transition-transform duration-300 ${
          navCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'
        }`}
        >
          <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  ctx.setCurrentPage(item.id);
                  if (item.id === 'manager') ctx.setViewMode('manager');
                  else if (ctx.viewMode === 'manager' && item.id !== 'manager') ctx.setViewMode('alex');
                  setNavCollapsed(true);
                }}
                className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-r-lg text-sm transition-all ${
                  ctx.currentPage === item.id ? 'active' : ''
                }`}
              >
                <NavIcon type={item.icon} active={ctx.currentPage === item.id} />
                <span className={ctx.currentPage === item.id ? 'text-nebula-teal font-medium' : 'text-deep-slate'}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Astronaut in lower nav */}
          <div className="px-4 py-6 border-t border-precision-border flex flex-col items-center">
            <AstronautSVG />
            <p className="text-[10px] text-deep-slate mt-3 text-center tracking-wider uppercase">
              Valles Marineris
            </p>
            <p className="text-[10px] text-deep-slate text-center">
              Station Alpha
            </p>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 ml-0 lg:ml-56 p-6 lg:p-8 relative z-10 min-h-screen">
          <div className="max-w-6xl mx-auto" key={ctx.currentPage}>
            {renderPage(ctx.currentPage)}
          </div>
        </main>
      </div>

      {/* Drawer */}
      <Drawer />

      {/* Development Assistant */}
      <DevelopmentAssistant />

      {/* Mobile nav overlay */}
      {!navCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setNavCollapsed(true)}
        />
      )}
    </div>
  );
}
