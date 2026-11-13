import type { Project } from "@/data/site";

// Shows a project's real video or image when it exists in public/work/<slug>/,
// otherwise a designed title card in the project's cube colour.
export function TitleCard({ project, small = false }: { project: Project; small?: boolean }) {
  return (
    <div className={`card tone-${project.tone}`}>
      <small>{project.category}</small>
      <b style={small ? { fontSize: 26 } : undefined}>{project.name}</b>
    </div>
  );
}

export default function Media({
  project,
  className = "",
  priority = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  const { video, poster, portrait } = project.media;
  const alt = `${project.name}: ${project.summary}`;
  return (
    <div className={`media ${portrait ? "portrait " : ""}${className}`}>
      {portrait && poster && (
        // A vertical frame sits centred over a blurred copy of itself, so nothing is cropped.
        // eslint-disable-next-line @next/next/no-img-element
        <img className="backdrop" src={poster} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      )}
      {video ? (
        <video src={video} poster={poster} muted loop playsInline autoPlay preload={priority ? "auto" : "metadata"} aria-label={alt} />
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : undefined} />
      ) : (
        <TitleCard project={project} />
      )}
    </div>
  );
}
