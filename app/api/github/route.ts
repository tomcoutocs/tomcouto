import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "tomcoutocs";
    const repoNames = ["zarcfit", "parrot", "PromptDaily"];

    // Fetch all specified repositories in parallel
    const repoPromises = repoNames.map((repoName) =>
      fetch(`https://api.github.com/repos/${username}/${repoName}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch ${repoName}`);
        }
        return res.json();
      })
    );

    const repos = await Promise.all(repoPromises);

    // Format the repositories to include only what we need
    const formattedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || "No description available",
      url: repo.html_url,
      language: repo.language,
      topics: repo.topics || [],
      updatedAt: repo.updated_at,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    }));

    return NextResponse.json(formattedRepos);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}

