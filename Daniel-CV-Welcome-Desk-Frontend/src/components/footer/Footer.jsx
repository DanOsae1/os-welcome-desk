function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative mx-auto mt-12 w-full max-w-7xl border-t border-white/10 px-6 py-8 text-sm text-stone-400 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* <p>
          Built as a focused single-page frontend for Daniel&apos;s CV welcome
          desk.
        </p> */}
        <p>
          {/* <p className="flex justify-center items-center gap-1"> */}
          Osaebros ltd &copy; {currentYear}{" "}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
