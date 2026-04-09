"use client";

import { useCallback, useEffect, useState } from "react";
import { heroLines as defaultHeroLines } from "@/data/heroLines";
import { normalizeHeroSlide } from "@/lib/heroSlide";

/** Auto-advance hero slides when more than one step. */
const AUTO_ADVANCE_MS = 5000;

export default function HeroSection({ lines = defaultHeroLines }) {
  const lineCount = lines.length;
  const stepCount = Math.max(lineCount, 1);

  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (i) => {
      if (stepCount < 1) return;
      setIndex(((i % stepCount) + stepCount) % stepCount);
    },
    [stepCount],
  );

  const showPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const showNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (stepCount <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % stepCount);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [stepCount]);

  useEffect(() => {
    function onKey(e) {
      if (stepCount <= 1) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stepCount, showPrev, showNext]);

  const liveSlide = normalizeHeroSlide(lines[index % lineCount]);
  const liveAnnouncement = [liveSlide.label, ...liveSlide.paragraphs]
    .filter(Boolean)
    .join(". ");

  if (lineCount === 0) {
    return null;
  }

  return (
    <section
      id="hero"
      className="relative scroll-mt-24 w-full overflow-hidden border-b border-zinc-200 bg-gradient-to-br from-indigo-700 via-indigo-800 to-zinc-900 pt-24 pb-14 font-sans sm:pt-28 sm:pb-16"
      aria-label="Hero"
    >
      {stepCount > 1 && (
        <>
          <button
            type="button"
            onClick={showPrev}
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4 sm:h-12 sm:w-12"
            aria-label="Previous slide"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={showNext}
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:h-12 sm:w-12"
            aria-label="Next slide"
          >
            <Chevron direction="right" />
          </button>
        </>
      )}

      <div className="mx-auto flex min-h-[min(52vh,520px)] w-full max-w-5xl flex-col items-center justify-center px-5 py-12 sm:px-8 sm:py-16">
        <div className="w-full max-w-4xl overflow-x-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {Array.from({ length: stepCount }, (_, i) => {
              const slide = normalizeHeroSlide(lines[i % lineCount]);
              return (
                <div
                  key={i}
                  className="flex min-w-full shrink-0 flex-col items-center justify-center gap-4 px-2 sm:gap-5 sm:px-4"
                >
                  {slide.label ? (
                    <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100 sm:text-sm md:text-base">
                      {slide.label}
                    </p>
                  ) : null}
                  <div className="flex w-full max-w-3xl flex-col gap-4 text-center sm:gap-5">
                    {slide.paragraphs.map((paragraph, j) => (
                      <p
                        key={j}
                        className="text-xl font-semibold leading-snug text-white text-pretty sm:text-2xl sm:leading-snug md:text-3xl md:leading-snug lg:text-4xl lg:leading-tight"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {stepCount > 1 && (
          <div
            className="mt-10 flex justify-center gap-2 sm:mt-12"
            role="tablist"
            aria-label="Slide indicators"
          >
            {Array.from({ length: stepCount }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-900 ${
                  i === index
                    ? "h-2.5 w-12 bg-white"
                    : "h-2.5 w-2.5 bg-white/35 hover:bg-white/55"
                }`}
              />
            ))}
          </div>
        )}

        <p className="sr-only" aria-live="polite">
          {liveAnnouncement}
        </p>
      </div>
    </section>
  );
}

function Chevron({ direction }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}
