import React from "react";
import DownloadCVButton from "../downloadCVButton/DownloadCVButton";

function AnswerSection({
  answerSectionRef,
  errorState,
  streamedAnswer,
  showLoader,
  phase,
  isDone,
  handleReset,
}) {
  return (
    <section
      ref={answerSectionRef}
      className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr]"
    >
      <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-teal-300">
          Answer
        </p>
        {/* <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
          The response arrives in a dedicated reading section.
        </h2>
        <p className="max-w-md text-sm leading-7 text-stone-300">
          Once the backend resolves, the page scrolls here automatically and the
          answer is revealed progressively before the download action appears.
        </p> */}
      </div>

      <div
        className={[
          "rounded-[2rem] border p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8",
          errorState
            ? "border-rose-400/30 bg-rose-500/10"
            : "border-white/10 bg-stone-900/75",
        ].join(" ")}
      >
        <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
            {errorState ? "Handled error" : "Generated response"}
          </span>
          <p className="text-sm leading-7 text-stone-300"></p>
        </div>

        <div
          className="min-h-[18rem] pt-6 text-base leading-8 text-stone-100 sm:text-lg"
          aria-live="polite"
        >
          <p className="whitespace-pre-wrap">
            {streamedAnswer || (showLoader ? "Preparing your answer..." : "")}
          </p>
        </div>

        {phase === "streaming" ? (
          <div className="mt-5 flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-teal-300 [animation-delay:-0.3s]" />
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-teal-300 [animation-delay:-0.15s]" />
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-teal-300" />
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
          <DownloadCVButton />
          {isDone ? (
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:border-white/30 hover:bg-white/5"
              onClick={handleReset}
            >
              Ask another question
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default AnswerSection;
