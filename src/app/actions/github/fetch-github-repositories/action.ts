"use server";

import { env } from "@/lib/env/server";

import { listQuerySchema } from "./schema";
import type { FetchGithubRepositoriesResult, Repository } from "./types";

export async function fetchGithubRepositories(
  page: number = 1,
  perPage: number = 6,
): Promise<FetchGithubRepositoriesResult> {
  const { page: safePage, perPage: safePerPage } = listQuerySchema.parse({
    page,
    perPage,
  });

  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_GITHUB_API_URL}/repos?sort=stars&per_page=${safePerPage}&page=${safePage}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `token ${process.env.ACCESS_TOKEN_GITHUB}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("GitHub API Error:", {
        status: response.status,
        statusText: response.statusText,
        error,
      });
      throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }

    let totalPages = 1;
    const linkHeader = response.headers.get("Link");
    if (linkHeader) {
      const lastPage = linkHeader.match(/&page=(\d+)>; rel="last"/);
      if (lastPage) {
        totalPages = parseInt(lastPage[1], 10);
      }
    }

    const repositories = (await response.json()) as Repository[];

    return {
      repositories,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
}
