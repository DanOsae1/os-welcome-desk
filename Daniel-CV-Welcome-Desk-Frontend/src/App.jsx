import { useEffect, useRef, useState } from "react";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import QuestionTextArea from "./components/questionTextArea/QuestionTextArea";
import Spinner from "./components/spinner/Spinner";
import AnswerSection from "./components/answer/AnswerSection";
import QuestionHistory from "./components/questionHistory/QuestionHistory";
import Socials from "./components/socials/Socials";

const API_URL = import.meta.env.VITE_QUESTION_URL || "/v1/api/ask";
const DOWNLOAD_URL = import.meta.env.VITE_DOWNLOAD_URL || "/v1/api/download-cv";

const STREAM_START_DELAY_MS = 650;

function App() {
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [phase, setPhase] = useState("idle");
  const [resolvedAnswer, setResolvedAnswer] = useState("");
  const [streamedAnswer, setStreamedAnswer] = useState("");
  const [errorState, setErrorState] = useState(false);
  const answerSectionRef = useRef(null);

  useEffect(() => {
    if (phase !== "queued") {
      return undefined;
    }

    answerSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const timeoutId = window.setTimeout(() => {
      setStreamedAnswer("");
      setPhase("streaming");
    }, STREAM_START_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (phase !== "streaming") {
      return undefined;
    }

    let nextLength = 0;
    const chunkSize = Math.max(1, Math.ceil(resolvedAnswer.length / 160));
    const intervalId = window.setInterval(() => {
      nextLength = Math.min(resolvedAnswer.length, nextLength + chunkSize);
      setStreamedAnswer(resolvedAnswer.slice(0, nextLength));

      if (nextLength >= resolvedAnswer.length) {
        window.clearInterval(intervalId);
        setPhase(errorState ? "error" : "complete");
      }
    }, 24);

    return () => window.clearInterval(intervalId);
  }, [errorState, phase, resolvedAnswer]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedQuestion = question.trim().substring(0, 200);
    console.log("Submitting question:", trimmedQuestion);

    if (!trimmedQuestion || phase === "submitting") {
      return;
    }

    setSubmittedQuestion(trimmedQuestion);
    setResolvedAnswer("");
    setStreamedAnswer("");
    setErrorState(false);
    setPhase("submitting");

    try {
      let encodedQuestion = encodeURIComponent(trimmedQuestion);
      const response = await fetch(`${API_URL}?question=${encodedQuestion}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const parsedResponse = await response.text();

      if (!response.ok) {
        throw new Error(
          parsedResponse || "The service could not generate an answer.",
        );
      }

      setResolvedAnswer(
        parsedResponse || "An answer was returned with no content.",
      );
      setPhase("queued");
    } catch (error) {
      setErrorState(true);
      setResolvedAnswer(
        error instanceof Error
          ? error.message
          : "Something went wrong while contacting the backend.",
      );
      setPhase("queued");
    }
  };

  const handleReset = () => {
    setQuestion("");
    setSubmittedQuestion("");
    setResolvedAnswer("");
    setStreamedAnswer("");
    setErrorState(false);
    setPhase("idle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isSubmitting = phase === "submitting";
  const showLoader = phase === "submitting" || phase === "queued";
  const answerVisible = phase !== "idle";
  const isDone = phase === "complete" || phase === "error";
  const composerStateClass = isSubmitting
    ? "-translate-y-10 opacity-0 blur-sm"
    : phase === "idle"
      ? "translate-y-0 opacity-100"
      : "-translate-y-4 opacity-60";

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(45,212,191,0.16),_transparent_26%),linear-gradient(180deg,_#0c0a09_0%,_#1c1917_48%,_#0c0a09_100%)]" />
        <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-0 right-[-4rem] h-96 w-96 rounded-full bg-teal-300/10 blur-3xl" />
      </div>

      <NavBar
        status={
          isDone ? (errorState ? "Issue handled" : "Answer ready") : "Live demo"
        }
      />

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 pb-16 pt-10 sm:px-8 lg:px-12">
        <section className="grid min-h-[calc(100vh-7rem)] items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Hero />

          <div className="space-y-5">
            <div
              className={[
                "rounded-[2rem] border border-white/10 bg-stone-900/80 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-700 ease-out sm:p-8",
                composerStateClass,
              ].join(" ")}
            >
              <div className="mb-6 flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
                    Candidate Q&amp;A
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-7 text-stone-300">
                    Ask about experience, projects, strengths, and or role fit.
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-stone-300">
                  {question.trim().length}/200
                </span>
              </div>

              <QuestionTextArea
                value={question}
                onChange={setQuestion}
                onSubmit={handleSubmit}
                isBusy={isSubmitting}
              />
            </div>

            {showLoader ? <Spinner /> : null}

            {submittedQuestion ? (
              <QuestionHistory submittedQuestion={submittedQuestion} />
            ) : null}
          </div>
        </section>

        {answerVisible ? (
          <AnswerSection
            answerSectionRef={answerSectionRef}
            errorState={errorState}
            streamedAnswer={streamedAnswer}
            showLoader={showLoader}
            phase={phase}
            isDone={isDone}
            handleReset={handleReset}
          />
        ) : null}
      </main>
      <Socials />

      <Footer />
    </div>
  );
}

export default App;
