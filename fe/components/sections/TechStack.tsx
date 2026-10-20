"use client";

import { cn } from "@/lib/utils";
import Marquee3D from "@/components/ui/marquee-3d";

const techs = [
  { icon: "devicon-java-plain", name: "Java", color: "text-orange-400" },
  { icon: "devicon-spring-original", name: "Spring Boot", color: "text-green-500" },
  { icon: "devicon-go-original-wordmark", name: "Go", color: "text-cyan-400" },
  { icon: "devicon-postgresql-plain", name: "PostgreSQL", color: "text-blue-400" },
  { icon: "devicon-redis-plain", name: "Redis", color: "text-red-500" },
  { icon: "devicon-rabbitmq-original", name: "RabbitMQ", color: "text-orange-500" },
  { icon: "devicon-docker-plain", name: "Docker", color: "text-blue-400" },
  { icon: "devicon-python-plain", name: "Python", color: "text-yellow-400" },
  { icon: "devicon-fastapi-plain", name: "FastAPI", color: "text-teal-400" },
  { icon: "devicon-react-original", name: "React", color: "text-sky-400" },
  { icon: "devicon-nextjs-plain", name: "Next.js", color: "text-white" },
  { icon: "devicon-typescript-plain", name: "TypeScript", color: "text-blue-500" },
  { icon: "devicon-javascript-plain", name: "JavaScript", color: "text-yellow-400" },
  { icon: "devicon-tailwindcss-plain", name: "Tailwind CSS", color: "text-sky-400" },
  { icon: "devicon-supabase-plain", name: "Supabase", color: "text-green-500" },
  { icon: "devicon-git-plain", name: "Git", color: "text-red-500" },
];

function TechCard({
  icon,
  name,
  color,
}: {
  icon: string;
  name: string;
  color: string;
}) {
  return (
    <figure
      className={cn(
        "group relative h-fit w-[7.5rem] md:w-36 cursor-pointer overflow-hidden rounded-xl border p-3 md:p-4",
        "border-white/[0.04] bg-white/[0.03] hover:border-white/[0.08] hover:bg-white/[0.06]",
        "transition-all duration-300",
        "hover:shadow-[0_0_20px_rgba(59,130,246,0.08)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <i className={`${icon} ${color} text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110`} />
        <figcaption className="text-xs md:text-sm font-medium text-white transition-colors duration-300 group-hover:text-blue-300">
          {name}
        </figcaption>
      </div>
    </figure>
  );
}

export default function TechStack() {
  return (
    <section className="md:pt-12 py-5 relative overflow-hidden">
      {/* BACKGROUND TEXT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none -z-10 opacity-2">
        <span className="text-[15rem] md:text-[25rem] font-black text-white tracking-tighter uppercase whitespace-nowrap">
          Stack
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-0 mb-6 md:mb-15 relative">
        <div className="flex items-center gap-6">
          <div className="h-px flex-1 bg-linear-to-r from-transparent to-white/20" />
          <h2 className="shrink-0 text-center text-4xl font-bold tracking-tight text-white md:text-5xl">
            Professional <span className="text-blue-500 italic">Stack</span>
          </h2>
          <div className="h-px flex-1 bg-linear-to-r from-white/20 to-transparent" />
        </div>
      </div>

      <Marquee3D>
        {techs.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee3D>
    </section>
  );
}
