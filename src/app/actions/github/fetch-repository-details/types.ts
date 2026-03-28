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

export type FetchRepositoryDetailsResult = {
  repository: RepositoryDetails;
  readme: string;
};
