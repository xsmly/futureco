import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

// Inline SVG icons (thin-line HUD style)
const ClipboardIcon = () => (
  <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="9" y1="14" x2="15" y2="14" />
    <line x1="9" y1="18" x2="12" y2="18" />
  </svg>
);

const AlertIcon = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ShieldIcon = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const UserIcon = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const UsersIcon = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BuildingIcon = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="9" y1="6" x2="9.01" y2="6" />
    <line x1="15" y1="6" x2="15.01" y2="6" />
    <line x1="9" y1="10" x2="9.01" y2="10" />
    <line x1="15" y1="10" x2="15.01" y2="10" />
    <line x1="9" y1="14" x2="9.01" y2="14" />
    <line x1="15" y1="14" x2="15.01" y2="14" />
    <line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);

const HomeIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const TOTAL_STEPS = 6; // 0-3 questions, 4 privacy, 5 complete

const privacyOptions = [
  {
    id: 'alex-only',
    label: 'Alex Only',
    description: 'Responses remain completely private to you.',
    icon: UserIcon,
  },
  {
    id: 'manager',
    label: 'Manager',
    description: 'A summary is shared with Dr. Elena Reyes.',
    icon: UsersIcon,
  },
  {
    id: 'habitat-hr',
    label: 'Habitat HR',
    description: 'Results are visible to People Operations.',
    icon: BuildingIcon,
  },
];

export default function CheckIn() {
  const ctx = useContext(AppContext);

  const [currentStep, setCurrentStep] = useState(
    ctx.confidenceCompleted ? 5 : 0
  );

  // Compute if we should show the support signal before step 0
  const showSupportSignal =
    !ctx.supportSignalDismissed && currentStep === 0;

  const handleDismissSignal = () => {
    ctx.setSupportSignalDismissed(true);
  };

  const handleSelectResponse = (questionId, value) => {
    ctx.setConfidenceResponses({
      ...ctx.confidenceResponses,
      [questionId]: value,
    });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    ctx.setConfidenceCompleted(true);
    setCurrentStep(5);
  };

  const currentQuestionAnswered =
    currentStep >= 0 &&
    currentStep <= 3 &&
    ctx.confidenceResponses[ctx.confidenceQuestions[currentStep]?.id] !==
      undefined;

  // Calculate average for summary
  const responseValues = Object.values(ctx.confidenceResponses);
  const averageScore =
    responseValues.length > 0
      ? (
          responseValues.reduce((a, b) => a + b, 0) / responseValues.length
        ).toFixed(1)
      : '0.0';

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-flight-teal">
            <ClipboardIcon />
          </span>
          <h1 className="text-3xl font-semibold text-aerospace-charcoal tracking-tight">
            Career Confidence Check-In
          </h1>
        </div>
      </div>

      {/* Support Signal */}
      {showSupportSignal && (
        <div
          className="glass-card p-6 space-y-4 animate-fade-in"
          style={{ borderColor: 'rgba(234, 88, 12, 0.3)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-mars-dust">
              <AlertIcon />
            </span>
            <h2 className="text-lg font-semibold text-mars-dust">
              Support Signal Detected
            </h2>
          </div>
          <p className="text-sm text-deep-slate/70 leading-relaxed">
            Based on recent activity patterns, the system has identified
            potential development support needs. This is a routine check — your
            responses are private by default.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <button className="btn-primary" onClick={handleDismissSignal}>
              <span className="flex items-center gap-2">
                <svg aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Acknowledge & Continue
              </span>
            </button>
            <button className="btn-secondary" onClick={handleDismissSignal}>
              Dismiss Signal
            </button>
          </div>
        </div>
      )}

      {/* Wizard Container */}
      <div className="glass-card p-6 md:p-8 bg-white">
        {/* Steps 0-3: Questions */}
        {currentStep >= 0 && currentStep <= 3 && (
          <div className="wizard-step space-y-6" key={`step-${currentStep}`}>
            <div className="flex items-center justify-between text-xs text-deep-slate/40 uppercase tracking-wider font-medium">
              <span>
                Question {currentStep + 1} of{' '}
                {ctx.confidenceQuestions.length}
              </span>
              <span className="badge-glass">
                {ctx.confidenceQuestions[currentStep]?.category}
              </span>
            </div>

            <h2 className="text-xl font-semibold text-aerospace-charcoal leading-relaxed">
              {ctx.confidenceQuestions[currentStep]?.text}
            </h2>

            {/* 5-point scale */}
            <div className="space-y-3">
              {ctx.confidenceLabels.map((label, idx) => {
                const value = idx + 1;
                const questionId =
                  ctx.confidenceQuestions[currentStep]?.id;
                const isSelected =
                  ctx.confidenceResponses[questionId] === value;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectResponse(questionId, value)}
                    className={`w-full glass-card-subtle p-4 text-left transition-all duration-300 flex items-center gap-4 ${
                      isSelected
                        ? '!border-flight-teal bg-white shadow-[0_0_12px_rgba(45,212,191,0.1)]'
                        : 'hover:border-deep-slate/15 hover:bg-white'
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        isSelected
                          ? 'border-flight-teal text-flight-teal bg-flight-teal/10'
                          : 'border-deep-slate/20 text-deep-slate/40'
                      }`}
                    >
                      {value}
                    </span>
                    <span
                      className={`text-sm ${
                        isSelected
                          ? 'text-flight-teal font-medium'
                          : 'text-deep-slate/70'
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <button
                className={`btn-secondary flex items-center gap-2 ${
                  currentStep === 0 ? 'opacity-0 pointer-events-none' : ''
                }`}
                onClick={handlePrev}
              >
                <ArrowLeftIcon />
                Previous
              </button>
              <button
                className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={handleNext}
                disabled={!currentQuestionAnswered}
              >
                Next
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Privacy Selection */}
        {currentStep === 4 && (
          <div className="wizard-step space-y-6" key="step-privacy">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-flight-teal">
                <ShieldIcon />
              </span>
              <h2 className="text-xl font-semibold text-aerospace-charcoal">
                Who can see your check-in results?
              </h2>
            </div>
            <p className="text-sm text-deep-slate/50">
              Your detailed responses are private by default. Choose who
              receives a summary of your check-in.
            </p>

            <div className="space-y-3">
              {privacyOptions.map((option) => {
                const isSelected =
                  ctx.confidencePrivacy === option.id;
                const IconComponent = option.icon;

                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      ctx.setConfidencePrivacy(option.id)
                    }
                    className={`w-full glass-card-subtle p-5 text-left transition-all duration-300 flex items-start gap-4 ${
                      isSelected
                        ? '!border-flight-teal bg-white shadow-[0_0_12px_rgba(45,212,191,0.1)]'
                        : 'hover:border-deep-slate/15 hover:bg-white'
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 mt-0.5 transition-all duration-300 ${
                        isSelected
                          ? 'text-flight-teal'
                          : 'text-deep-slate/40'
                      }`}
                    >
                      <IconComponent />
                    </span>
                    <div>
                      <span
                        className={`text-sm font-medium block ${
                          isSelected
                            ? 'text-flight-teal'
                            : 'text-deep-slate/80'
                        }`}
                      >
                        {option.label}
                      </span>
                      <span className="text-xs text-deep-slate/40 mt-1 block">
                        {option.description}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="ml-auto text-flight-teal flex-shrink-0">
                        <svg aria-hidden="true"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <button
                className="btn-secondary flex items-center gap-2"
                onClick={handlePrev}
              >
                <ArrowLeftIcon />
                Previous
              </button>
              <button
                className="btn-primary flex items-center gap-2"
                onClick={handleComplete}
              >
                Complete Check-In
                <svg aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Completion */}
        {currentStep === 5 && (
          <div className="wizard-step space-y-6" key="step-complete">
            <div className="text-center space-y-3">
              <span className="text-flight-teal inline-block">
                <CheckCircleIcon />
              </span>
              <h2 className="text-2xl font-semibold text-flight-teal">
                Check-In Complete
              </h2>
              <p className="text-sm text-deep-slate/50">
                Your responses have been recorded securely.
              </p>
            </div>

            {/* Summary */}
            <div className="glass-card-subtle p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-deep-slate/60 uppercase tracking-wider">
                  Response Summary
                </h3>
                <span className="badge-teal">
                  Avg: {averageScore} / 5
                </span>
              </div>

              <div className="space-y-3">
                {ctx.confidenceQuestions.map((q) => {
                  const response = ctx.confidenceResponses[q.id];
                  const label = response
                    ? ctx.confidenceLabels[response - 1]
                    : 'Not answered';

                  return (
                    <div
                      key={q.id}
                      className="flex items-center justify-between py-2 border-b border-precision-border last:border-0"
                    >
                      <div>
                        <span className="text-xs text-deep-slate/40 block">
                          {q.category}
                        </span>
                        <span className="text-sm text-deep-slate/70">
                          {q.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                        <span className="text-sm font-medium text-flight-teal">
                          {response || '-'} / 5
                        </span>
                        <span className="text-xs text-deep-slate/40">
                          {label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-deep-slate/40">
                  Privacy:{' '}
                  {ctx.confidencePrivacy === 'alex-only'
                    ? 'Alex Only'
                    : ctx.confidencePrivacy === 'manager'
                    ? 'Manager'
                    : 'Habitat HR'}
                </span>
                <span className="text-xs text-deep-slate/40">
                  Sol {ctx.user.sol}
                </span>
              </div>
            </div>

            {/* Return button */}
            <div className="flex justify-center pt-2">
              <button
                className="btn-primary flex items-center gap-2"
                onClick={() => ctx.setCurrentPage('overview')}
              >
                <HomeIcon />
                Return to Overview
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, idx) => (
          <div
            key={idx}
            className={`transition-all duration-300 rounded-full ${
              idx === currentStep
                ? 'w-8 h-2 bg-flight-teal shadow-[0_0_8px_rgba(45,212,191,0.4)]'
                : idx < currentStep
                ? 'w-2 h-2 bg-flight-teal/40'
                : 'w-2 h-2 bg-deep-slate/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
