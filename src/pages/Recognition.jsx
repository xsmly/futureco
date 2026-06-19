import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CheckIcon = () => (
  <svg aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 text-flight-teal"
  >
    <path d="M20 6L9 17L4 12" />
  </svg>
);

const TrophyIcon = () => (
  <svg aria-hidden="true"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-flight-teal"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const LockIcon = () => (
  <svg aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UserIcon = () => (
  <svg aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const UsersIcon = () => (
  <svg aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ShareIcon = () => (
  <svg aria-hidden="true"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0F172A"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const sharingOptions = [
  {
    value: 'private',
    label: 'Keep private',
    description: 'Only visible to you. No one else can see this milestone.',
    icon: LockIcon,
  },
  {
    value: 'manager-only',
    label: 'Share with manager only',
    description: 'Your direct manager can view this milestone and its evidence.',
    icon: UserIcon,
  },
  {
    value: 'team',
    label: 'Share with habitat team',
    description: 'All members of your habitat team can view this milestone.',
    icon: UsersIcon,
  },
];

export default function Recognition() {
  const ctx = useContext(AppContext);
  const milestone = ctx.milestone;

  return (
    <div className="min-h-screen bg-slate-50 font-['Space_Grotesk',sans-serif] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Page Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-aerospace-charcoal">
            Recognition & Milestones
          </h1>
          <p className="text-sm text-deep-slate/60">
            Achievements recognized through verified work evidence and growth patterns.
          </p>
        </header>

        {/* Milestone Card */}
        <section
          className="relative rounded-2xl border border-flight-teal/20 bg-white p-6 backdrop-blur-xl transition-all duration-300 shadow-sm"
        >
          <div className="relative space-y-5">
            {/* Title row */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-flight-teal/10">
                  <TrophyIcon />
                </div>
                <h2
                  className="text-xl font-semibold text-aerospace-charcoal"
                >
                  {milestone.title}
                </h2>
              </div>

              {/* Sol badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-flight-teal/25 bg-flight-teal/10 px-3 py-1 text-xs font-medium text-flight-teal">
                <svg aria-hidden="true"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Sol {milestone.sol}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-deep-slate/70">
              {milestone.description}
            </p>

            {/* Verified Evidence */}
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-flight-teal">
                <svg aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Verified Evidence
              </h3>
              <ul className="space-y-2.5">
                {milestone.evidence &&
                  milestone.evidence.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 rounded-lg border border-precision-border bg-slate-50 px-4 py-3 transition-all duration-300 hover:bg-white"
                    >
                      <span className="mt-0.5">
                        <CheckIcon />
                      </span>
                      <span className="text-sm text-deep-slate/80">{item}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Sharing Controls */}
        <section className="rounded-2xl border border-precision-border bg-white p-6 backdrop-blur-xl transition-all duration-300">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <ShareIcon />
              <h2 className="text-lg font-semibold text-aerospace-charcoal">
                Sharing Settings
              </h2>
            </div>

            <div className="space-y-3">
              {sharingOptions.map((option) => {
                const isSelected = milestone.sharing === option.value;
                const IconComponent = option.icon;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => ctx.updateMilestoneSharing(option.value)}
                    className={`group flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                      isSelected
                        ? 'border-flight-teal/40 bg-flight-teal/10'
                        : 'border-precision-border bg-slate-50 hover:border-deep-slate/20 hover:bg-white'
                    }`}
                  >
                    {/* Custom radio indicator */}
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-flight-teal bg-flight-teal/20'
                          : 'border-deep-slate/20 bg-transparent'
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-flight-teal" />
                      )}
                    </span>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`transition-all duration-300 ${
                            isSelected ? 'text-flight-teal' : 'text-deep-slate/50'
                          }`}
                        >
                          <IconComponent />
                        </span>
                        <span
                          className={`text-sm font-medium transition-all duration-300 ${
                            isSelected ? 'text-aerospace-charcoal' : 'text-deep-slate/70'
                          }`}
                        >
                          {option.label}
                        </span>
                      </div>
                      <p
                        className={`text-xs transition-all duration-300 ${
                          isSelected ? 'text-deep-slate/60' : 'text-deep-slate/40'
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Note */}
            <div className="flex items-start gap-2.5 rounded-lg border border-precision-border bg-slate-50 px-4 py-3">
              <svg aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0F172A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0 opacity-40"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <p className="text-xs leading-relaxed text-deep-slate/60">
                Changing sharing settings updates your Privacy & Controls automatically.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
