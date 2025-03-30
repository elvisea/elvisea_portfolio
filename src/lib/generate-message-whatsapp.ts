export function generateMessageWhatsapp(language: "pt" | "en" | "es") {
  const messages = {
    pt: "Olá! Tenho uma oportunidade profissional que combina com seu perfil. Podemos conversar?",
    en: "Hello! I have a professional opportunity that matches your profile. Can we talk?",
    es: "¡Hola! Tengo una oportunidad profesional que coincide con tu perfil. ¿Podemos hablar?",
  };

  return encodeURIComponent(messages[language]);
}
