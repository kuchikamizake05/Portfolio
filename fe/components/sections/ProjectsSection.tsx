"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { m as motion, useSpring, useMotionValue } from "motion/react";
import { apiGet } from "@/app/lib/api";
import Link from "next/link";
import Image from "next/image";
import { getProjectPreview } from "@/app/lib/project-preview";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string;
  imageUrl?: string;
  repoUrl?: string;
  siteUrl?: string;
};

function ProjectCard({ project }: { project: Project }) {
  const preview = getProjectPreview(project.title, project.imageUrl);
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 150, damping: 15 });
  const springY = useSpring(my, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Magnetic pull — move max 15px from center
      const pullX = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const pullY = ((e.clientY - rect.top) / rect.height - 0.5) * 30;

      mx.set(pullX);
      my.set(pullY);
    },
    [mx, my]
  );

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
      className="relative"
    >
      <Link
        key={project.id}
        href={project.repoUrl || "#"}
        target={project.repoUrl ? "_blank" : undefined}
        rel={project.repoUrl ? "noopener noreferrer" : undefined}
        className="group block border-b-3 border-white/15 py-7 px-6 relative overflow-hidden transition-all duration-500 hover:border-blue-500/30"
      >
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-blue-600/5 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-[1]" />

        <div className="absolute inset-0 bg-linear-to-r from-transparent via-blue-600/5 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-[1]" />

        {/* Background Image on Hover */}
        {preview && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none z-0"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%)",
            }}
          >
            <Image
              src={preview}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center blur-sm brightness-75 scale-105"
            />
          </div>
        )}

        <div className="relative z-10 flex items-center justify-between gap-12">
          <div className="flex-1 space-y-2 max-w-[50%] group-hover:translate-x-2 transition-transform duration-300">
            <h3 className="text-3xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
              {project.title}
            </h3>
            {project.description.trim() && (
              <p className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {project.description}
              </p>
            )}
          </div>

          <div className="shrink-0 md:mr-6">
            <svg
              className="size-15 text-gray-500 group-hover:text-blue-400 transform group-hover:translate-x-2 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M17 8l4 4m0 0l-4 4m4-4H12"
              />
            </svg>
          </div>
        </div>
      </Link>

      {/* Floating Popup Image */}
      {preview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: visible ? 1 : 0,
            scale: visible ? 1 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{ x: springX, y: springY }}
          className="absolute top-[30%] left-3/4 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <div
            className="w-64 h-44 rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <Image
              src={preview}
              alt={project.title}
              width={256}
              height={176}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<Project[]>("/projects")
      .then((data) => {
        setProjects(data.slice(0, 5));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="projects"
      className="pt-6 md:pt-12 scroll-mt-20 px-4 md:px-0 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none -z-10 opacity-2">
        <span className="text-[12rem] md:text-[25rem] font-black text-white tracking-tighter uppercase whitespace-nowrap">
          Works
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-0 relative">
        <div className="mb-4 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none shrink-0">
              Featured
              <span className="text-blue-500 font-bold italic">Work</span>
            </h2>
            <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
          </div>
          <p className="text-lg md:text-xl text-muted-foreground font-light">
            Explore my projects, crafted with care and intent.
          </p>
        </div>

        {loading ? (
          <div className="space-y-0">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border-b border-white/5 py-6 animate-pulse"
              >
                <div className="h-16 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 rounded-[2.5rem] border border-dashed border-white/10 bg-white/2">
            <p className="text-gray-500 font-light text-lg italic tracking-wide">
              Work is currently in progress.
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {!loading && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="relative h-[52px] px-8 rounded-full bg-linear-to-b from-white/20 to-white/10 border border-white/10 text-white font-bold text-base tracking-wide flex items-center gap-2 overflow-hidden group hover:bg-white/10 transition-colors"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
              <span className="relative z-10">See All Projects</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
