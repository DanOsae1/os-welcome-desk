import React from "react";

function Hero() {
  return (
    <div className="space-y-8">
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-300">
          Thank you for visiting.
        </p>
        <h1 className="max-w-3xl font-serif text-5xl leading-tight text-white sm:text-6xl lg:text-7xl">
          Ask me about Daniel's experience, projects, strengths, or and role
          fit.
        </h1>
        <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
          This is a small side project I built to experiment with LLMs and share
          my experience and background in a more interactive way.
        </p>
      </div>

      <div
        className="grid gap-4 sm:grid-cols-3"
        aria-label="Experience highlights"
      >
        <article className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <span className="text-sm font-semibold text-amber-300">01</span>
          <p className="mt-3 text-sm leading-7 text-stone-200">
            Ask any work related question.
          </p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <span className="text-sm font-semibold text-amber-300">02</span>
          <p className="mt-3 text-sm leading-7 text-stone-200">
            Download a copy of my CV
          </p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <span className="text-sm font-semibold text-amber-300">03</span>
          <p className="mt-3 text-sm leading-7 text-stone-200">
            Lets have a conversation about how I can contribute to your team and
            company.
          </p>
        </article>
      </div>
    </div>
  );
}

export default Hero;
