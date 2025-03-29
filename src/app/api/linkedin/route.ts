import { NextResponse } from 'next/server'
import { LinkedInProfile } from '@/types/linkedin'
import { LINKEDIN_CONFIG } from '@/lib/linkedin'
import { getLinkedInToken, removeLinkedInToken } from '@/lib/cookies'

export async function GET() {
  try {
    const accessToken = await getLinkedInToken()

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Buscar informações do perfil com campos específicos
    const profileResponse = await fetch(
      `${LINKEDIN_CONFIG.apiUrl}/me?projection=(id,localizedFirstName,localizedLastName,headline,profilePicture(displayImage~:playableStreams))`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
          'LinkedIn-Version': '202304',
        },
      }
    )

    if (!profileResponse.ok) {
      const errorData = await profileResponse.json()
      
      // Se o token estiver inválido, removemos ele e retornamos 401
      if (errorData.status === 401) {
        await removeLinkedInToken()
        return NextResponse.json(
          { error: 'Unauthorized', details: errorData },
          { status: 401 }
        )
      }

      throw new Error(`Failed to fetch profile data: ${JSON.stringify(errorData)}`)
    }

    const profileData = await profileResponse.json()

    // Buscar email com campos específicos
    const emailResponse = await fetch(
      `${LINKEDIN_CONFIG.apiUrl}/emailAddress?q=members&projection=(elements*(handle~))`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
          'LinkedIn-Version': '202304',
        },
      }
    )

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json()
      throw new Error(`Failed to fetch email data: ${JSON.stringify(errorData)}`)
    }

    const emailData = await emailResponse.json()

    // Transformar os dados da API do LinkedIn para o formato do nosso tipo LinkedInProfile
    const profile: LinkedInProfile = {
      id: profileData.id,
      firstName: profileData.localizedFirstName,
      lastName: profileData.localizedLastName,
      headline: profileData.headline || 'Software Developer',
      profilePicture: profileData.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier,
      email: emailData.elements?.[0]?.['handle~']?.emailAddress,
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('LinkedIn API error:', error)
    
    // Se for um erro conhecido, retornamos os detalhes
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch LinkedIn profile' },
      { status: 500 }
    )
  }
} 