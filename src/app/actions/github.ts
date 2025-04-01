"use server";

import { env } from "@/lib/env";

export type Repository = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string;
  topics: string[];
};

export async function fetchGithubRepositories(
  page: number = 1,
  perPage: number = 6,
) {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_GITHUB_API_URL}/repos?sort=stars&per_page=${perPage}&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `token ${process.env.ACCESS_TOKEN_GITHUB}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
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

    // Get total count from header
    let totalPages = 1;
    const linkHeader = response.headers.get("Link");
    if (linkHeader) {
      const lastPage = linkHeader.match(/&page=(\d+)>; rel="last"/);
      if (lastPage) {
        totalPages = parseInt(lastPage[1]);
      }
    }

    const repositories = await response.json();

    return {
      repositories,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
}

export type RepositoryDetails = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  default_branch: string;
  owner: {
    avatar_url: string;
    html_url: string;
  };
};

export async function fetchRepositoryDetails(
  name: string,
): Promise<{ repository: RepositoryDetails; readme: string }> {
  try {
    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `token ${process.env.ACCESS_TOKEN_GITHUB}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const [repoResponse, readmeResponse] = await Promise.all([
      fetch(
        `https://api.github.com/repos/${env.NEXT_PUBLIC_GITHUB_USERNAME}/${name}`,
        {
          headers,
          next: { revalidate: 3600 }, // Cache for 1 hour
        },
      ),
      fetch(
        `https://api.github.com/repos/${env.NEXT_PUBLIC_GITHUB_USERNAME}/${name}/readme`,
        {
          headers: {
            ...headers,
            Accept: "application/vnd.github.raw",
          },
          next: { revalidate: 3600 }, // Cache for 1 hour
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

    const repository = await repoResponse.json();
    let readme = "";

    if (readmeResponse.ok) {
      readme = await readmeResponse.text();
      // Process README content
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
