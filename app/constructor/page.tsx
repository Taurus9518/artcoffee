'use client'

import { useState } from 'react'

export default function Constructor() {
  const [selectedBase, setSelectedBase] = useState('espresso')
  const [selectedSize, setSelectedSize] = useState('medium')
  const [selectedMilk, setSelectedMilk] = useState('regular')
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])

  const bases = [
    { id: 'espresso', name: 'Эспрессо', description: 'Классическая основа', price: 0 },
    { id: 'americano', name: 'Американо', description: 'Эспрессо + вода', price: 0 },
    { id: 'cappuccino', name: 'Капучино', description: 'Эспрессо + молоко + пена', price: 0 }
  ]

  const sizes = [
    { id: 'small', name: 'Маленький', description: '200мл', price: 0 },
    { id: 'medium', name: 'Средний', description: '300мл', price: 30 },
    { id: 'large', name: 'Большой', description: '400мл', price: 60 }
  ]

  const milks = [
    { id: 'regular', name: 'Обычное молоко', description: 'Классическое коровье молоко', price: 0 },
    { id: 'oat', name: 'Овсяное молоко', description: 'Растительное молоко из овса', price: 20 },
    { id: 'almond', name: 'Миндальное молоко', description: 'Растительное молоко из миндаля', price: 25 },
    { id: 'coconut', name: 'Кокосовое молоко', description: 'Тропическое растительное молоко', price: 30 }
  ]

  const extras = [
    { id: 'vanilla', name: 'Ванильный сироп', description: 'Сладкий ванильный вкус', price: 15 },
    { id: 'caramel', name: 'Карамельный сироп', description: 'Классическая карамель', price: 15 },
    { id: 'chocolate', name: 'Шоколадный сироп', description: 'Богатый шоколадный вкус', price: 20 },
    { id: 'cinnamon', name: 'Корица', description: 'Теплая пряная нотка', price: 10 },
    { id: 'whipped_cream', name: 'Взбитые сливки', description: 'Воздушные сливки сверху', price: 25 }
  ]

  const calculateTotal = () => {
    const basePrice = bases.find(b => b.id === selectedBase)?.price || 0
    const sizePrice = sizes.find(s => s.id === selectedSize)?.price || 0
    const milkPrice = milks.find(m => m.id === selectedMilk)?.price || 0
    const extrasPrice = selectedExtras.reduce((sum, extraId) => {
      const extra = extras.find(e => e.id === extraId)
      return sum + (extra?.price || 0)
    }, 0)
    
    return basePrice + sizePrice + milkPrice + extrasPrice
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const customCoffee = {
      id: `custom-${Date.now()}`,
      name: 'Кастомный кофе',
      description: `${bases.find(b => b.id === selectedBase)?.name}, ${sizes.find(s => s.id === selectedSize)?.name}, ${milks.find(m => m.id === selectedMilk)?.name}${selectedExtras.length > 0 ? ` + ${selectedExtras.map(e => extras.find(ex => ex.id === e)?.name).join(', ')}` : ''}`,
      price: calculateTotal(),
      quantity: 1,
      custom: true
    }
    
    cart.push(customCoffee)
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Обновление счетчика корзины
    const badge = document.getElementById('cart-badge')
    if (badge) {
      const totalItems = cart.reduce((sum: number, cartItem: any) => sum + cartItem.quantity, 0)
      badge.textContent = totalItems.toString()
      badge.style.display = totalItems > 0 ? 'flex' : 'none'
    }
    
    alert('Кастомный кофе добавлен в корзину!')
  }

  const resetConstructor = () => {
    setSelectedBase('espresso')
    setSelectedSize('medium')
    setSelectedMilk('regular')
    setSelectedExtras([])
  }

  return (
    <div className="container">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-coffee mb-4">Конструктор кофе</h1>
        <p className="text-xl text-gray">Создайте свой идеальный напиток</p>
      </div>

      <div className="grid grid-2">
        {/* Constructor */}
        <div>
          {/* Coffee Base */}
          <div className="card mb-8">
            <h3 className="text-3xl font-bold text-coffee mb-6">Выберите основу *</h3>
            <div className="flex flex-col gap-4">
              {bases.map((base) => (
                <label
                  key={base.id}
                  className={`constructor-option ${selectedBase === base.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="base"
                    value={base.id}
                    checked={selectedBase === base.id}
                    onChange={(e) => setSelectedBase(e.target.value)}
                  />
                  <div className="option-content">
                    <div className="option-name">{base.name}</div>
                    <div className="option-description">{base.description}</div>
                  </div>
                  <div className="option-price">+{base.price}₽</div>
                </label>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="card mb-8">
            <h3 className="text-3xl font-bold text-coffee mb-6">Размер</h3>
            <div className="flex flex-col gap-4">
              {sizes.map((size) => (
                <label
                  key={size.id}
                  className={`constructor-option ${selectedSize === size.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="size"
                    value={size.id}
                    checked={selectedSize === size.id}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  />
                  <div className="option-content">
                    <div className="option-name">{size.name}</div>
                    <div className="option-description">{size.description}</div>
                  </div>
                  <div className="option-price">+{size.price}₽</div>
                </label>
              ))}
            </div>
          </div>

          {/* Milk Type */}
          <div className="card mb-8">
            <h3 className="text-3xl font-bold text-coffee mb-6">Тип молока</h3>
            <div className="flex flex-col gap-4">
              {milks.map((milk) => (
                <label
                  key={milk.id}
                  className={`constructor-option ${selectedMilk === milk.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="milk"
                    value={milk.id}
                    checked={selectedMilk === milk.id}
                    onChange={(e) => setSelectedMilk(e.target.value)}
                  />
                  <div className="option-content">
                    <div className="option-name">{milk.name}</div>
                    <div className="option-description">{milk.description}</div>
                  </div>
                  <div className="option-price">+{milk.price}₽</div>
                </label>
              ))}
            </div>
          </div>

          {/* Extras */}
          <div className="card">
            <h3 className="text-3xl font-bold text-coffee mb-6">Дополнительно</h3>
            <div className="flex flex-col gap-4">
              {extras.map((extra) => (
                <label
                  key={extra.id}
                  className={`constructor-option ${selectedExtras.includes(extra.id) ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedExtras([...selectedExtras, extra.id])
                      } else {
                        setSelectedExtras(selectedExtras.filter(id => id !== extra.id))
                      }
                    }}
                  />
                  <div className="option-content">
                    <div className="option-name">{extra.name}</div>
                    <div className="option-description">{extra.description}</div>
                  </div>
                  <div className="option-price">+{extra.price}₽</div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="summary-card">
            <h3 className="summary-title">Ваш напиток</h3>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="summary-item">
                <span className="font-semibold">Основа:</span>
                <span>{bases.find(b => b.id === selectedBase)?.name}</span>
              </div>
              
              <div className="summary-item">
                <span className="font-semibold">Размер:</span>
                <span>{sizes.find(s => s.id === selectedSize)?.name}</span>
              </div>
              
              <div className="summary-item">
                <span className="font-semibold">Молоко:</span>
                <span>{milks.find(m => m.id === selectedMilk)?.name}</span>
              </div>
              
              {selectedExtras.length > 0 && (
                <div className="summary-item">
                  <span className="font-semibold">Дополнительно:</span>
                  <span>{selectedExtras.map(e => extras.find(ex => ex.id === e)?.name).join(', ')}</span>
                </div>
              )}
            </div>

            <div className="summary-total">
              <span>Итого:</span>
              <span>{calculateTotal()}₽</span>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button onClick={addToCart} className="btn btn-primary flex-1">
                Добавить в корзину
              </button>
              
              <button onClick={resetConstructor} className="btn btn-outline">
                Сбросить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
