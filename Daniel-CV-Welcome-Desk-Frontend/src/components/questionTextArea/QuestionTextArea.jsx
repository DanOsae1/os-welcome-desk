function QuestionTextArea({ value, onChange, onSubmit, isBusy }) {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <label htmlFor="chat" className="sr-only">
        Ask about Daniel&apos;s career
      </label>

      <textarea
        id="chat"
        name="chat"
        rows="6"
        maxLength="200"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="What makes Daniel a strong fit for this role, and which projects best support that?"
        disabled={isBusy}
        className="min-h-[12rem] w-full resize-none rounded-[1.5rem] border border-white/10 bg-stone-950/80 
        px-5 py-4 text-base leading-7 text-stone-100 outline-none transition placeholder:text-stone-500 
        focus:border-amber-300/60 focus:ring-4 focus:ring-amber-300/10 disabled:cursor-not-allowed disabled:opacity-60"
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-7 text-stone-400">
          Answers may be incomplete or imperfect. For best results, ask about
          Daniel&apos;s experience, projects, strengths, and or role fit.
        </p>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-300"
          disabled={isBusy || !value.trim()}
        >
          <span>{isBusy ? "Sending..." : "Submit question"}</span>
          <svg
            className="w-6 h-6 rotate-90 rtl:-rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default QuestionTextArea;
