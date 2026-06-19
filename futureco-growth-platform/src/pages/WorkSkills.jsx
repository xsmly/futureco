import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

// Inline SVG icons (thin-line HUD style)
const BriefcaseIcon = () => (
  <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const FileIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const ShieldIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CheckIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const UserIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SendIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ClockIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const EyeIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function WorkSkills() {
  const ctx = useContext(AppContext);

  // Track which evidence/skill combos have the dispute form open
  const [openDispute, setOpenDispute] = useState(null); // { evidenceId, skillId }
  const [disputeText, setDisputeText] = useState('');

  const handleOpenDispute = (evidenceId, skillId) => {
    setOpenDispute({ evidenceId, skillId });
    setDisputeText(
      'I believe this inference may not accurately reflect my capabilities in this area. The context of [work artifact] included additional factors not captured by the AI analysis.'
    );
  };

  const handleSubmitDispute = () => {
    if (openDispute) {
      ctx.disputeSkill(openDispute.evidenceId, openDispute.skillId);
      setOpenDispute(null);
      setDisputeText('');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return (
          <span className="badge-teal flex items-center gap-1">
            <CheckIcon />
            Verified
          </span>
        );
      case 'pending':
        return (
          <span className="badge-glass flex items-center gap-1">
            <ClockIcon />
            Pending Confirmation
          </span>
        );
      case 'disputed':
        return (
          <span className="badge-mars flex items-center gap-1">
            <UserIcon />
            Human Review Requested
          </span>
        );
      case 'rejected':
        return (
          <span className="badge-mars flex items-center gap-1">
            <AlertIcon />
            Inference Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-flight-teal">
            <BriefcaseIcon />
          </span>
          <h1 className="text-3xl font-semibold text-aerospace-charcoal tracking-tight">
            Work & Skills Evidence
          </h1>
        </div>
        <p className="text-deep-slate/60 text-lg">
          Skills inferred from your work artifacts. Review, verify, or dispute
          AI-generated assessments.
        </p>
      </div>

      {/* Platform Principle */}
      <div className="glass-card-subtle px-5 py-4 flex items-center gap-3">
        <span className="text-flight-teal">
          <ShieldIcon />
        </span>
        <p className="text-sm font-medium text-flight-teal">
          The system advises. Alex decides.
        </p>
      </div>

      {/* Evidence Register */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-aerospace-charcoal flex items-center gap-2">
          <span className="text-deep-slate/50">
            <EyeIcon />
          </span>
          Evidence Register
        </h2>

        {ctx.evidence.map((ev) => (
          <div key={ev.id} className="glass-card p-6 space-y-5">
            {/* Evidence header */}
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-lg font-medium text-aerospace-charcoal">
                  {ev.title}
                </h3>
                <p className="text-sm text-deep-slate/50 mt-1">
                  {ev.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge-glass flex items-center gap-1">
                  <FileIcon />
                  {ev.type}
                </span>
                <span className="badge-glass">Sol {ev.sol}</span>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              {ev.skills.map((skill) => {
                const isDisputeOpen =
                  openDispute?.evidenceId === ev.id &&
                  openDispute?.skillId === skill.skillId;
                const isDisputed = skill.status === 'disputed';

                return (
                  <div
                    key={skill.skillId}
                    className={`glass-card-subtle p-4 space-y-3 transition-all duration-300 ${
                      isDisputed
                        ? 'shadow-[0_0_16px_rgba(234,88,12,0.12)]'
                        : ''
                    }`}
                    style={
                      isDisputed
                        ? { borderColor: 'rgba(234, 88, 12, 0.3)' }
                        : undefined
                    }
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="text-sm font-semibold text-aerospace-charcoal">
                        {skill.skillName}
                      </h4>
                      {getStatusBadge(skill.status)}
                    </div>

                    {/* Confidence bar */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs text-deep-slate/40 uppercase tracking-wider">
                          AI Confidence
                        </span>
                        <span className="text-xs font-medium text-flight-teal">
                          {skill.confidence}%
                        </span>
                      </div>
                      <div className="progress-bar-bg h-1.5">
                        <div
                          className="progress-bar-fill h-1.5"
                          style={{ width: `${skill.confidence}%` }}
                        />
                      </div>
                    </div>

                    {/* Method */}
                    <p className="text-xs text-deep-slate/30 italic">
                      {skill.method}
                    </p>

                    {/* Resolution note */}
                    {skill.resolutionNote && (
                      <div className="glass-card-subtle p-3">
                        <p className="text-xs text-deep-slate/50">
                          <span className="font-semibold text-deep-slate/60">
                            Resolution:
                          </span>{' '}
                          {skill.resolutionNote}
                        </p>
                      </div>
                    )}

                    {/* Disputed status message */}
                    {isDisputed && (
                      <div
                        className="glass-card-subtle p-3"
                        style={{ borderColor: 'rgba(234, 88, 12, 0.2)' }}
                      >
                        <p className="text-xs text-mars-dust flex items-center gap-1.5">
                          <UserIcon />
                          Submitted for manager review
                        </p>
                      </div>
                    )}

                    {/* Request Human Review button */}
                    {(skill.status === 'verified' ||
                      skill.status === 'pending') && (
                      <div className="space-y-3">
                        {!isDisputeOpen ? (
                          <button
                            className="btn-mars text-xs"
                            onClick={() =>
                              handleOpenDispute(ev.id, skill.skillId)
                            }
                          >
                            <span className="flex items-center gap-1.5">
                              <AlertIcon />
                              Request Human Review
                            </span>
                          </button>
                        ) : (
                          <div className="space-y-3 animate-fade-in">
                            <textarea
                              className="w-full bg-white border border-precision-border rounded-lg p-3 text-sm text-deep-slate/80 font-space placeholder-deep-slate/30 focus:outline-none focus:border-mars-dust/40 transition-all duration-300 min-h-[100px] resize-y"
                              value={disputeText}
                              onChange={(e) => setDisputeText(e.target.value)}
                            />
                            <div className="flex items-center gap-3">
                              <button
                                className="btn-mars text-xs"
                                onClick={handleSubmitDispute}
                              >
                                <span className="flex items-center gap-1.5">
                                  <SendIcon />
                                  Submit Review Request
                                </span>
                              </button>
                              <button
                                className="btn-secondary text-xs"
                                onClick={() => {
                                  setOpenDispute(null);
                                  setDisputeText('');
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
