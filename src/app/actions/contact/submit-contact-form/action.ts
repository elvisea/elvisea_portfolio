"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";

import type { ContactEmailPayload } from "@/lib/email/contact/types";
import {
  getClientEmailTemplate,
  getCompanyEmailTemplate,
} from "@/lib/email/contact/templates";

import { isContactSubmissionRateLimited } from "./rate-limit";
import { submitContactFormSchema } from "./schema";
import type { SubmitContactFormResult } from "./types";

function createMailTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function submitContactForm(
  raw: unknown,
): Promise<SubmitContactFormResult> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0]!.trim() : "unknown";

  if (isContactSubmissionRateLimited(ip)) {
    return {
      ok: false,
      code: "RATE_LIMITED",
      message:
        "Muitas tentativas. Por favor, aguarde um momento antes de tentar novamente.",
    };
  }

  const parsed = submitContactFormSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const msg =
      (Object.values(fieldErrors).flat()[0] as string | undefined) ??
      "Dados inválidos. Verifique o formulário.";
    return { ok: false, code: "VALIDATION_ERROR", message: msg };
  }

  const body = parsed.data;
  const EMAIL_CONTACT = process.env.EMAIL_CONTACT || "contato@bytefulcode.tech";

  const emailPayload: ContactEmailPayload = {
    ...body,
    phone: !body.phone ? undefined : body.phone,
    linkedinProfile:
      body.linkedinProfile === "" || body.linkedinProfile === undefined
        ? undefined
        : body.linkedinProfile,
  };

  const emailSubject = emailPayload.role
    ? `Nova Proposta de Trabalho - ${emailPayload.role} - ${emailPayload.company}`
    : `Nova Solicitação de Contato - ${emailPayload.name}`;

  try {
    const transporter = createMailTransport();
    await Promise.all([
      transporter.sendMail({
        from: EMAIL_CONTACT,
        to: EMAIL_CONTACT,
        subject: emailSubject,
        html: getCompanyEmailTemplate(emailPayload),
      }),
      transporter.sendMail({
        from: EMAIL_CONTACT,
        to: emailPayload.email,
        subject: emailPayload.role
          ? `Confirmação - Sua proposta de trabalho foi recebida`
          : `Confirmação - Sua mensagem foi recebida`,
        html: getClientEmailTemplate(emailPayload),
      }),
    ]);
    return { ok: true };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return {
      ok: false,
      code: "SEND_FAILED",
      message: "Erro ao enviar email. Tente novamente.",
    };
  }
}
