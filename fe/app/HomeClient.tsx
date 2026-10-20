"use client";

import { useEffect, useSyncExternalStore } from "react";
import { m as motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import AboutSection from "@/components/sections/AboutSection";
import TechStack from "@/components/sections/TechStack";
import ProjectsSection from "@/components/sections/ProjectsSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import ContactSection from "@/components/sections/ContactSection";
import ProfileCard from "@/components/ui/ProfileCard";
import { TypingAnimation } from "@/components/ui/typing-animation";
import RotatingText from "@/components/ui/rotating-text";
import LightRays from "@/components/ui/LightRays";

type Profile = {
  name: string[];
  roles: string[];
  stack: string[];
};

// Static profile data
const PROFILE: Profile = {
  name: ["Faaid Sakhaa", "Kuchikamizake."],
  roles: [
    "Backend Developer",
    "Full-Stack Developer",
    "Payment Systems Builder",
  ],
  stack: ["Next.js", "Express", "TypeScript"],
};

const subscribeMobileViewport = (onStoreChange: () => void) => {
  const mobileQuery = window.matchMedia("(max-width: 767px)");
  mobileQuery.addEventListener("change", onStoreChange);
  return () => mobileQuery.removeEventListener("change", onStoreChange);
};

const getMobileViewportSnapshot = () =>
  window.matchMedia("(max-width: 767px)").matches;

const getServerMobileViewportSnapshot = () => false;

export default function HomeClient() {
  const profile = PROFILE; // Use static data directly
  const isMobileViewport = useSyncExternalStore(
    subscribeMobileViewport,
    getMobileViewportSnapshot,
    getServerMobileViewportSnapshot,
  );

  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("scrollToContact");
    let scrollTimeoutId: ReturnType<typeof setTimeout> | null = null;

    if (shouldScroll === "true") {
      sessionStorage.removeItem("scrollToContact");
      // Small delay to ensure the page layout is fully calculated
      scrollTimeoutId = setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }

    return () => {
      if (scrollTimeoutId) {
        clearTimeout(scrollTimeoutId);
      }
    };
  }, []);

  return (
    <div className="space-y-16 pb-20 overflow-x-hidden relative">
      {/* Hero / About Section */}
      <section
        id="about"
        className="min-h-[70vh] flex flex-col justify-start pt-20 md:pt-25 scroll-mt-20 relative px-4 md:px-0 overflow-hidden"
      >
        {/* Viral UI Effects */}
        <div className="absolute inset-0 z-0 opacity-100 md:opacity-70">
          <LightRays
            raysOrigin="top-center"
            raysColor="#60a5fa"
            raysSpeed={isMobileViewport ? 0.55 : 0.8}
            lightSpread={isMobileViewport ? 4.2 : 2}
            rayLength={isMobileViewport ? 2.4 : 0.5}
            followMouse={true}
            mouseInfluence={isMobileViewport ? 0 : 0.1}
            noiseAmount={isMobileViewport ? 0.045 : 0.02}
            distortion={isMobileViewport ? 0.08 : 0}
            pulsating={isMobileViewport}
            fadeDistance={isMobileViewport ? 2 : 1}
            saturation={isMobileViewport ? 3 : 2}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto w-full relative z-10 flex flex-col md:flex-row items-center gap-12"
        >
          {/* Text Content */}
          <div className="flex-1 gap-6 order-2 md:order-1 text-center md:text-left flex flex-col items-center md:items-start md:translate-y-8 w-full">
            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-5"
            >
              <TypingAnimation
                words={profile.name}
                typeSpeed={100}
                deleteSpeed={50}
                pauseDelay={2000}
                delay={800}
                cursorStyle="line"
                startOnView={false}
                loop
                className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground leading-[1.1]"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 2.2,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex min-h-9 flex-wrap items-center justify-center gap-2 text-xl tracking-tight md:min-h-11 md:justify-start md:text-3xl mt-2.5 md:mt-3"
              >
                <span className="font-normal text-white">I&apos;m</span>
                <RotatingText
                  texts={profile.roles}
                  mainClassName="overflow-hidden bg-blue-500 p-2 font-semibold text-white shadow-[0_0_28px_rgba(59,130,246,0.16)] leading-none"
                  splitLevelClassName="overflow-hidden"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2200}
                  splitBy="characters"
                  auto
                  loop
                  style={{ borderRadius: "0.75rem" }}
                />
              </motion.p>
            </motion.div>
          </div>

          {/* User Photo Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto flex w-64 justify-center md:mx-0 md:w-80"
          >
            <ProfileCard
              name=""
              title=""
              handle="faaidsakhaa"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/about-gallery/photo-7-nobg.png"
              iconUrl="/iconpattern.png"
              patternUrl="/formal-invitation.svg"
              grainUrl=""
              showUserInfo={false}
              showDetails={false}
              avatarOnTop
              enableTilt={true}
              enableMobileTilt
              behindGlowColor="rgba(125, 190, 255, 0.67)"
              behindGlowEnabled={false}
              innerGradient="linear-gradient(to bottom,#60a5fa 0%,#1e3a8a 100%)"
              patternOverlayOpacity={0.2}
              cardRadius="9999px 9999px 0 0"
              aspectRatio="19 / 20"
              avatarScale={1.3}
              avatarBottomOffset="-95px"
              avatarBlendMode="normal"
              className="w-full [&_section]:!h-auto [&_section]:!max-h-none [&_section]:!w-full"
              onContactClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Custom Interactive Vertical Hover Scroll Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 2.25, duration: 1 }}
        className="flex justify-center -mt-8 md:-mt-9 mb-20 md:mb-8"
      >
        <button
          type="button"
          aria-label="Scroll to about me"
          onClick={() =>
            document
              .getElementById("about-me")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="group relative block cursor-pointer appearance-none border-0 bg-transparent p-0"
        >
          <div
            className="
      relative
      size-12
      group-hover:w-28
      rounded-full
      border border-blue-500
      bg-transparent
      overflow-hidden
      transition-all duration-500 ease-out
      flex items-center justify-center
    "
          >
            {/* LIQUID LAYER (TIDAK IKUT RESIZE) */}
            {/* <div className="absolute inset-0 pointer-events-none">
              <span
                className="
        absolute
        left-1/2 top-1/2
        -translate-x-1/2 -translate-y-1/2
        w-32 h-32
        bg-blue-950
        rounded-full
        scale-0
        transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        group-hover:scale-150
      "
              />
            </div> */}

            {/* TEXT */}
            <span
              className="
        absolute
        left-1/2
        -translate-x-1/2
        text-mediums font-medium text-blue-500
        opacity-0
        transition-all duration-300 ease-out
        group-hover:opacity-100
        group-hover:-translate-x-[80%]
        group-hover:font-bold
        whitespace-nowrap
      "
            >
              Scroll
            </span>

            {/* ARROW */}
            <ArrowDown
              className="
        absolute
        size-5 text-blue-500
        transition-transform duration-500 ease-out
        group-hover:translate-x-6
      "
            />
          </div>
        </button>
      </motion.div>

      {/* Sections with Reveal Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mt-16 md:mt-32"
      >
        <AboutSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <TechStack />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <ProjectsSection />
      </motion.div>

      {/* Full Width Marquee - Outside Container */}
      <MarqueeSection />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <ContactSection />
      </motion.div>
    </div>
  );
}
