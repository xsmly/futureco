import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';

const ShieldIcon = () => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const EyeIcon = () => (
  <svg aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="pointer-events-none"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CategoryIcon = () => (
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
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

function getBadgeStyle(visibility) {
  if (visibility === 'alex-only') {
    return 'border-precision-border bg-slate-50 text-deep-slate/60';
  }
  return 'border-flight-teal/25 bg-flight-teal/10 text-flight-teal';
}

function formatVisibilityLabel(visibility) {
  switch (visibility) {
    case 'alex-only':
      return 'Private';
    case 'manager':
      return 'Manager';
    case 'habitat-hr':
      return 'Habitat HR';
    case 'team':
      return 'Team';
    default:
      return visibility;
  }
}

export default function PrivacyControls() {
  const ctx = useContext(AppContext);
  const privacyItems = ctx.privacy || [];
  const visibilityOptions = ctx.visibilityOptions || [];

  const summary = useMemo(() => {
    const counts = { manager: 0, hr: 0, private: 0 };
    privacyItems.forEach((item) => {
      if (item.visibility === 'manager') {
        counts.manager += 1;
      } else if (item.visibility === 'habitat-hr') {
        counts.hr += 1;
      } else if (item.visibility === 'alex-only') {
        counts.private += 1;
      }
    });
    return counts;
  }, [privacyItems]);

  return (
    <div className="min-h-screen bg-slate-50 font-['Space_Grotesk',sans-serif] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Page Header */}
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-aerospace-charcoal">
            Privacy & Controls
          </h1>
        </header>

        {/* Platform Principle */}
        <section
          className="relative overflow-hidden rounded-2xl border border-flight-teal/15 bg-white px-6 py-10 text-center backdrop-blur-xl transition-all duration-300 shadow-sm"
        >
          <div className="relative space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-flight-teal/10">
              <ShieldIcon />
            </div>
            <h2
              className="text-2xl font-bold text-aerospace-charcoal"
            >
              The system advises. Alex decides.
            </h2>
            <p className="mx-auto max-w-md text-sm text-deep-slate/50">
              You have full control over what information is shared, with whom, and when.
            </p>
          </div>
        </section>

        {/* Data Visibility Matrix */}
        <section className="rounded-2xl border border-precision-border bg-white p-6 backdrop-blur-xl transition-all duration-300 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <span className="text-deep-slate/60">
              <EyeIcon />
            </span>
            <h2 className="text-lg font-semibold text-aerospace-charcoal">
              Data Visibility Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-precision-border">
                  <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-widest text-deep-slate/40">
                    Data Category
                  </th>
                  <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-widest text-deep-slate/40">
                    Current Visibility
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-widest text-deep-slate/40">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {privacyItems.map((item) => (
                  <tr
                    key={item.id}
                    className="group border-b border-precision-border transition-all duration-300 hover:bg-slate-50"
                  >
                    {/* Category */}
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-deep-slate/40">
                          <CategoryIcon />
                        </span>
                        <span className="text-sm font-medium text-deep-slate/80">
                          {item.label}
                        </span>
                      </div>
                    </td>

                    {/* Current Visibility Badge */}
                    <td className="py-4 pr-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getBadgeStyle(
                          item.visibility
                        )}`}
                      >
                        {formatVisibilityLabel(item.visibility)}
                      </span>
                    </td>

                    {/* Dropdown */}
                    <td className="py-4">
                      <div className="relative inline-flex">
                        <select
                          value={item.visibility}
                          onChange={(e) =>
                            ctx.updatePrivacy(item.id, e.target.value)
                          }
                          className="appearance-none rounded-lg border border-precision-border bg-slate-50 py-2 pl-3 pr-8 text-xs font-medium text-deep-slate/80 outline-none backdrop-blur-sm transition-all duration-300 hover:border-deep-slate/20 focus:border-flight-teal/40 focus:ring-1 focus:ring-flight-teal/20"
                        >
                          {visibilityOptions.map((opt) => (
                            <option
                              key={opt.value || opt}
                              value={opt.value || opt}
                              className="bg-white text-aerospace-charcoal"
                            >
                              {opt.label || opt}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-deep-slate/40">
                          <ChevronDownIcon />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Privacy Summary */}
        <section className="rounded-2xl border border-precision-border bg-white p-5 backdrop-blur-xl transition-all duration-300 shadow-sm">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-deep-slate/40">
            Privacy Summary
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Manager count */}
            <div className="flex items-center gap-3 rounded-xl border border-precision-border bg-slate-50 px-4 py-3 transition-all duration-300">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-flight-teal/10 text-sm font-bold text-flight-teal">
                {summary.manager}
              </span>
              <span className="text-xs text-deep-slate/60">
                categories shared with Manager
              </span>
            </div>

            {/* HR count */}
            <div className="flex items-center gap-3 rounded-xl border border-precision-border bg-slate-50 px-4 py-3 transition-all duration-300">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-flight-teal/10 text-sm font-bold text-flight-teal">
                {summary.hr}
              </span>
              <span className="text-xs text-deep-slate/60">
                categories shared with HR
              </span>
            </div>

            {/* Private count */}
            <div className="flex items-center gap-3 rounded-xl border border-precision-border bg-slate-50 px-4 py-3 transition-all duration-300">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-deep-slate/10 text-sm font-bold text-deep-slate/60">
                {summary.private}
              </span>
              <span className="text-xs text-deep-slate/60">
                categories private
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
