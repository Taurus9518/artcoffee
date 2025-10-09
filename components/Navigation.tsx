'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Coffee } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Navigation() {
  const pathname = usePathname()
  const { cartItems } = useCart()
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

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
            <Coffee className="w-8 h-8 text-coffee-600" />
            <span className="text-xl font-bold text-coffee-800">Art Coffee</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-coffee-600 bg-coffee-50'
                    : 'text-gray-700 hover:text-coffee-600 hover:bg-coffee-50'
                }`}
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
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-coffee-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-coffee-600 bg-coffee-50'
                    : 'text-gray-700 hover:text-coffee-600 hover:bg-coffee-50'
                }`}
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
