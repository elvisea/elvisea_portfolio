import { firebaseService } from "@/lib/firebase-config";

// Tipos predefinidos comuns, mas não limitados a estes
export type CommonClickType =
  | "email"
  | "location"
  | "phone"
  | "external_link"
  | "button"
  | "link"
  | "menu"
  | "tab"
  | "card"
  | "image"
  | "icon"
  | "form_submit";

// Propriedades base que sempre estarão disponíveis
interface BaseClickData {
  url?: string;
  label?: string;
  category?: string;
  section?: string;
  component?: string;
  action?: string;
  value?: number;
}

// Propriedades adicionais com tipos específicos
interface AdditionalClickData {
  // Dados específicos para email
  emailRecipient?: string;
  emailSubject?: string;

  // Dados específicos para localização
  coordinates?: string;
  zoom?: number;

  // Dados específicos para formulários
  formName?: string;
  formSuccess?: boolean;
  formErrorType?: string;

  // Dados específicos para elementos da interface
  elementId?: string;
  elementState?: string;
  elementPosition?: string;

  // Dados específicos para interações do usuário
  interactionDuration?: number;
  interactionSequence?: number;
  previousState?: string;
  nextState?: string;

  // Dados específicos para analytics
  analyticsGroupId?: string;
  analyticsTestId?: string;
  analyticsVariation?: string;
}

// Combinação de todas as propriedades possíveis
type ClickData = BaseClickData & AdditionalClickData;

interface UseClickTrackingProps {
  // Permite qualquer string como tipo, mas sugere os tipos comuns
  type: CommonClickType | string;
  // Dados adicionais opcionais para o evento
  data?: Partial<ClickData>;
}

export function useClickTracking({ type, data = {} }: UseClickTrackingProps) {
  return () => {
    firebaseService.logEvent("click_tracking", {
      click_type: type,
      ...data,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  };
}
