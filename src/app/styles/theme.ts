// Constantes de estilo para padronização da aplicação

// Tamanhos de fonte
export const fontSize = {
  xs: "text-xs",         // 0.75rem
  sm: "text-sm",         // 0.875rem
  base: "text-base",     // 1rem (16px)
  lg: "text-lg",         // 1.125rem
  xl: "text-xl",         // 1.25rem
  "2xl": "text-2xl",     // 1.5rem
  "3xl": "text-3xl",     // 1.875rem
  "4xl": "text-4xl",     // 2.25rem
  "5xl": "text-5xl",     // 3rem
}

// Pesos de fonte
export const fontWeight = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
}

// Cores de texto para modo claro
export const textColor = {
  primary: "text-gray-900 dark:text-white",
  secondary: "text-gray-600 dark:text-gray-300",
  tertiary: "text-gray-500 dark:text-gray-400",
  accent: "text-blue-600 dark:text-blue-300",
  white: "text-white",
  muted: "text-gray-400 dark:text-gray-500",
}

// Cores de fundo
export const bgColor = {
  primary: "bg-white dark:bg-gray-900",
  secondary: "bg-gray-50 dark:bg-gray-800",
  tertiary: "bg-gray-100 dark:bg-gray-700",
  accent: "bg-blue-600 dark:bg-blue-700",
  accentLight: "bg-blue-100 dark:bg-blue-900/30",
}

// Estilos de seção
export const sectionStyles = {
  default: "min-h-screen flex items-center py-24",
  primary: "min-h-screen flex items-center py-24 bg-white dark:bg-gray-900",
  secondary: "min-h-screen flex items-center py-24 bg-gray-50 dark:bg-gray-900/50",
  gradient: "min-h-screen flex items-center py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800",
}

// Estilos de cabeçalho de seção
export const sectionHeader = {
  wrapper: "text-center mb-16",
  badge: "inline-block mb-3 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium",
  title: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4",
  subtitle: "text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto",
}

// Estilos de cartão
export const cardStyles = {
  default: "bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow",
  bordered: "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow",
}

// Estilos de botão (complementares aos do Shadcn)
export const buttonStyles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-white text-blue-600 hover:bg-blue-50 border border-blue-200",
  accent: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white",
} 