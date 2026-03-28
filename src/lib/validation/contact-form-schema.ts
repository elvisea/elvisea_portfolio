import * as z from "zod";

export interface ContactFormValidationMessages {
  nameMin: string;
  emailInvalid: string;
  phoneMin: string;
  companyRequired: string;
  roleRequired: string;
  jobTypeRequired: string;
  workModelRequired: string;
  experienceLevelRequired: string;
  startDateRequired: string;
  descriptionMin: string;
  contactPreferenceRequired: string;
  linkedinInvalid: string;
  termsRequired: string;
}

/** Aligned with `public/locales/pt/common.json` → `jobform.validation` (server-side). */
export const contactFormServerValidationMessages: ContactFormValidationMessages =
  {
    nameMin: "Nome deve ter pelo menos 2 caracteres",
    emailInvalid: "Email inválido",
    phoneMin: "Telefone deve ter pelo menos 10 caracteres",
    companyRequired: "Nome da empresa é obrigatório",
    roleRequired: "Cargo/função é obrigatório",
    jobTypeRequired: "Tipo de contratação é obrigatório",
    workModelRequired: "Modelo de trabalho é obrigatório",
    experienceLevelRequired: "Nível de experiência é obrigatório",
    startDateRequired: "Data de início é obrigatória",
    descriptionMin: "Descrição deve ter pelo menos 10 caracteres",
    contactPreferenceRequired: "Preferência de contato é obrigatória",
    linkedinInvalid: "URL do LinkedIn inválida",
    termsRequired:
      "Você deve concordar com os termos de serviço e política de privacidade",
  };

export function createContactFormSchema(
  messages: ContactFormValidationMessages,
) {
  return z.object({
    name: z.string().min(2, { message: messages.nameMin }),
    email: z.string().email({ message: messages.emailInvalid }),
    phone: z
      .union([
        z.literal(""),
        z.string().min(10, { message: messages.phoneMin }),
      ])
      .optional(),
    company: z.string().min(1, { message: messages.companyRequired }),
    role: z.string().min(1, { message: messages.roleRequired }),
    jobType: z.string().min(1, { message: messages.jobTypeRequired }),
    workModel: z.string().min(1, { message: messages.workModelRequired }),
    location: z.string().optional(),
    experienceLevel: z
      .string()
      .min(1, { message: messages.experienceLevelRequired }),
    salaryRange: z.string().optional(),
    startDate: z.string().min(1, { message: messages.startDateRequired }),
    description: z.string().min(10, { message: messages.descriptionMin }),
    technologies: z.string().optional(),
    benefits: z.string().optional(),
    contactPreference: z
      .string()
      .min(1, { message: messages.contactPreferenceRequired }),
    linkedinProfile: z
      .union([
        z.literal(""),
        z.string().url({ message: messages.linkedinInvalid }),
      ])
      .optional(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: messages.termsRequired,
    }),
  });
}
