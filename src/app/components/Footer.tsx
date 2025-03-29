import Link from "next/link"
import { textColor, bgColor } from "../styles/theme"

export function Footer() {

  const PHONE_NUMBER = process.env.PHONE_NUMBER || "(41) 99219-0528";
  const EMAIL_CONTACT = process.env.EMAIL_CONTACT || "contato@bytefulcode.tech";

  return (
    <footer className={`py-12 ${bgColor.primary} border-t border-gray-200 dark:border-gray-800`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className={`text-xl font-bold mb-4 ${textColor.primary}`}>BytefulCode</h3>
            <p className={`${textColor.secondary} mb-4`}>
              Transformamos ideias em código. Desenvolvimento de software personalizado para empresas que buscam inovação, qualidade e resultados.
            </p>
          </div>

          <div>
            <h4 className={`text-lg font-semibold mb-4 ${textColor.primary}`}>Serviços</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#services" className={`${textColor.secondary} hover:${textColor.accent} transition-colors`}>
                  Desenvolvimento Web
                </Link>
              </li>
              <li>
                <Link href="/#services" className={`${textColor.secondary} hover:${textColor.accent} transition-colors`}>
                  Aplicativos Mobile
                </Link>
              </li>
              <li>
                <Link href="/#services" className={`${textColor.secondary} hover:${textColor.accent} transition-colors`}>
                  UX/UI Design
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`text-lg font-semibold mb-4 ${textColor.primary}`}>Empresa</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#process" className={`${textColor.secondary} hover:${textColor.accent} transition-colors`}>
                  Processo
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className={`${textColor.secondary} hover:${textColor.accent} transition-colors`}>
                  Depoimentos
                </Link>
              </li>
              <li>
                <Link href="/#faq" className={`${textColor.secondary} hover:${textColor.accent} transition-colors`}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`text-lg font-semibold mb-4 ${textColor.primary}`}>Contato</h4>
            <ul className="space-y-2">
              <li className={textColor.secondary}>
                {EMAIL_CONTACT}
              </li>
              <li className={textColor.secondary}>
                {PHONE_NUMBER}
              </li>
              <li>
                <Link href="/contato" className={`${textColor.accent} font-medium`}>
                  Solicitar orçamento
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 ${textColor.tertiary} text-sm text-center`}>
          © {new Date().getFullYear()} BytefulCode. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
} 