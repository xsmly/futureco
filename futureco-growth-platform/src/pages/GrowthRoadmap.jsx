import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function GrowthRoadmap() {
  const ctx = useContext(AppContext);

  /* ── Group skills by priority tiers ── */
  const priorityNow = ctx.skills.filter(s => s.priority <= 2);
  const buildNext = ctx.skills.filter(s => s.priority >= 3 && s.priority <= 4);
  const maintain = ctx.skills.filter(s => s.priority >= 5);

  /* ── Inline SVG Icons ── */
  const IconRoadmap = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0D9488"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M17 7h4v4" />
    </svg>
  );

  const IconChevronUp = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );

  const IconChevronDown = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  const IconInfo = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );

  const IconSource = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );

  /* ── Section renderer ── */
  function renderSection(title, skills) {
    return (
      <div className="space-y-4">
        {/* Section header */}
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-aerospace-charcoal">{title}</h2>
          <span className="badge-glass">{skills.length}</span>
        </div>

        {skills.length === 0 && (
          <p className="text-sm text-deep-slate pl-1">
            No skills in this category.
          </p>
        )}

        {/* Skill cards */}
        {skills.map((skill, idx) => (
          <div
            key={skill.id}
            className="glass-card p-6 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              {/* Reorder controls */}
              <div className="flex flex-col items-center gap-1 pt-1">
                <button
                  onClick={() => ctx.moveSkillUp(skill.id)}
                  disabled={idx === 0 && skill.priority <= 2}
                  className="w-7 h-7 flex items-center justify-center rounded-md
                    text-deep-slate hover:text-flight-teal hover:bg-flight-teal/10
                    disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
                  aria-label={`Move ${skill.name} up`}
                >
                  {IconChevronUp}
                </button>
                <button
                  onClick={() => ctx.moveSkillDown(skill.id)}
                  disabled={idx === skills.length - 1 && skill.priority >= 5}
                  className="w-7 h-7 flex items-center justify-center rounded-md
                    text-deep-slate hover:text-flight-teal hover:bg-flight-teal/10
                    disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
                  aria-label={`Move ${skill.name} down`}
                >
                  {IconChevronDown}
                </button>
              </div>

              {/* Card body */}
              <div className="flex-1 min-w-0">
                {/* Title row */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-base font-semibold text-aerospace-charcoal">
                      {skill.name}
                    </h3>
                    <p className="mt-1 text-sm text-flight-teal">
                      {skill.currentProficiency}%{' '}
                      <span className="text-deep-slate">/</span>{' '}
                      {skill.targetProficiency}%
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      ctx.setDrawerOpen({ type: 'rationale', data: skill })
                    }
                    className="btn-secondary flex items-center gap-1.5 text-xs whitespace-nowrap"
                  >
                    {IconInfo}
                    Why this recommendation?
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="progress-bar-bg h-2">
                    <div
                      className="progress-bar-fill h-2"
                      style={{ width: `${skill.currentProficiency}%` }}
                    />
                  </div>
                </div>

                {/* Source & last activity */}
                <div className="mt-3 flex items-center gap-4 text-xs text-deep-slate">
                  <span className="flex items-center gap-1">
                    {IconSource}
                    {skill.source}
                  </span>
                  <span>Last activity: {skill.lastActivity}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          {IconRoadmap}
          <h1 className="text-3xl font-semibold tracking-tight text-aerospace-charcoal">
            Growth Roadmap
          </h1>
        </div>
        <p className="text-base text-deep-slate">
          AI-recommended priorities based on work evidence, habitat needs, and
          your career goals.
        </p>
      </div>

      {/* ── Priority Tiers ── */}
      {renderSection('Priority Now', priorityNow)}
      {renderSection('Build Next', buildNext)}
      {renderSection('Maintain', maintain)}
    </div>
  );
}
