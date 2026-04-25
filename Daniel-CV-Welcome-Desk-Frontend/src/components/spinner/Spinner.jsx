import React from "react";

function Spinner() {
  return (
    <div
      className="flex items-center gap-4 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5 text-amber-50 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div
        className="h-11 w-11 animate-spin rounded-full border-2 border-amber-200/30 border-t-amber-200"
        aria-hidden="true"
      />
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100">
          Your answer is being generated
        </p>
        <p className="mt-1 text-sm leading-7 text-amber-50/85">
          Not long now. The response will appear just below.
        </p>
      </div>
    </div>
  );
}

export default Spinner;
