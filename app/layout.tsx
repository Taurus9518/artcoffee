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
        <nav className="nav">
          <div className="container">
            <div className="nav-content">
              <a href="/" className="logo">
                ☕ Art Coffee
              </a>
              <div className="nav-links">
                <a href="/" className="nav-link">Главная</a>
                <a href="/menu" className="nav-link">Меню</a>
                <a href="/constructor" className="nav-link">Конструктор</a>
                <a href="/cart" className="cart-btn">
                  🛒
                  <span className="cart-badge" id="cart-badge" style={{ display: 'none' }}>0</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
