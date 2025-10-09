import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Art Coffee - Кофейня',
  description: 'Лучший кофе в городе. Свежие зерна, профессиональная обжарка.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-br from-coffee-50 to-coffee-100">
          {children}
        </main>
      </body>
    </html>
  )
}
