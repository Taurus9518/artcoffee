'use client'

import { useState, useEffect } from 'react'

export default function Cart() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
    
    const totalPrice = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    setTotal(totalPrice)
  }, [])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }

    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    const totalPrice = updatedCart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    setTotal(totalPrice)
    
    // Обновление счетчика корзины
    const badge = document.getElementById('cart-badge')
    if (badge) {
      const totalItems = updatedCart.reduce((sum: number, cartItem: any) => sum + cartItem.quantity, 0)
      badge.textContent = totalItems.toString()
      badge.style.display = totalItems > 0 ? 'flex' : 'none'
    }
  }

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    const totalPrice = updatedCart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    setTotal(totalPrice)
    
    // Обновление счетчика корзины
    const badge = document.getElementById('cart-badge')
    if (badge) {
      const totalItems = updatedCart.reduce((sum: number, cartItem: any) => sum + cartItem.quantity, 0)
      badge.textContent = totalItems.toString()
      badge.style.display = totalItems > 0 ? 'flex' : 'none'
    }
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.setItem('cart', '[]')
    setTotal(0)
    
    // Обновление счетчика корзины
    const badge = document.getElementById('cart-badge')
    if (badge) {
      badge.textContent = '0'
      badge.style.display = 'none'
    }
  }

  const checkout = () => {
    if (cartItems.length === 0) return
    
    alert(`Заказ на сумму ${total}₽ оформлен! Мы свяжемся с вами для подтверждения.`)
    clearCart()
  }

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a href="/menu" className="text-gray hover:text-coffee transition-colors">← Назад к меню</a>
            <h1 className="text-5xl font-bold text-coffee">Корзина</h1>
          </div>
        </div>

        <div className="text-center py-16">
          <div style={{ fontSize: '96px', marginBottom: '32px' }}>🛒</div>
          <h2 className="text-5xl font-bold mb-4">Корзина пуста</h2>
          <p className="text-xl text-gray mb-8">
            Добавьте товары из меню или создайте свой кофе в конструкторе
          </p>
          <div className="flex justify-center gap-4" style={{ flexWrap: 'wrap' }}>
            <a href="/menu" className="btn btn-primary">Перейти к меню</a>
            <a href="/constructor" className="btn btn-secondary">Создать кофе</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <a href="/menu" className="text-gray hover:text-coffee transition-colors">← Назад к меню</a>
          <h1 className="text-5xl font-bold text-coffee">Корзина</h1>
        </div>
        <button onClick={clearCart} className="btn btn-outline">
          Очистить корзину
        </button>
      </div>

      <div className="grid grid-2">
        {/* Cart Items */}
        <div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  {item.category === 'coffee' ? '☕' : item.category === 'dessert' ? '🍰' : '🥤'}
                </div>
                
                <div className="cart-item-content">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">{item.price}₽ за штуку</p>
                  {item.custom && (
                    <p className="text-sm text-gray-light mt-1">{item.description}</p>
                  )}
                </div>

                <div className="cart-item-quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="quantity-number">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  <div className="cart-item-total-price">{item.price * item.quantity}₽</div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                    title="Удалить из корзины"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="summary-card">
            <h2 className="summary-title">Итого</h2>
            
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <span className="text-gray">{item.name} × {item.quantity}</span>
                  <span className="font-semibold">{item.price * item.quantity}₽</span>
                </div>
              ))}
            </div>

            <div className="summary-total">
              <span>Общая сумма:</span>
              <span>{total}₽</span>
            </div>
            
            <button 
              onClick={checkout}
              className="btn btn-primary"
              style={{ width: '100%', fontSize: '18px', padding: '16px', marginTop: '24px' }}
            >
              Оформить заказ
            </button>

            <p className="text-sm text-gray text-center mt-4">
              Оплата при получении заказа
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
