import React from "react";

function QuestionHistory({ submittedQuestion }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
        Latest question
      </span>
      <p className="mt-3 text-base leading-7 text-stone-100">
        {submittedQuestion}
      </p>
    </div>
  );
}

export default QuestionHistory;
