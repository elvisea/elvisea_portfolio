import { NextResponse } from 'next/server'
import { LINKEDIN_CONFIG } from '@/lib/linkedin'
import { setLinkedInToken } from '@/lib/cookies'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    // Verificar se houve erro na autenticação
    if (error) {
      throw new Error(`LinkedIn authentication error: ${error} - ${errorDescription}`)
    }

    // Verificar se o código e state estão presentes
    if (!code || !state) {
      throw new Error('Missing code or state parameter')
    }

    // Verificar se o state corresponde ao esperado
    if (state !== LINKEDIN_CONFIG.state) {
      throw new Error('Invalid state parameter')
    }

    // Trocar o código por um token de acesso
    const tokenResponse = await fetch(LINKEDIN_CONFIG.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Restli-Protocol-Version': '2.0.0',
        'LinkedIn-Version': '202304',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: LINKEDIN_CONFIG.clientId || '',
        client_secret: LINKEDIN_CONFIG.clientSecret || '',
        redirect_uri: LINKEDIN_CONFIG.redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      throw new Error(`Failed to obtain access token: ${JSON.stringify(errorData)}`)
    }

    const tokenData = await tokenResponse.json()

    // Verificar se recebemos o token
    if (!tokenData.access_token) {
      throw new Error('No access token received from LinkedIn')
    }

    // Salvar o token em um cookie seguro
    await setLinkedInToken(tokenData.access_token)

    // Buscar informações do perfil
    const profileResponse = await fetch(`${LINKEDIN_CONFIG.apiUrl}/me`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    })

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch profile data')
    }

    const profileData = await profileResponse.json()

    // Buscar email
    const emailResponse = await fetch(`${LINKEDIN_CONFIG.apiUrl}/emailAddress?q=members&projection=(elements*(handle~))`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    })

    if (!emailResponse.ok) {
      throw new Error('Failed to fetch email data')
    }

    const emailData = await emailResponse.json()

    // Salvar os dados do perfil e token em um cookie seguro ou banco de dados
    // Aqui você deve implementar sua própria lógica de armazenamento

    // Redirecionar de volta para a página principal
    return NextResponse.redirect(new URL('/', request.url))
  } catch (error) {
    console.error('LinkedIn callback error:', error)
    return NextResponse.redirect(new URL('/auth/error', request.url))
  }
} 