"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

/**
 * @param {{
 *   slides: { src: string; alt: string }[];
 *   className?: string;
 *   variant?: "default" | "hero";
 *   overlay?: import("react").ReactNode;
 *   index?: number;
 *   onIndexChange?: (index: number) => void;
 *   stepCount?: number;
 *   hideDots?: boolean;
 * }} props
 */
export default function ImageCarousel({
  slides,
  className = "",
  variant = "default",
  overlay = null,
  index: controlledIndex,
  onIndexChange,
  stepCount: stepCountProp,
  hideDots = false,
}) {
  const isHero = variant === "hero";
  const slideCount = slides.length;
  const [internalIndex, setInternalIndex] = useState(0);

  const isControlled =
    typeof onIndexChange === "function" && controlledIndex !== undefined;
  const totalSteps = stepCountProp ?? slideCount;
  const index = isControlled ? controlledIndex : internalIndex;

  const setIndex = useCallback(
    (i) => {
      if (totalSteps < 1) return;
      const next = ((i % totalSteps) + totalSteps) % totalSteps;
      if (isControlled) {
        onIndexChange(next);
      } else {
        setInternalIndex(next);
      }
    },
    [isControlled, onIndexChange, totalSteps],
  );

  const goTo = useCallback((i) => setIndex(i), [setIndex]);
  const showPrev = useCallback(() => setIndex(index - 1), [setIndex, index]);
  const showNext = useCallback(() => setIndex(index + 1), [setIndex, index]);

  const touchStartX = useRef(null);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      showPrev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      showNext();
    }
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta > 48) showPrev();
    if (delta < -48) showNext();
  };

  if (slideCount === 0) {
    return null;
  }

  const imageIndex = index % slideCount;
  const current = slides[imageIndex];

  const showNav = totalSteps > 1;
  const showDotRow = showNav && !hideDots;

  return (
    <div
      className={className}
      role="region"
      aria-roledescription="carousel"
      aria-label={isHero ? "Hero image carousel" : "Image carousel"}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={`relative bg-zinc-100 ${
          isHero
            ? "overflow-x-hidden overflow-y-visible border-b border-zinc-200"
            : "overflow-hidden rounded-xl border border-zinc-200 shadow-sm"
        }`}
      >
        <div
          className={`relative w-full ${
            isHero
              ? "aspect-[16/9] min-h-[280px] sm:min-h-[380px] lg:min-h-[440px]"
              : "aspect-[16/10]"
          }`}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="object-contain"
            sizes={isHero ? "100vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"}
            priority={imageIndex === 0}
          />
          {isHero && overlay ? (
            <div className="pointer-events-none absolute inset-0 z-10">{overlay}</div>
          ) : null}
        </div>

        {showNav && (
          <>
            <button
              type="button"
              onClick={showPrev}
              className={`absolute left-2 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/95 text-zinc-700 shadow-sm backdrop-blur-sm transition-colors hover:border-[#2299D4] hover:bg-[#2299D4] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2299D4] sm:left-3 ${
                isHero ? "h-11 w-11 sm:h-12 sm:w-12" : "h-10 w-10"
              }`}
              aria-label="Previous slide"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className={`absolute right-2 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/95 text-zinc-700 shadow-sm backdrop-blur-sm transition-colors hover:border-[#2299D4] hover:bg-[#2299D4] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2299D4] sm:right-3 ${
                isHero ? "h-11 w-11 sm:h-12 sm:w-12" : "h-10 w-10"
              }`}
              aria-label="Next slide"
            >
              <Chevron direction="right" />
            </button>
          </>
        )}
      </div>

      {showDotRow && (
        <div
          className={`mt-4 flex justify-center gap-2 ${isHero ? "px-5 sm:px-6 lg:px-8" : ""}`}
          role="tablist"
          aria-label="Slide indicators"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2299D4] focus-visible:ring-offset-2 ${
                i === index
                  ? "w-8 bg-[#2299D4]"
                  : "w-2.5 bg-zinc-300 hover:bg-[#2299D4]"
              }`}
            />
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {totalSteps}
      </p>
    </div>
  );
}

function Chevron({ direction }) {
  return (
    <svg
      width="20"
      height="20"
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
