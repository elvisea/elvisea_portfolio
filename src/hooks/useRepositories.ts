import { useState, useEffect } from 'react'
import { env } from '@/lib/env'

export type Repository = {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string | null
  stargazers_count: number
  language: string
  topics: string[]
}

type UseRepositoriesProps = {
  perPage?: number
  page?: number
}

type UseRepositoriesReturn = {
  repositories: Repository[]
  isLoading: boolean
  totalPages: number
  error: Error | null
}

const githubApiUrl = env.NEXT_PUBLIC_GITHUB_API_URL

export function useRepositories({ perPage = 6, page = 1 }: UseRepositoriesProps = {}): UseRepositoriesReturn {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchRepositories() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(
          `${githubApiUrl}/repos?sort=stars&per_page=${perPage}&page=${page}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }

        // Get total count from header
        const linkHeader = response.headers.get('Link')
        if (linkHeader) {
          const lastPage = linkHeader.match(/&page=(\d+)>; rel="last"/)
          if (lastPage) {
            setTotalPages(parseInt(lastPage[1]))
          }
        }

        const data = await response.json()
        setRepositories(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
        console.error('Error fetching repositories:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepositories()
  }, [page, perPage])

  return {
    repositories,
    isLoading,
    totalPages,
    error
  }
} 