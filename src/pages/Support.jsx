import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function Support() {
  const ctx = useContext(AppContext);
  const [peerTransition, setPeerTransition] = useState(false);

  const peer = ctx.peers[ctx.activePeerIndex];

  /* ── Swap peer with smooth transition ── */
  function handleSwapPeer() {
    setPeerTransition(true);
    setTimeout(() => {
      ctx.setActivePeerIndex(ctx.activePeerIndex === 0 ? 1 : 0);
      setPeerTransition(false);
    }, 300);
  }

  /* ── Inline SVG Icons ── */
  const IconUsers = (
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
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );

  const IconCalendar = (
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  const IconBullet = (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0D9488"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 mt-1.5"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );

  const IconBrief = (
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
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );

  const IconPerson = (
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
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const IconSwap = (
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
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 014-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 01-4 4H3" />
    </svg>
  );

  const IconCheck = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0D9488"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const IconLink = (
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
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );

  return (
    <div className="animate-fade-in space-y-6">
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          {IconUsers}
          <h1 className="text-3xl font-semibold tracking-tight text-aerospace-charcoal">
            Support Network
          </h1>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ═══ LEFT — Manager Conversation Panel ═══ */}
        <div className="glass-card p-6 flex flex-col">
          {/* Manager header */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center
              text-sm font-semibold text-aerospace-charcoal
              bg-gradient-to-br from-flight-teal/20 to-flight-teal/5
              border border-flight-teal/25"
            >
              {ctx.manager.avatar}
            </div>
            <div>
              <h3 className="text-base font-semibold text-aerospace-charcoal">
                {ctx.manager.name}
              </h3>
              <p className="text-sm text-deep-slate">{ctx.manager.role}</p>
            </div>
          </div>

          {/* Next conversation */}
          <div className="flex items-center gap-2 text-sm text-deep-slate mb-6">
            {IconCalendar}
            <span>
              Next conversation: Sol {ctx.manager.nextMeetingSol} // {ctx.manager.nextMeetingTime}
            </span>
          </div>

          {/* Talking points */}
          <div className="mb-6">
            <h4 className="text-xs font-medium uppercase tracking-widest text-deep-slate mb-3">
              Suggested Talking Points
            </h4>
            <ul className="space-y-3">
              {ctx.talkingPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-deep-slate"
                >
                  {IconBullet}
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Generate Brief button / Brief content */}
          {!ctx.briefGenerated ? (
            <button
              onClick={() => ctx.setBriefGenerated(true)}
              className="btn-primary flex items-center justify-center gap-2 w-full mt-auto"
            >
              {IconBrief}
              Generate Discussion Brief
            </button>
          ) : (
            <div className="mt-2 glass-card-subtle p-5 space-y-4 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-aerospace-charcoal">
                  Discussion Brief &mdash; Sol {ctx.manager.nextMeetingSol}
                </h4>
              </div>

              <p className="text-sm text-deep-slate">
                Prepared for the upcoming conversation with {ctx.manager.name}.
                Covers current growth priorities, recent work evidence, and
                development alignment topics.
              </p>

              <div>
                <h5 className="text-xs font-medium uppercase tracking-widest text-deep-slate mb-2">
                  Priority Topics
                </h5>
                <ul className="space-y-2">
                  {ctx.talkingPoints.slice(0, 3).map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-deep-slate"
                    >
                      {IconBullet}
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2">
                <span className="badge-teal flex items-center gap-1">
                  {IconCheck}
                  Brief generated successfully
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ═══ RIGHT — Peer Support Panel ═══ */}
        <div className="glass-card p-6 flex flex-col">
          <div
            className={`transition-all duration-300 ${
              peerTransition ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Peer header */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center
                text-sm font-semibold text-aerospace-charcoal
                bg-gradient-to-br from-mars-dust/20 to-mars-dust/5
                border border-mars-dust/25"
              >
                {peer.avatar}
              </div>
              <div>
                <h3 className="text-base font-semibold text-aerospace-charcoal">
                  {peer.name}
                </h3>
                <p className="text-sm text-deep-slate">{peer.role}</p>
              </div>
            </div>

            {/* Match Reason */}
            <div className="mb-5">
              <h4 className="text-xs font-medium uppercase tracking-widest text-deep-slate mb-2">
                Match Reason
              </h4>
              <p className="text-sm text-deep-slate leading-relaxed">
                {peer.matchReason}
              </p>
            </div>

            {/* Shared Skills */}
            <div className="mb-6">
              <h4 className="text-xs font-medium uppercase tracking-widest text-deep-slate mb-2">
                Shared Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {peer.sharedSkills.map((sk) => (
                  <span key={sk} className="badge-teal flex items-center gap-1">
                    {IconLink}
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mb-4">
              <button 
                onClick={() => alert("Opening Habitat Profile...")}
                className="btn-secondary flex-1 flex items-center justify-center gap-2"
              >
                {IconPerson}
                View Profile
              </button>
              <button 
                onClick={() => alert("Introduction request sent via interplanetary relay.")}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {IconUsers}
                Request Introduction
              </button>
            </div>

            <button
              onClick={handleSwapPeer}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              {IconSwap}
              Find another peer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
