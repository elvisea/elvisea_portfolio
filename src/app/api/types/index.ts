export interface FormData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  description: string;
  contactPreference: string;
  termsAccepted: boolean;

  // Campos originais (podem ser opcionais agora)
  projectType?: string;
  budget?: string;
  timeline?: string;
  services?: string[];

  // Novos campos para propostas de trabalho
  role?: string;
  jobType?: string;
  workModel?: string;
  location?: string;
  experienceLevel?: string;
  salaryRange?: string;
  startDate?: string;
  technologies?: string;
  benefits?: string;
  linkedinProfile?: string;
}
