"use client";

import { useState, useEffect } from "react";
import { m as motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Target, User } from "lucide-react";

const slides = [
  {
    id: "bio",
    title: "Who Am I?",
    icon: User,
    content: (
      <div className="space-y-4">
        <p className="text-zinc-300 font-light leading-relaxed md:text-xl text-lg">
          I&apos;m an Information Engineering undergraduate at Universitas Gadjah
          Mada focused on backend engineering, full-stack development, and payment
          systems. I build REST APIs and database-backed applications using Java,
          Spring Boot, Go, TypeScript, Python, and PostgreSQL.
        </p>
        <p className="text-zinc-400 font-light leading-relaxed text-base">
          Curious about how systems work under the hood, I design solutions
          that are both functional and resilient.
        </p>
      </div>
    ),
    gradient: "from-blue-500/10 to-indigo-500/10",
  },
  {
    id: "motto",
    title: "Motto",
    icon: Quote,
    content: (
      <div className="flex flex-col justify-center h-full">
        <blockquote className="text-xl md:text-2xl font-light text-white italic leading-relaxed relative">
          <span className="text-white absolute font-bold -top-4 -left-2 text-xl opacity-30">
            "
          </span>
          Great software isn't just about code—it's about how it makes the user
          feel. Every micro-interaction is an opportunity to create a moment of
          delight.
        </blockquote>
      </div>
    ),
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    id: "goals",
    title: "Goals",
    icon: Target,
    content: (
      <div className="space-y-6">
        <p className="text-zinc-300 md:text-lg text-base">
          I am driven by continuous learning and a strong curiosity about how
          systems work. My goals include:
        </p>
        <ul className="space-y-3">
          {[
            "Build secure and well-engineered web applications",
            "Deepen expertise in payment systems, ledgers, and transaction processing",
            "Understand systems at both application and infrastructure levels",
          ].map((goal, i) => (
            <li key={i} className="flex items-center gap-3 text-zinc-400">
              <div className="size-1.5 rounded-full bg-white" />
              {goal}
            </li>
          ))}
        </ul>
      </div>
    ),
    gradient: "from-orange-500/10 to-rose-500/10",
  },
];

export default function WhoIAmCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="glass-card rounded-[32px] border border-white/5 relative overflow-hidden h-full min-h-[320px] flex flex-col">
      {/* Animated Background Gradient */}
      <motion.div
        key={slide.id + "-bg"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`absolute inset-0 bg-linear-to-br ${slide.gradient} opacity-20 blur-[100px]`}
      />

      {/* Header / Nav */}
      <div className="p-8 pb-0 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <slide.icon className="size-5 text-white" />
          </div>
          <h2 className="text-lg font-bold uppercase text-white tracking-widest">
            {slide.title}
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => paginate(-1)}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 relative z-10 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={{
              enter: (direction: number) => ({
                x: direction > 0 ? 50 : -50,
                opacity: 0,
              }),
              center: {
                zIndex: 1,
                x: 0,
                opacity: 1,
              },
              exit: (direction: number) => ({
                zIndex: 0,
                x: direction < 0 ? 50 : -50,
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="h-full flex flex-col justify-center"
          >
            {slide.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-10">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === current ? "w-8 bg-white" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
