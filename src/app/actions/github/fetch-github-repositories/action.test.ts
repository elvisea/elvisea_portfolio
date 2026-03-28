import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@/lib/env/server", () => ({
  env: {
    NEXT_PUBLIC_GITHUB_API_URL: "https://api.github.com/users/testuser",
    NEXT_PUBLIC_GITHUB_USERNAME: "testuser",
  },
}));

import { fetchGithubRepositories } from "./action";

const mockRepo = {
  id: 1,
  name: "portfolio",
  description: "My site",
  html_url: "https://github.com/testuser/portfolio",
  homepage: null,
  stargazers_count: 10,
  language: "TypeScript",
  topics: ["nextjs"],
};

describe("fetchGithubRepositories", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    process.env.ACCESS_TOKEN_GITHUB = "test-token";
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("deve retornar repositórios e totalPages 1 sem header Link", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify([mockRepo]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await fetchGithubRepositories(1, 6);

    expect(result.repositories).toHaveLength(1);
    expect(result.repositories[0]).toMatchObject({
      name: "portfolio",
      stargazers_count: 10,
    });
    expect(result.totalPages).toBe(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.github.com/users/testuser/repos?sort=stars&per_page=6&page=1",
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: "application/vnd.github+json",
          Authorization: "token test-token",
        }),
      }),
    );
  });

  it("deve extrair totalPages do header Link quando rel=last está presente", async () => {
    const link =
      '<https://api.github.com/users/testuser/repos?sort=stars&per_page=6&page=4>; rel="last"';
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify([mockRepo]), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          Link: link,
        },
      }),
    );

    const result = await fetchGithubRepositories(1, 6);

    expect(result.totalPages).toBe(4);
  });

  it("deve lançar erro quando a API retorna status não-ok", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ message: "Bad" }), {
        status: 500,
        statusText: "Internal Server Error",
      }),
    );

    await expect(fetchGithubRepositories(1, 6)).rejects.toThrow(
      "Failed to fetch repositories: Internal Server Error",
    );
  });

  it("deve propagar quando fetch rejeita", async () => {
    fetchMock.mockRejectedValue(new Error("network down"));

    await expect(fetchGithubRepositories(1, 6)).rejects.toThrow("network down");
  });
});
