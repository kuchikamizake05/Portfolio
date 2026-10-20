"use client";

import ScrollVelocity from "@/components/ui/ScrollVelocity";

const text =
  "FAAID SAKHAA ✦ KUCHIKAMIZAKE ✦ BACKEND ENGINEERING ✦ FULL-STACK DEVELOPMENT ✦ PAYMENT SYSTEMS";

export default function MarqueeSection() {
  return (
    <section className="md:pt-20 pt-15 md:pb-10 pb-0 overflow-hidden relative">
      {/* Blue - Rotated Left */}
      <div className="absolute w-[200vw] -left-[50vw] md:-rotate-5 -rotate-13">
        <div className="bg-[linear-gradient(to_right,black,#1e3a8a,#2563eb,#1e3a8a,black)] py-6 shadow-lg">
          <ScrollVelocity
            texts={[text]}
            velocity={80}
            className="text-white font-bold text-2xl md:text-5xl tracking-wider"
            numCopies={6}
            damping={40}
            stiffness={350}
          />
        </div>
      </div>

      {/* Purple - Rotated Right */}
      <div className="absolute w-[200vw] -left-[50vw] md:rotate-5 rotate-13">
        <div className="bg-[linear-gradient(to_right,black,#4c1d95,#7c3aed,#4c1d95,black)] py-6 shadow-lg">
          <ScrollVelocity
            texts={[text]}
            velocity={-80}
            className="text-white font-bold text-2xl md:text-5xl tracking-wider"
            numCopies={6}
            damping={40}
            stiffness={350}
          />
        </div>
      </div>

      {/* Spacer for height */}
      <div className="h-40" />
    </section>
  );
}
