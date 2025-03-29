'use client'

import { useState, useCallback } from 'react'
import { LINKEDIN_CONFIG } from '@/lib/linkedin'

export function useLinkedInAuth() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const initiateAuth = useCallback(() => {
    setIsAuthenticating(true)

    // Gerar URL de autorização
    const authUrl = new URL(LINKEDIN_CONFIG.authUrl)
    authUrl.searchParams.append('response_type', 'code')
    authUrl.searchParams.append('client_id', LINKEDIN_CONFIG.clientId || '')
    authUrl.searchParams.append('redirect_uri', LINKEDIN_CONFIG.redirectUri)
    authUrl.searchParams.append('scope', LINKEDIN_CONFIG.scope)
    authUrl.searchParams.append('state', LINKEDIN_CONFIG.state)

    // Salvar o state no localStorage para validação posterior
    localStorage.setItem('linkedin_state', LINKEDIN_CONFIG.state)

    // Redirecionar para a página de autorização do LinkedIn
    window.location.href = authUrl.toString()
  }, [])

  return {
    isAuthenticating,
    initiateAuth
  }
} 