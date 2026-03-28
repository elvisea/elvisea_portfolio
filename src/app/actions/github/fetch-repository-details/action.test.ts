import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@/lib/env/server", () => ({
  env: {
    NEXT_PUBLIC_GITHUB_API_URL: "https://api.github.com/users/testuser",
    NEXT_PUBLIC_GITHUB_USERNAME: "testuser",
  },
}));

import { fetchRepositoryDetails } from "./action";

const mockRepository = {
  id: 99,
  name: "portfolio",
  full_name: "testuser/portfolio",
  description: "Site",
  html_url: "https://github.com/testuser/portfolio",
  homepage: null,
  stargazers_count: 5,
  watchers_count: 2,
  forks_count: 1,
  language: "TypeScript",
  topics: [],
  created_at: "2020-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  default_branch: "main",
  owner: {
    avatar_url: "https://avatars.githubusercontent.com/u/1",
    html_url: "https://github.com/testuser",
  },
};

describe("fetchRepositoryDetails", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    process.env.ACCESS_TOKEN_GITHUB = "test-token";
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("deve retornar repositório e readme quando ambos os fetch resolvem ok", async () => {
    const readmeBody = "Hello ![x](/public/og-image.png) end";
    fetchMock.mockImplementation((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/readme")) {
        return Promise.resolve(new Response(readmeBody, { status: 200 }));
      }
      return Promise.resolve(
        new Response(JSON.stringify(mockRepository), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    });

    const result = await fetchRepositoryDetails("portfolio");

    expect(result.repository).toMatchObject({
      name: "portfolio",
      full_name: "testuser/portfolio",
    });
    expect(result.readme).toContain(
      "https://raw.githubusercontent.com/elvisea/landing-page-bensystem/refs/heads/main/public/og-image.png",
    );
    expect(result.readme).not.toContain("](/public/og-image.png)");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("deve retornar readme vazio quando o fetch do readme não é ok", async () => {
    fetchMock.mockImplementation((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/readme")) {
        return Promise.resolve(new Response("", { status: 404 }));
      }
      return Promise.resolve(
        new Response(JSON.stringify(mockRepository), { status: 200 }),
      );
    });

    const result = await fetchRepositoryDetails("portfolio");

    expect(result.repository.name).toBe("portfolio");
    expect(result.readme).toBe("");
  });

  it("deve lançar quando o fetch do repositório retorna não-ok", async () => {
    fetchMock.mockImplementation((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/readme")) {
        return Promise.resolve(new Response("", { status: 200 }));
      }
      return Promise.resolve(
        new Response(JSON.stringify({ message: "Not Found" }), {
          status: 404,
          statusText: "Not Found",
        }),
      );
    });

    await expect(fetchRepositoryDetails("missing")).rejects.toThrow(
      "Failed to fetch repository: Not Found",
    );
  });
});
