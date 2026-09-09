"use client";

import Image from "next/image";
import { getProjectPreview } from "@/app/lib/project-preview";
import { m as motion } from "motion/react";

type ProjectPageCardProps = {
  title: string;
  description: string;
  tech: string | string[];
  imageUrl?: string;
  repoUrl?: string;
  siteUrl?: string;
};

const SVG_ICON_MAP: Record<string, string> = {
  react: "/icons/devicon/react-original.svg",
  vite: "/icons/devicon/vitejs-original.svg",
  "vite.js": "/icons/devicon/vitejs-original.svg",
  vitejs: "/icons/devicon/vitejs-original.svg",
  tailwind: "/icons/devicon/tailwindcss-original.svg",
  "tailwind css": "/icons/devicon/tailwindcss-original.svg",
  tailwindcss: "/icons/devicon/tailwindcss-original.svg",
  next: "/icons/devicon/nextjs-original.svg",
  "next.js": "/icons/devicon/nextjs-original.svg",
  nextjs: "/icons/devicon/nextjs-original.svg",
  typescript: "/icons/devicon/typescript-original.svg",
  javascript: "/icons/devicon/javascript-original.svg",
  node: "/icons/devicon/nodejs-original.svg",
  "node.js": "/icons/devicon/nodejs-original.svg",
  nodejs: "/icons/devicon/nodejs-original.svg",
  express: "/icons/devicon/express-original.svg",
  python: "/icons/devicon/python-original.svg",
  django: "/icons/devicon/django-original.svg",
  flask: "/icons/devicon/flask-original.svg",
  mysql: "/icons/devicon/mysql-original.svg",
  postgresql: "/icons/devicon/postgresql-original.svg",
  postgres: "/icons/devicon/postgresql-original.svg",
  mongodb: "/icons/devicon/mongodb-original.svg",
  prisma: "/icons/devicon/prisma-original.svg",
  supabase: "/icons/devicon/supabase-original.svg",
  docker: "/icons/devicon/docker-original.svg",
  git: "/icons/devicon/git-original.svg",
  github: "/icons/devicon/github-original.svg",
  figma: "/icons/devicon/figma-original.svg",
  html: "/icons/devicon/html5-original.svg",
  css: "/icons/devicon/css3-original.svg",
  sass: "/icons/devicon/sass-original.svg",
  bootstrap: "/icons/devicon/bootstrap-original.svg",
  firebase: "/icons/devicon/firebase-original.svg",
  vercel: "/icons/devicon/vercel-original.svg",
  laravel: "/icons/devicon/laravel-original.svg",
  php: "/icons/devicon/php-original.svg",
  java: "/icons/devicon/java-original.svg",
  "c++": "/icons/devicon/cplusplus-original.svg",
  cpp: "/icons/devicon/cplusplus-original.svg",
};

function normalizeTechName(techName: string) {
  return techName.trim().toLowerCase().replace(/\s+/g, " ");
}

export default function ProjectPageCard({
  title,
  description,
  tech,
  imageUrl,
  repoUrl,
  siteUrl,
}: ProjectPageCardProps) {
  const preview = getProjectPreview(title, imageUrl);
  const techArray =
    typeof tech === "string"
      ? tech
          .split(",")
          .flatMap((t) => {
            const techName = t.trim();
            return techName ? [techName] : [];
          })
      : tech.filter(Boolean);
  const techIcons = techArray
    .flatMap((name) => {
      const normalizedName = normalizeTechName(name);
      const iconSrc = SVG_ICON_MAP[normalizedName];

      if (iconSrc) {
        return [{ name, iconSrc }];
      }

      return [];
    })
    .slice(0, 5);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.01, ease: "easeOut" }}
      className="glass-card rounded-[16px] p-5 flex flex-col h-full border border-white/10 hover:border-blue-500/30 hover:shadow-[0_0_50px_rgba(37,99,235,0.05)] transition-all duration-500 group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-white/5">
        {preview ? (
          <Image
            src={preview}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-700">
            <span className="text-4xl opacity-20">🚀</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 pt-3">
        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
          {title}
        </h3>

        {description.trim() && (
          <p className="text-sm leading-relaxed text-zinc-400 line-clamp-2 font-light">
            {description}
          </p>
        )}

        {/* Tech logos */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {techIcons.map(({ name, iconSrc }) => (
            <Image
              key={name}
              src={iconSrc}
              alt={name}
              title={name}
              width={28}
              height={28}
              className="size-7 object-contain transition-all duration-300 hover:-translate-y-0.5 hover:scale-110"
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 mt-auto pt-4">
          <a
            href={siteUrl || "#"}
            className="flex-1 h-[35px] flex items-center justify-center bg-linear-to-b from-blue-500/90 to-blue-700/90 text-white rounded-xl text-[8px] font-bold uppercase tracking-wider transition-all hover:bg-blue-200 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
          >
            Visit Site
          </a>
          <a
            href={repoUrl || "#"}
            className="flex-[1.2] h-[35px] flex items-center justify-center bg-linear-to-b from-white/10 to-white/5 border border-white/5 text-white rounded-xl text-[8px] font-bold uppercase tracking-wider transition-all hover:bg-white/5"
          >
            Source Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}
