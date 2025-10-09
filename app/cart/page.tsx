'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Cart() {
  const { cartItems, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart()
  const [isOrdering, setIsOrdering] = useState(false)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleOrder = () => {
    setIsOrdering(true)
    // Имитация процесса заказа
    setTimeout(() => {
      alert('Заказ успешно оформлен! Спасибо за покупку!')
      clearCart()
      setIsOrdering(false)
    }, 2000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Корзина пуста</h1>
          <p className="text-gray-600 mb-8">
            Добавьте товары из меню, чтобы оформить заказ
          </p>
          <Link href="/menu" className="btn-primary text-lg px-8 py-3">
            Перейти к меню
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/menu" className="text-gray-600 hover:text-coffee-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-bold text-coffee-800">Корзина</h1>
          </div>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Очистить корзину
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="card">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-coffee-200 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8 text-coffee-600" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">{item.price}₽ за штуку</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="text-lg font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-semibold text-coffee-600">
                        {item.price * item.quantity}₽
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Итого</h2>
              
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      {item.price * item.quantity}₽
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-coffee-800">
                  <span>Общая сумма:</span>
                  <span>{getTotalPrice()}₽</span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                disabled={isOrdering}
                className="w-full btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOrdering ? 'Оформляем заказ...' : 'Оформить заказ'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Оплата при получении заказа
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
