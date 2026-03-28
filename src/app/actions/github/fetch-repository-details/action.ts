"use server";

import { env } from "@/lib/env/server";

import { repoNameSchema } from "./schema";
import type { FetchRepositoryDetailsResult, RepositoryDetails } from "./types";

export async function fetchRepositoryDetails(
  name: string,
): Promise<FetchRepositoryDetailsResult> {
  const safeName = repoNameSchema.parse(name);

  try {
    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `token ${process.env.ACCESS_TOKEN_GITHUB}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const [repoResponse, readmeResponse] = await Promise.all([
      fetch(
        `https://api.github.com/repos/${env.NEXT_PUBLIC_GITHUB_USERNAME}/${safeName}`,
        {
          headers,
          next: { revalidate: 3600 },
        },
      ),
      fetch(
        `https://api.github.com/repos/${env.NEXT_PUBLIC_GITHUB_USERNAME}/${safeName}/readme`,
        {
          headers: {
            ...headers,
            Accept: "application/vnd.github.raw",
          },
          next: { revalidate: 3600 },
        },
      ),
    ]);

    if (!repoResponse.ok) {
      const errorData = await repoResponse.json().catch(() => ({}));
      console.error("Repository fetch failed:", {
        status: repoResponse.status,
        statusText: repoResponse.statusText,
        error: errorData,
      });
      throw new Error(`Failed to fetch repository: ${repoResponse.statusText}`);
    }

    const repository = (await repoResponse.json()) as RepositoryDetails;
    let readme = "";

    if (readmeResponse.ok) {
      readme = await readmeResponse.text();
      readme = readme.replace(
        /\/public\/og-image\.png/g,
        "https://raw.githubusercontent.com/elvisea/landing-page-bensystem/refs/heads/main/public/og-image.png",
      );
    } else {
      console.warn("README fetch failed:", readmeResponse.statusText);
    }

    return { repository, readme };
  } catch (error) {
    console.error("Error fetching repository details:", error);
    throw error;
  }
}
