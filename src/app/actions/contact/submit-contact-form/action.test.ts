import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next/headers", () => ({
  headers: vi.fn(() =>
    Promise.resolve({
      get: (name: string) =>
        name === "x-forwarded-for" ? "203.0.113.1" : null,
    }),
  ),
}));

const sendMailMock = vi.fn();

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: sendMailMock,
    })),
  },
}));

vi.mock("@/lib/email/contact/templates", () => ({
  getCompanyEmailTemplate: vi.fn(() => "<html>company</html>"),
  getClientEmailTemplate: vi.fn(() => "<html>client</html>"),
}));

import { submitContactForm } from "./action";
import { resetContactRateLimitForTests } from "./rate-limit";

const validPayload = {
  name: "João Silva",
  email: "joao@test.com",
  phone: "",
  company: "ACME",
  role: "Desenvolvedor",
  jobType: "fulltime",
  workModel: "remote",
  location: "",
  experienceLevel: "senior",
  salaryRange: "",
  startDate: "flexible",
  description: "1234567890ab",
  technologies: "",
  benefits: "",
  contactPreference: "email",
  linkedinProfile: "",
  termsAccepted: true as const,
};

describe("submitContactForm", () => {
  beforeEach(() => {
    sendMailMock.mockResolvedValue({});
    process.env.EMAIL_CONTACT = "owner@test.com";
    process.env.SMTP_HOST = "smtp.test.com";
    process.env.SMTP_PORT = "465";
    process.env.SMTP_USER = "u";
    process.env.SMTP_PASSWORD = "p";
    resetContactRateLimitForTests();
  });

  afterEach(() => {
    vi.clearAllMocks();
    resetContactRateLimitForTests();
  });

  it("envia dois e-mails quando os dados são válidos", async () => {
    const result = await submitContactForm(validPayload);

    expect(result).toEqual({ ok: true });
    expect(sendMailMock).toHaveBeenCalledTimes(2);
  });

  it("retorna VALIDATION_ERROR quando o payload é inválido", async () => {
    const result = await submitContactForm({
      ...validPayload,
      email: "não-é-email",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("VALIDATION_ERROR");
      expect(result.message.length).toBeGreaterThan(0);
    }
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("retorna RATE_LIMITED após exceder o limite", async () => {
    await submitContactForm(validPayload);
    await submitContactForm(validPayload);
    await submitContactForm(validPayload);
    const result = await submitContactForm(validPayload);

    expect(result).toEqual({
      ok: false,
      code: "RATE_LIMITED",
      message:
        "Muitas tentativas. Por favor, aguarde um momento antes de tentar novamente.",
    });
  });

  it("retorna SEND_FAILED quando sendMail rejeita", async () => {
    sendMailMock.mockRejectedValue(new Error("SMTP down"));

    const result = await submitContactForm(validPayload);

    expect(result).toEqual({
      ok: false,
      code: "SEND_FAILED",
      message: "Erro ao enviar email. Tente novamente.",
    });
  });
});
