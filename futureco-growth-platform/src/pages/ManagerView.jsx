import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';

/* ─── Inline SVG Icons ─── */

const ClipboardIcon = () => (
  <svg aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-mars-dust"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const UserCheckIcon = () => (
  <svg aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-flight-teal"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

const XCircleIcon = () => (
  <svg aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-mars-dust"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-flight-teal"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const FolderIcon = () => (
  <svg aria-hidden="true"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const BarChartIcon = () => (
  <svg aria-hidden="true"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

/* ─── Disputed Skill Card ─── */

function DisputedCard({ evidence, skill, onResolve }) {
  const isResolved = skill.status === 'rejected' || (skill.status === 'verified' && skill.resolutionNote);

  return (
    <div
      className={`rounded-xl border p-5 transition-all duration-300 ${
        isResolved
          ? 'border-precision-border bg-slate-50'
          : 'border-mars-dust/20 bg-white shadow-sm'
      }`}
    >
      <div className="space-y-4">
        {/* Employee info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-flight-teal/10 text-xs font-bold text-flight-teal">
              AM
            </div>
            <div>
              <p className="text-sm font-medium text-aerospace-charcoal">Alex Morgan</p>
              <p className="text-xs text-deep-slate/50">Habitat Operations</p>
            </div>
          </div>

          {/* Status Badge */}
          {isResolved ? (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                skill.status === 'rejected'
                  ? 'border-mars-dust/25 bg-mars-dust/10 text-mars-dust'
                  : 'border-flight-teal/25 bg-flight-teal/10 text-flight-teal'
              }`}
            >
              {skill.status === 'rejected' ? (
                <>
                  <XCircleIcon /> Rejected
                </>
              ) : (
                <>
                  <CheckCircleIcon /> Confirmed (Lowered)
                </>
              )}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-mars-dust/25 bg-mars-dust/10 px-2.5 py-1 text-xs font-medium text-mars-dust">
              <AlertTriangleIcon />
              Pending Human Review
            </span>
          )}
        </div>

        {/* Skill details */}
        <div className="space-y-2 rounded-lg border border-precision-border bg-slate-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-deep-slate/40">
              Skill
            </span>
            <span className="text-xs text-deep-slate/40">Confidence</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-aerospace-charcoal">
              {skill.name}
            </span>
            <span className="text-sm font-semibold text-mars-dust">
              {skill.confidence}%
            </span>
          </div>
          {/* Confidence bar */}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-deep-slate/10">
            <div
              className="h-full rounded-full bg-mars-dust/60 transition-all duration-300"
              style={{ width: `${skill.confidence}%` }}
            />
          </div>
        </div>

        {/* Source evidence */}
        <div className="flex items-center gap-2">
          <svg aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-40 text-deep-slate"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="text-xs text-deep-slate/50">
            Source: {evidence.title}
          </span>
        </div>

        {/* Resolution note */}
        {isResolved && skill.resolutionNote && (
          <div
            className={`rounded-lg border px-4 py-3 ${
              skill.status === 'rejected'
                ? 'border-mars-dust/15 bg-mars-dust/10'
                : 'border-flight-teal/15 bg-flight-teal/10'
            }`}
          >
            <p className="text-xs text-deep-slate/60">
              <span className="font-medium text-deep-slate/80">Resolution: </span>
              {skill.resolutionNote}
            </p>
          </div>
        )}

        {/* Action buttons */}
        {!isResolved && (
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onResolve(evidence.id, skill.id, 'reject')}
              className="inline-flex items-center gap-2 rounded-lg border border-mars-dust/30 bg-mars-dust/10 px-4 py-2 text-xs font-medium text-mars-dust transition-all duration-300 hover:border-mars-dust/50 hover:bg-mars-dust/20"
            >
              <XCircleIcon />
              Reject Inference
            </button>
            <button
              type="button"
              onClick={() => onResolve(evidence.id, skill.id, 'lower')}
              className="inline-flex items-center gap-2 rounded-lg border border-flight-teal/30 bg-flight-teal/10 px-4 py-2 text-xs font-medium text-flight-teal transition-all duration-300 hover:border-flight-teal/50 hover:bg-flight-teal/20"
            >
              <UserCheckIcon />
              Confirm at Lower Proficiency
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Shared Category Row ─── */

function SharedCategoryRow({ category, skills, evidence }) {
  const isSkillsCategory = category.label.toLowerCase().includes('skill');
  const isEvidenceCategory = category.label.toLowerCase().includes('evidence') || category.label.toLowerCase().includes('work');

  return (
    <div className="space-y-3 border-b border-precision-border pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-deep-slate/40">
            <FolderIcon />
          </span>
          <span className="text-sm font-medium text-deep-slate/80">
            {category.label}
          </span>
        </div>
        <span className="inline-flex items-center rounded-full border border-flight-teal/25 bg-flight-teal/10 px-2.5 py-1 text-xs font-medium text-flight-teal">
          {category.visibility === 'manager' ? 'Manager' : category.visibility === 'habitat-hr' ? 'Habitat HR' : category.visibility === 'team' ? 'Team' : category.visibility}
        </span>
      </div>

      {/* Skills data */}
      {isSkillsCategory && skills && skills.length > 0 && (
        <div className="ml-6 space-y-2">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between rounded-lg border border-precision-border bg-slate-50 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-deep-slate/40">
                  <BarChartIcon />
                </span>
                <span className="text-xs text-deep-slate/70">{skill.name}</span>
                {/* Resolution indicator */}
                {skill.status === 'rejected' && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-mars-dust/20 bg-mars-dust/10 px-2 py-0.5 text-[10px] text-mars-dust">
                    <XCircleIcon /> Rejected
                  </span>
                )}
                {skill.status === 'verified' && skill.resolutionNote && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-flight-teal/20 bg-flight-teal/10 px-2 py-0.5 text-[10px] text-flight-teal">
                    <CheckCircleIcon /> Resolved
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-deep-slate/10">
                  <div
                    className="h-full rounded-full bg-flight-teal/60 transition-all duration-300"
                    style={{ width: `${skill.proficiency || skill.confidence || 0}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-flight-teal">
                  {skill.proficiency || skill.confidence || 0}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Evidence data */}
      {isEvidenceCategory && evidence && evidence.length > 0 && (
        <div className="ml-6 space-y-2">
          {evidence.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 rounded-lg border border-precision-border bg-slate-50 px-3 py-2"
            >
              <svg aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 opacity-40 text-deep-slate"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="text-xs text-deep-slate/70">{item.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─── */

export default function ManagerView() {
  const ctx = useContext(AppContext);
  const evidence = ctx.evidence || [];
  const skills = ctx.skills || [];
  const privacy = ctx.privacy || [];

  // Collect all disputed skills across evidence items
  const disputedItems = useMemo(() => {
    const items = [];
    evidence.forEach((ev) => {
      const evSkills = ev.skills || [];
      evSkills.forEach((skill) => {
        if (skill.status === 'disputed' || skill.status === 'rejected' || (skill.status === 'verified' && skill.resolutionNote)) {
          items.push({ evidence: ev, skill });
        }
      });
    });
    // Also check top-level skills
    skills.forEach((skill) => {
      if (skill.status === 'disputed' || skill.status === 'rejected' || (skill.status === 'verified' && skill.resolutionNote)) {
        // Find related evidence
        const relatedEvidence = evidence.find((ev) =>
          (ev.skills || []).some((s) => s.id === skill.id)
        ) || { id: skill.id, title: 'Inferred from work patterns' };
        if (!items.some((i) => i.skill.id === skill.id)) {
          items.push({ evidence: relatedEvidence, skill });
        }
      }
    });
    return items;
  }, [evidence, skills]);

  const pendingCount = disputedItems.filter(
    (i) => i.skill.status === 'disputed'
  ).length;

  // Shared categories — filter out private items
  const sharedCategories = useMemo(
    () => privacy.filter((item) => item.visibility !== 'alex-only'),
    [privacy]
  );

  return (
    <div className="min-h-screen bg-slate-50 font-['Space_Grotesk',sans-serif] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Page Header */}
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-aerospace-charcoal">
            Manager Review Portal
          </h1>
        </header>

        {/* Authenticated Header */}
        <section className="rounded-2xl border border-precision-border bg-white p-5 backdrop-blur-xl transition-all duration-300 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-flight-teal/25 bg-flight-teal/10 text-sm font-bold text-flight-teal">
              ER
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-aerospace-charcoal">
                Authenticated as Dr. Elena Reyes
                <span className="ml-2 text-xs font-normal text-deep-slate/40">
                  Head of People Operations
                </span>
              </p>
              <p className="mt-0.5 text-xs text-deep-slate/50">
                Viewing data shared by team members within your authorized scope.
              </p>
            </div>
            {/* Auth icon */}
            <div className="hidden sm:block">
              <svg aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50 text-flight-teal"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
          </div>
        </section>

        {/* Pending Human Review Queue */}
        <section className="rounded-2xl border border-precision-border bg-white p-6 backdrop-blur-xl transition-all duration-300 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <span className="text-deep-slate/60">
              <ClipboardIcon />
            </span>
            <h2 className="text-lg font-semibold text-aerospace-charcoal">
              Pending Human Review
            </h2>
            <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full border border-mars-dust/25 bg-mars-dust/10 px-2 text-xs font-bold text-mars-dust">
              {pendingCount}
            </span>
          </div>

          {disputedItems.length > 0 ? (
            <div className="space-y-4">
              {disputedItems.map((item, index) => (
                <DisputedCard
                  key={`${item.evidence.id}-${item.skill.id}-${index}`}
                  evidence={item.evidence}
                  skill={item.skill}
                  onResolve={ctx.resolveDispute}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-precision-border bg-slate-50 px-6 py-8 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-flight-teal/10">
                <CheckCircleIcon />
              </div>
              <p className="text-sm text-deep-slate/50">
                No pending reviews. All skill inferences are currently verified or resolved.
              </p>
            </div>
          )}
        </section>

        {/* Team Overview — Shared Data */}
        <section className="rounded-2xl border border-precision-border bg-white p-6 backdrop-blur-xl transition-all duration-300 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <svg aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60 text-deep-slate"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h2 className="text-lg font-semibold text-aerospace-charcoal">
              Shared Team Data
            </h2>
          </div>

          {sharedCategories.length > 0 ? (
            <div className="space-y-4">
              {sharedCategories.map((category) => (
                <SharedCategoryRow
                  key={category.id}
                  category={category}
                  skills={skills}
                  evidence={evidence}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-precision-border bg-slate-50 px-6 py-8 text-center">
              <p className="text-sm text-deep-slate/50">
                No data has been shared by team members at this time.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
