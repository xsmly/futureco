import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Drawer() {
  const ctx = useContext(AppContext);

  if (!ctx.drawerOpen) return null;

  const { type, data } = ctx.drawerOpen;

  const closeDrawer = () => ctx.setDrawerOpen(null);

  return (
    <>
      <div className="drawer-overlay" onClick={closeDrawer} />
      <div className="drawer-panel p-8">
        {/* Close button */}
        <button
          onClick={closeDrawer}
          className="absolute top-6 right-6 p-2 rounded-lg hover:bg-black/5 transition-colors"
          aria-label="Close drawer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {type === 'rationale' && data && (
          <div className="space-y-6">
            <div>
              <span className="badge-flight text-xs">AI Rationale</span>
              <h2 className="text-xl font-semibold text-aerospace-charcoal mt-3">
                {data.name}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-deep-slate">
                  Priority #{data.priority}
                </span>
                <span className="text-sm text-deep-slate">
                  {data.currentProficiency}% / {data.targetProficiency}%
                </span>
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between text-xs text-deep-slate mb-2">
                <span>Current Proficiency</span>
                <span>{data.currentProficiency}%</span>
              </div>
              <div className="progress-bar-bg h-2">
                <div
                  className="progress-bar-fill h-2"
                  style={{ width: `${data.currentProficiency}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-deep-slate/70 mt-1">
                <span>0%</span>
                <span className="text-flight-teal">Target: {data.targetProficiency}%</span>
              </div>
            </div>

            {/* Rationale */}
            <div className="glass-card-subtle p-5">
              <h3 className="text-sm font-medium text-aerospace-charcoal mb-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Why This Recommendation
              </h3>
              <p className="text-sm text-deep-slate leading-relaxed">
                {data.rationale}
              </p>
            </div>

            {/* Source */}
            <div className="glass-card-subtle p-5">
              <h3 className="text-sm font-medium text-aerospace-charcoal mb-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Source Evidence
              </h3>
              <p className="text-sm text-deep-slate">{data.source}</p>
              <p className="text-xs text-deep-slate/70 mt-2">Last activity: {data.lastActivity}</p>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 text-xs text-deep-slate">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.5" opacity="0.5" strokeLinecap="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Category: {data.category === 'priority' ? 'Priority Now' : data.category === 'build' ? 'Build Next' : 'Maintain'}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
