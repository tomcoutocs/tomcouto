/**
 * Map project/repo names to preview image paths under public/projects/.
 */
export const PROJECT_IMAGES: Record<string, string> = {
  zarcfit: "/projects/zarcfit.png",
  parrot: "/projects/parrot.png",
  PromptDaily: "/projects/PromptDaily.png",
  barc: "/projects/barc.png",
  optracker: "/projects/optracker.png",
  optrackman: "/projects/optrackman.jpg",
};

export function getProjectImage(repoName: string): string | null {
  return PROJECT_IMAGES[repoName] ?? null;
}
