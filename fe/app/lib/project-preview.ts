// Local screenshots are used only when no image has been configured in admin.
const previews: Record<string, string> = {
  "corps agent": "/project-previews/corps-agent.png",
  sangu: "/project-previews/sangu.png",
  fintrack: "/project-previews/fintrack.png",
  passchick: "/project-previews/passchick.png",
  "ai summarizer": "/project-previews/ai-summarizer.png",
};

export function getProjectPreview(title: string, imageUrl?: string | null) {
  return imageUrl?.trim() || previews[title.trim().toLowerCase()];
}
