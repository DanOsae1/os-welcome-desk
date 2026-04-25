function NavBar({ status }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-stone-950/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-5 sm:px-8 lg:px-12">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-stone-400">
            Candidate experience
          </p>
          <a
            className="mt-2 block font-serif text-xl text-white sm:text-2xl"
            href="#top"
          >
            Daniel's Career LLM Assistant
          </a>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
