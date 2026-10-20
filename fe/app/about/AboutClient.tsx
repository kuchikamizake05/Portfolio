"use client";

import { m as motion } from "motion/react";
import ExperienceSection from "@/app/about/section/ExperienceSection";
import EducationSection from "@/app/about/section/EducationSection";
import WhoIAmCarousel from "@/app/about/section/WhoIAmCarousel";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  FileText,
  ArrowUpRight,
  Phone,
} from "lucide-react";
import Link from "next/link";

export default function AboutClient() {
  const socialActions = [
    {
      label: "GitHub",
      icon: Github,
      href: "https://github.com",
      className:
        "bg-white/5 border border-white/5 text-zinc-400 hover:bg-black hover:text-white hover:border-white/5",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com",
      className:
        "bg-white/5 border border-white/5 text-zinc-400 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]/50",
    },
    {
      label: "Twitter",
      icon: Twitter,
      href: "https://twitter.com",
      className:
        "bg-white/5 border border-white/5 text-zinc-400 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]/50",
    },
    {
      label: "Email",
      icon: Mail,
      href: "mailto:hello@example.com",
      className:
        "bg-white/5 border border-white/5 text-zinc-400 hover:bg-orange-500 hover:text-white hover:border-orange-500/50",
    },
  ];

  return (
    <div className="py-24 md:py-12">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-12 gap-6">
          {/* --- TOP ROW --- */}

          {/* Main Intro Card (Col 12 on mobile, Col 8 on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-12 lg:col-span-8 glass-card rounded-[32px] p-6 md:p-7 flex flex-col justify-between h-full border border-white/5 relative overflow-hidden group"
          >
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 size-[400px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

            <div className="space-y-6 relative z-10">
              {/* Intro Text */}
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl italic font-light text-zinc-400 tracking-tight">
                  Hi, I'm{" "}
                  <span className="font-extrabold not-italic text-white">
                    Faaid <span className="text-blue-500">Sakhaa</span>
                  </span>
                </h1>
                <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed max-w-xl">
                  I&apos;m an Information Engineering undergraduate at Universitas
                  Gadjah Mada, building backend services, REST APIs, and full-stack
                  applications. My interests include payment systems, with hands-on
                  work in digital wallets, double-entry ledgers, and cross-border
                  transfers.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-5 md:mt-4 relative z-10">
              <a
                href="https://docs.google.com/document/d/1Univan3qBfnbOra76fo93O1Zp722AIEr/edit?usp=sharing&ouid=116298138350179963444&rtpof=true&sd=true"
                className="relative h-[46px] px-8 rounded-2xl border border-white/5 text-white font-bold text-sm md:text-sm tracking-wide flex items-center gap-4 overflow-hidden group/btn bg-linear-to-b from-white/10 to-white/5"
              >
                <div className="absolute inset-0 bg-white translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <FileText className="size-4 relative z-10 group-hover/btn:text-black transition-colors duration-300" />
                <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                  Curriculum Vitae
                </span>
              </a>
            </div>
          </motion.div>

          {/* Social Grid (Col 12 on mobile, Col 4 on desktop) */}
          <div className="col-span-12 lg:col-span-4 grid grid-cols-4 md:grid-cols-2 gap-4 md:gap-6 h-full">
            {socialActions.map((action, idx) => (
              <motion.a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{
                  duration: 0.01,
                  ease: "easeOut",
                }}
                className={`rounded-[24px] md:rounded-[32px] flex flex-col items-center justify-center transition-all duration-300 ${action.className} aspect-square w-full shadow-lg group relative overflow-hidden bg-linear-to-b from-white/5 to-transparent`}
              >
                <action.icon className="w-7 h-7 md:w-12 md:h-12 transition-transform duration-500 group-hover:scale-110" />
              </motion.a>
            ))}
          </div>

          {/* --- BOTTOM ROW --- */}

          {/* Carousel: Who Am I (Col 12) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-12 h-full min-h-[350px]"
          >
            <WhoIAmCarousel />
          </motion.div>

          {/* Education Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="col-span-12"
          >
            <EducationSection />
          </motion.div>

          {/* Experience Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-12"
          >
            <ExperienceSection />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
