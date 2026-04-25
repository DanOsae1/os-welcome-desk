import React from "react";

function DownloadCVButton() {
  const DOWNLOAD_URL = import.meta.env.VITE_DOWNLOAD_URL;
  return (
    <>
      <a
        className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
        href={DOWNLOAD_URL}
        target="_blank"
        rel="noreferrer"
      >
        Download Daniel&apos;s CV
      </a>
    </>
  );
}

export default DownloadCVButton;
