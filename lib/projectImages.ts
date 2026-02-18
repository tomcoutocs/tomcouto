/**
 * Map project/repo names to preview image paths.
 * Add your images to public/projects/ and name them to match the repo:
 * - zarcfit.png (or .jpg, .webp)
 * - parrot.png
 * - PromptDaily.png
 */
export const PROJECT_IMAGES: Record<string, string> = {
  zarcfit: "/projects/zarcfit.png",
  parrot: "/projects/parrot.png",
  PromptDaily: "/projects/PromptDaily.png",
};

export function getProjectImage(repoName: string): string | null {
  return PROJECT_IMAGES[repoName] ?? null;
}
