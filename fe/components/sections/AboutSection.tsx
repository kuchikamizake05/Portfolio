"use client";

import Link from "next/link";
import CircularGallery from "@/components/ui/circular-gallery";
import { ShimmerButton } from "@/components/ui/shimmer-button";
const focusAreas = ["Backend Engineering", "Full-Stack Development", "Payment Systems"];

const aboutTextSegments: { text: string; className?: string }[] = [
  { text: "I'm an Information Engineering undergraduate at " },
  { text: "Universitas Gadjah Mada", className: "text-white italic" },
  { text: " building " },
  { text: "backend services", className: "text-blue-400 italic" },
  { text: ", REST APIs, and " },
  { text: "full-stack applications", className: "text-emerald-400 italic" },
  { text: ". I'm interested in " },
  { text: "payment systems", className: "text-purple-400 italic" },
  { text: ", from wallet and ledger workflows to cross-border transfers." },
];

const galleryItems = [
  { image: "/about-gallery/photo-1-nobg.png", text: "" },
  { image: "/about-gallery/photo-2-nobg.png", text: "" },
  { image: "/about-gallery/photo-3-nobg.png", text: "" },
  { image: "/about-gallery/photo-4-nobg.png", text: "" },
  { image: "/about-gallery/photo-5-nobg.png", text: "" },
  { image: "/about-gallery/photo-6-nobg.png", text: "" },
  { image: "/about-gallery/photo-7-nobg.png", text: "" },
];

export default function AboutSection() {
  return (
    <section
      id="about-me"
      className="pb-5 scroll-mt-24 mb-10 md:mb-20 px-4 md:px-0 relative overflow-hidden"
    >
      {/* BACKGROUND TEXT */}
      <div className="absolute md:-top-30 left-1/2 -translate-x-1/2 select-none pointer-events-none -z-10 opacity-2">
        <span className="text-[15rem] md:text-[25rem] font-black text-white tracking-tighter uppercase whitespace-nowrap">
          About
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-0 relative">
        <div className="mb-5 flex items-center gap-6">
          <div className="h-px flex-1 bg-linear-to-r from-transparent to-white/20" />
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight shrink-0">
            About <span className="text-blue-500 italic">Me</span>
          </h2>
          <div className="h-px flex-1 bg-linear-to-r from-white/20 to-transparent" />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-3xl space-y-4 text-center">
            <p className="text-balance text-lg font-medium leading-relaxed text-white/80 md:text-xl">
              {aboutTextSegments.map((segment, index) => (
                <span key={index} className={segment.className}>
                  {segment.text}
                </span>
              ))}
            </p>

            <div className="mx-auto mb-5 mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-3 md:mb-6 md:gap-4">
              {focusAreas.map((area) => (
                <ShimmerButton
                  key={area}
                  type="button"
                  aria-label={area}
                  shimmerColor="#60a5fa"
                  shimmerDuration="2.6s"
                  background="rgba(15, 23, 42, 0.72)"
                  className="cursor-default border-blue-400/20 px-5 py-3 shadow-[0_16px_45px_rgba(37,99,235,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/50 hover:shadow-[0_20px_55px_rgba(37,99,235,0.2)]"
                >
                  <span className="text-center text-xs font-semibold uppercase leading-none tracking-[0.18em] text-white/90 md:text-sm">
                    {area}
                  </span>
                </ShimmerButton>
              ))}
            </div>

            {/* Circular Gallery WebGL Component */}
            <div className="relative -mt-10 h-[500px] w-full overflow-hidden md:-mt-16">
              <CircularGallery
                items={galleryItems}
                bend={1}
                textColor="#ffffff"
                borderRadius={0.05}
                scrollSpeed={2}
                scrollEase={0.05}
              />
            </div>

            <div className="-mt-8 flex justify-center md:-mt-12">
              <Link
                href="/about"
                className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-b from-white/20 to-white/10 border border-white/10 text-white font-bold text-base tracking-wide overflow-hidden group hover:bg-white/10 transition-colors"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <span className="relative z-10">More About Me</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
