import Link from 'next/link'

export default function Navigation() {
  const navItems = [
    { href: '/', label: 'Главная' },
    { href: '/menu', label: 'Меню' },
    { href: '/constructor', label: 'Конструктор' },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">☕</span>
            <span className="text-xl font-bold text-coffee-800">Art Coffee</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:text-coffee-600 hover:bg-coffee-50"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="relative p-2 text-gray-700 hover:text-coffee-600 transition-colors"
          >
            <span className="text-2xl">🛒</span>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:text-coffee-600 hover:bg-coffee-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
