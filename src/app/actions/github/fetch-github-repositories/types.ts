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

export type FetchGithubRepositoriesResult = {
  repositories: Repository[];
  totalPages: number;
};
