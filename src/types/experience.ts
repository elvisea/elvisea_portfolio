export interface Experience {
  id: number;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null; // null para "Present"
  jobTitle: string;
  subtitle: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  tools: string[];
  languages: string[];
  isHighlighted?: boolean; // Para marcar as 3 experiências principais
  companyUrl: string; // URL do site da empresa ou LinkedIn
  slug: string; // Para usar na URL da página de detalhes
}

export interface ExperienceCardProps {
  experience: Experience;
  isExpanded?: boolean;
}

export interface ExperienceSectionProps {
  experiences: Experience[];
  showAll?: boolean;
}
