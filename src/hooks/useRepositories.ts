import { useState, useEffect } from "react";
import { Repository, fetchGithubRepositories } from "@/app/actions/github";

type UseRepositoriesProps = {
  perPage?: number;
  page?: number;
};

type UseRepositoriesReturn = {
  repositories: Repository[];
  isLoading: boolean;
  totalPages: number;
  error: Error | null;
};

export function useRepositories({
  perPage = 6,
  page = 1,
}: UseRepositoriesProps = {}): UseRepositoriesReturn {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadRepositories() {
      try {
        setIsLoading(true);
        setError(null);

        const { repositories: data, totalPages: pages } =
          await fetchGithubRepositories(page, perPage);

        setRepositories(data);
        setTotalPages(pages);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        console.error("Error loading repositories:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadRepositories();
  }, [page, perPage]);

  return {
    repositories,
    isLoading,
    totalPages,
    error,
  };
}
