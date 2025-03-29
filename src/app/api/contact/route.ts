import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { headers } from 'next/headers'

import { FormData } from '../types'

import { getClientEmailTemplate, getCompanyEmailTemplate } from '../templates'

// Rate limiting configuration
const REQUESTS_PER_MINUTE = 3
const WINDOW_SIZE_MS = 60 * 1000 // 1 minute

interface RateLimitInfo {
  count: number
  firstRequest: number
}

// Store IP addresses and their request counts (in memory)
const rateLimitMap = new Map<string, RateLimitInfo>()

// Clean up old entries every minute
setInterval(() => {
  const now = Date.now()
  for (const [ip, info] of rateLimitMap.entries()) {
    if (now - info.firstRequest >= WINDOW_SIZE_MS) {
      rateLimitMap.delete(ip)
    }
  }
}, WINDOW_SIZE_MS)

// Rate limit checker
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const info = rateLimitMap.get(ip)

  if (!info) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now })
    return false
  }

  if (now - info.firstRequest >= WINDOW_SIZE_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now })
    return false
  }

  if (info.count >= REQUESTS_PER_MINUTE) {
    return true
  }

  info.count++
  return false
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    // Get IP address from headers
    const headersList = await headers()
    const forwardedFor = headersList.get('x-forwarded-for')
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown'

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          message: 'Muitas tentativas. Por favor, aguarde um momento antes de tentar novamente.',
          error: 'RATE_LIMITED'
        },
        { status: 429 }
      )
    }

    const body: FormData = await request.json()

    const EMAIL_CONTACT = process.env.EMAIL_CONTACT || "contato@bytefulcode.tech"

    // Email para a empresa
    const companyMailOptions = {
      from: EMAIL_CONTACT,
      to: EMAIL_CONTACT,
      subject: `Nova Solicitação de Projeto - ${body.name}`,
      html: getCompanyEmailTemplate(body),
    }

    // Email para o cliente
    const clientMailOptions = {
      from: EMAIL_CONTACT,
      to: body.email,
      subject: 'Recebemos sua solicitação - BytefulCode',
      html: getClientEmailTemplate(body),
    }

    // Enviar ambos os emails
    await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(clientMailOptions),
    ])

    return NextResponse.json(
      { message: 'Email enviado com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return NextResponse.json(
      { message: 'Erro ao enviar email' },
      { status: 500 }
    )
  }
} 