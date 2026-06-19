import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Overview() {
  const ctx = useContext(AppContext);

  /* ── Derived data ── */
  const primarySkill = ctx.skills.find(s => s.priority === 1) || ctx.skills[0];

  const currentSol = ctx.user.sol;
  const recentSols = currentSol - 10;
  const verifiedCount = ctx.evidence.reduce(
    (acc, ev) =>
      acc +
      ev.skills.filter(
        (sk) => sk.status === 'verified' && ev.sol >= recentSols
      ).length,
    0
  );
  const pendingCount = ctx.evidence.reduce(
    (acc, ev) =>
      acc + ev.skills.filter((sk) => sk.status === 'pending').length,
    0
  );

  const activeModule = ctx.learning.find(m => m.status === 'active');

  const confidenceAvg =
    ctx.confidenceCompleted && Object.keys(ctx.confidenceResponses).length > 0
      ? (
          Object.values(ctx.confidenceResponses).reduce((a, b) => a + b, 0) /
          Object.values(ctx.confidenceResponses).length
        ).toFixed(1)
      : null;

  /* ── Badge class helper ── */
  function badgeClass(type) {
    switch (type) {
      case 'evidence':
      case 'skill':
        return 'badge-teal';
      case 'insight':
        return 'badge-mars';
      default:
        return 'badge-glass';
    }
  }

  /* ── Inline SVG Icons ── */
  const IconTarget = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0D9488"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );

  const IconCheck = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0D9488"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );

  const IconBook = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0D9488"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" />
      <path d="M8 7h8" />
      <path d="M8 11h5" />
    </svg>
  );

  const IconConfidence = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0D9488"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  );

  const IconActivity = (
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
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );

  const IconArrowRight = (
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
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );

  const IconTrendUp = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0D9488"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );

  return (
    <div className="animate-fade-in space-y-6">
      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-aerospace-charcoal">
          Good morning, Alex
        </h1>
        <p className="mt-2 text-base text-deep-slate">
          Your current priorities, work-based skill evidence, and recommended
          actions for Sol {currentSol}.
        </p>
      </div>

      {/* ── Four Summary Quadrants ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1 — Priority Growth Area */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {IconTarget}
              <span className="text-xs font-medium uppercase tracking-widest text-deep-slate">
                Priority Growth Area
              </span>
            </div>
            <h3 className="text-lg font-semibold text-aerospace-charcoal">
              {primarySkill.name}
            </h3>
            <p className="mt-1 text-sm text-deep-slate">
              {primarySkill.currentProficiency}% / {primarySkill.targetProficiency}%
            </p>
          </div>
          <div className="mt-4">
            <div className="progress-bar-bg h-2">
              <div
                className="progress-bar-fill h-2"
                style={{ width: `${primarySkill.currentProficiency}%` }}
              />
            </div>
          </div>
        </div>

        {/* 2 — Skills Demonstrated */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {IconCheck}
              <span className="text-xs font-medium uppercase tracking-widest text-deep-slate">
                Skills Demonstrated
              </span>
            </div>
            <h3 className="text-lg font-semibold text-aerospace-charcoal">
              {verifiedCount} verified
            </h3>
            <p className="mt-1 text-sm text-deep-slate">
              Past 10 sols
            </p>
          </div>
          {pendingCount > 0 && (
            <p className="mt-4 text-sm text-mars-dust">
              {pendingCount} pending confirmation{pendingCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* 3 — Current Learning */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {IconBook}
              <span className="text-xs font-medium uppercase tracking-widest text-deep-slate">
                Current Learning
              </span>
            </div>
            {activeModule ? (
              <>
                <h3 className="text-base font-semibold text-aerospace-charcoal leading-snug">
                  {activeModule.title}
                </h3>
                <p className="mt-2 text-sm text-deep-slate">
                  {activeModule.duration} &middot; {activeModule.type}
                </p>
                <p className="mt-1 text-xs text-flight-teal">
                  Connected: {activeModule.connectedTask}
                </p>
              </>
            ) : (
              <p className="text-sm text-deep-slate">
                No active learning modules.
              </p>
            )}
          </div>
        </div>

        {/* 4 — Career Confidence */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {IconConfidence}
              <span className="text-xs font-medium uppercase tracking-widest text-deep-slate">
                Career Confidence
              </span>
            </div>

            {ctx.confidenceCompleted && confidenceAvg ? (
              <>
                <h3 className="text-2xl font-semibold text-aerospace-charcoal">
                  {confidenceAvg}{' '}
                  <span className="text-sm font-normal text-deep-slate">
                    / 5
                  </span>
                </h3>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-flight-teal">
                  {IconTrendUp}
                  <span>Stable</span>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-deep-slate">
                  No check-in yet
                </p>
                <button
                  onClick={() => ctx.setCurrentPage('checkin')}
                  className="btn-primary mt-4 w-full text-center"
                >
                  Start Check-In
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Recommended Actions / Recent Activity ── */}
      <div>
        <h2 className="text-xl font-semibold text-aerospace-charcoal mb-4 flex items-center gap-2">
          <span className="inline-block">{IconActivity}</span>
          Recommended Actions
        </h2>

        <div className="space-y-3">
          {ctx.recentActivity.map((item) => (
            <button
              key={item.id}
              onClick={() => ctx.setCurrentPage(item.type === 'learning' ? 'learning' : item.type === 'evidence' ? 'evidence' : item.type === 'skill' ? 'roadmap' : 'overview')}
              className="w-full text-left glass-card-subtle flex items-center gap-4 px-5 py-4 transition-all duration-300 hover:border-precision-border"
            >
              {/* Activity pulse */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-black/5 border border-precision-border">
                {IconActivity}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-aerospace-charcoal truncate">{item.text}</p>
              </div>

              {/* Sol number */}
              <span className="text-xs text-deep-slate flex-shrink-0">
                Sol {item.sol}
              </span>

              {/* Type badge */}
              <span className={`${badgeClass(item.type)} flex-shrink-0`}>
                {item.type}
              </span>

              {/* Arrow */}
              <span className="text-deep-slate flex-shrink-0">
                {IconArrowRight}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
