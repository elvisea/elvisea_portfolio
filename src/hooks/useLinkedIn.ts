'use client'

import { useState, useEffect } from 'react'
import { LinkedInProfile } from '@/types/linkedin'
import { useLinkedInAuth } from './useLinkedInAuth'

export function useLinkedIn() {
  const [profile, setProfile] = useState<LinkedInProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticating, initiateAuth } = useLinkedInAuth()

  useEffect(() => {
    async function fetchLinkedInProfile() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/linkedin')
        
        if (!response.ok) {
          if (response.status === 401) {
            // Se não estiver autenticado, inicia o processo de autenticação
            initiateAuth()
            return
          }
          throw new Error('Failed to fetch LinkedIn profile')
        }

        const data = await response.json()
        setProfile(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setProfile(null)
      } finally {
        setIsLoading(false)
      }
    }

    if (!isAuthenticating) {
      fetchLinkedInProfile()
    }
  }, [isAuthenticating, initiateAuth])

  return { profile, isLoading, error }
} 