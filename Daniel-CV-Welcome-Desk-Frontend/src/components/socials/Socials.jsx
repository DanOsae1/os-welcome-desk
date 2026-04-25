const LINKEDIN_URL =
  import.meta.env.VITE_LINKEDIN_URL ||
  "https://www.linkedin.com/in/daniel-osae-4a743b3b3/";

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17V10.88H6.3V17H8.34M7.32 10.04A1.18 1.18 0 1 0 7.32 7.68A1.18 1.18 0 0 0 7.32 10.04M17.7 17V13.62C17.7 11.81 16.73 10.72 15.17 10.72C13.91 10.72 13.35 11.41 13.04 11.9V10.88H11V17H13.04V13.63C13.04 12.74 13.21 11.88 14.31 11.88C15.39 11.88 15.4 12.9 15.4 13.69V17H17.7Z" />
    </svg>
  );
}

function Socials() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 pb-4 sm:px-8 lg:px-12">
      <div className="flex items-center justify-end">
        <a
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-stone-200 transition hover:border-amber-300/40 hover:bg-white/10 hover:text-white"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Daniel's LinkedIn profile"
        >
          <LinkedInIcon />
          <span>LinkedIn</span>
        </a>
      </div>
    </section>
  );
}

export default Socials;