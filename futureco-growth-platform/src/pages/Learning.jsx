import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { learningModules } from '../data/mockData';

// Inline SVG icons (thin-line HUD style)
const BookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="8" y1="7" x2="16" y2="7" />
    <line x1="8" y1="11" x2="13" y2="11" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ScenarioIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export default function Learning() {
  const ctx = useContext(AppContext);

  const activeModule = ctx.learning.find((m) => m.status === 'active');
  const queuedModules = ctx.learning.filter(
    (m) => m.status === 'queued' || m.status === 'paused'
  );
  const scenario = learningModules[0]?.scenario;

  const selectedOption = scenario?.options.find(
    (o) => o.id === ctx.scenarioAnswered
  );
  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-flight-teal">
            <BookIcon />
          </span>
          <h1 className="text-3xl font-semibold text-aerospace-charcoal tracking-tight">
            Learning in the Flow of Work
          </h1>
        </div>
        <p className="text-deep-slate text-lg">
          Contextual learning modules connected to your active work and growth
          priorities.
        </p>
      </div>

      {/* Active Module Section */}
      {activeModule && (
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-semibold text-aerospace-charcoal flex items-center gap-2">
              <span className="text-flight-teal">
                <PlayIcon />
              </span>
              Active Module
            </h2>
            <div className="flex items-center gap-2">
              <span className="badge-glass flex items-center gap-1">
                <ClockIcon />
                {activeModule.duration}
              </span>
              <span className="badge-teal">{activeModule.type}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-aerospace-charcoal mb-1">
              {activeModule.title}
            </h3>
            <p className="text-deep-slate text-sm flex items-center gap-1.5">
              <LinkIcon />
              Connected to: {activeModule.connectedTask}
            </p>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-deep-slate uppercase tracking-wider font-medium">
                Module Progress
              </span>
              <span className="text-sm font-medium text-flight-teal">
                {activeModule.progress}%
              </span>
            </div>
            <div className="progress-bar-bg h-2">
              <div
                className="progress-bar-fill h-2"
                style={{ width: `${activeModule.progress}%` }}
              />
            </div>
          </div>

          {/* Interactive Scenario */}
          {scenario && (
            <div className="glass-card-subtle p-5 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-flight-teal">
                  <ScenarioIcon />
                </span>
                <h4 className="text-sm font-semibold text-deep-slate uppercase tracking-wider">
                  Interactive Scenario
                </h4>
              </div>

              <p className="text-deep-slate leading-relaxed">
                {scenario.question}
              </p>

              <div className="space-y-3 mt-4">
                {scenario.options.map((option) => {
                  const isAnswered = ctx.scenarioAnswered !== null;
                  const isSelected = ctx.scenarioAnswered === option.id;
                  const showCorrect = isAnswered && option.isCorrect;
                  const showIncorrect =
                    isAnswered && isSelected && !option.isCorrect;

                  let cardClasses =
                    'glass-card-subtle p-4 cursor-pointer transition-all duration-300';

                  if (!isAnswered) {
                    cardClasses +=
                      ' hover:border-flight-teal/30 hover:bg-flight-teal/5';
                  } else if (showCorrect) {
                    cardClasses +=
                      ' !border-flight-teal !bg-flight-teal/10 shadow-sm shadow-flight-teal/20';
                  } else if (showIncorrect) {
                    cardClasses +=
                      ' !border-mars-dust !bg-mars-dust/10';
                  } else {
                    cardClasses += ' opacity-50';
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        if (!isAnswered) {
                          ctx.setScenarioAnswered(option.id);
                        }
                      }}
                      disabled={isAnswered}
                      className={`${cardClasses} w-full text-left flex items-start gap-3`}
                    >
                      <span
                        className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                          showCorrect
                            ? 'border-flight-teal text-flight-teal bg-flight-teal/10'
                            : showIncorrect
                            ? 'border-mars-dust text-mars-dust bg-mars-dust/10'
                            : isSelected
                            ? 'border-flight-teal text-flight-teal'
                            : 'border-precision-border text-deep-slate'
                        }`}
                      >
                        {showCorrect ? (
                          <CheckIcon />
                        ) : showIncorrect ? (
                          <XIcon />
                        ) : (
                          option.id.toUpperCase()
                        )}
                      </span>
                      <span
                        className={`text-sm leading-relaxed ${
                          showCorrect
                            ? 'text-flight-teal'
                            : showIncorrect
                            ? 'text-mars-dust'
                            : 'text-deep-slate'
                        }`}
                      >
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback after answering */}
              {ctx.scenarioAnswered !== null && selectedOption && (
                <div
                  className={`glass-card p-4 mt-4 transition-all duration-300 ${
                    isCorrect
                      ? 'border-flight-teal/30 shadow-sm shadow-flight-teal/10'
                      : 'border-mars-dust/30 shadow-sm shadow-mars-dust/10'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <>
                        <span className="text-flight-teal">
                          <CheckIcon />
                        </span>
                        <span className="text-sm font-semibold text-flight-teal">
                          Excellent Response
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-mars-dust">
                          <AlertIcon />
                        </span>
                        <span className="text-sm font-semibold text-mars-dust">
                          Review Recommended
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-deep-slate leading-relaxed">
                    {selectedOption.feedback}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Learning Load Controls */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-deep-slate">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </span>
          <h2 className="text-lg font-semibold text-aerospace-charcoal">
            Learning Load Controls
          </h2>
        </div>

        {!ctx.learningPaused ? (
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-deep-slate">
              Manage your learning workload during high-intensity operations
              periods.
            </p>
            <button className="btn-mars" onClick={ctx.pauseLearning}>
              <span className="flex items-center gap-2">
                <PauseIcon />
                Reduce learning load
              </span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="glass-card-subtle p-4 border-mars-dust/30 bg-mars-dust/5"
                 style={{ borderColor: 'rgba(217, 72, 15, 0.3)' }}>
              <div className="flex items-start gap-3">
                <span className="text-mars-dust mt-0.5">
                  <AlertIcon />
                </span>
                <div>
                  <p className="text-mars-dust font-medium">
                    Learning modules paused until Sol{' '}
                    {ctx.learningPausedUntilSol}.
                  </p>
                  <p className="text-deep-slate text-sm mt-1">
                    Performance records are not impacted.
                  </p>
                </div>
              </div>
            </div>
            <button className="btn-primary" onClick={ctx.resumeLearning}>
              <span className="flex items-center gap-2">
                <PlayIcon />
                Resume Learning
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Queued Modules */}
      {queuedModules.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-aerospace-charcoal flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-deep-slate"
              aria-hidden="true"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            Queued Modules
            <span className="badge-glass text-xs ml-1">
              {queuedModules.length}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {queuedModules.map((module) => (
               <div
                key={module.id}
                className="glass-card-subtle p-4 space-y-3 transition-all duration-300 hover:border-precision-border"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium text-aerospace-charcoal">
                    {module.title}
                  </h3>
                  {module.status === 'paused' ? (
                    <span className="badge-mars flex-shrink-0">Paused</span>
                  ) : (
                    <span className="badge-glass flex-shrink-0">Queued</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-deep-slate">
                  <span className="flex items-center gap-1">
                    <ClockIcon />
                    {module.duration}
                  </span>
                  <span>{module.type}</span>
                </div>
                {module.connectedTask && (
                  <p className="text-xs text-deep-slate flex items-center gap-1">
                    <LinkIcon />
                    {module.connectedTask}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
