export interface ContactEmailPayload {
  name: string;
  email: string;
  phone?: string;
  company: string;
  description: string;
  contactPreference: string;
  termsAccepted: boolean;
  projectType?: string;
  budget?: string;
  timeline?: string;
  services?: string[];
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
