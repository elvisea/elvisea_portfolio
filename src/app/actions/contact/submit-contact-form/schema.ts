import {
  createContactFormSchema,
  contactFormServerValidationMessages,
} from "@/lib/validation/contact-form-schema";

export const submitContactFormSchema = createContactFormSchema(
  contactFormServerValidationMessages,
);
