import Image from 'next/image';
import type { Project } from '@/lib/projects';

/** Background for the plate a project logo sits on. */
export const logoPlate = (project: Project) =>
  project.logoOnDark ? 'bg-[#0b1220] ring-1 ring-white/15' : 'bg-white ring-1 ring-black/10';

/** Project logo; falls back to a typographic wordmark. */
export function ProjectLogo({
  project,
  className = 'h-7 md:h-8',
}: {
  project: Project;
  className?: string;
}) {
  if (!project.logo) {
    return (
      <span className="font-mono text-lg font-bold tracking-[-0.06em] text-black md:text-xl">
        {project.name}
      </span>
    );
  }
  return (
    <Image
      src={project.logo}
      alt={project.logoAlt ?? `${project.name} logo`}
      width={160}
      height={40}
      className={`w-auto object-contain ${className}`}
    />
  );
}
