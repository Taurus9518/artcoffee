import type { Metadata } from 'next'
import './globals.css'

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
      <body>
        <nav style={{ background: 'white', padding: '16px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: 'bold', color: '#8B4513' }}>
                ☕ Art Coffee
              </a>
              <div style={{ display: 'flex', gap: '24px' }}>
                <a href="/" style={{ padding: '8px 16px', borderRadius: '6px', color: '#333' }}>Главная</a>
                <a href="/menu" style={{ padding: '8px 16px', borderRadius: '6px', color: '#333' }}>Меню</a>
                <a href="/cart" style={{ padding: '8px 16px', borderRadius: '6px', color: '#333' }}>🛒</a>
              </div>
            </div>
          </div>
        </nav>
        <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
