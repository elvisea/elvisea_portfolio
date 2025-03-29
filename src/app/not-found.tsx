import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Página não encontrada
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Desculpe, a página que você está procurando não existe.
        </p>
        <Link href="/" passHref>
          <Button className="bg-blue-600 text-white">
            Voltar para a Página Inicial
          </Button>
        </Link>
      </div>
    </div>
  )
} 