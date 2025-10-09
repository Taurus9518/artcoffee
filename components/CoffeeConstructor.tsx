'use client'

import { useState } from 'react'
import { Coffee, Plus, Minus, ShoppingCart, RotateCcw } from 'lucide-react'
import { useCart } from '@/context/CartContext'

interface CoffeeOption {
  id: string
  name: string
  price: number
  description?: string
}

const coffeeBases: CoffeeOption[] = [
  { id: 'espresso', name: 'Эспрессо', price: 0, description: 'Классическая основа' },
  { id: 'americano', name: 'Американо', price: 0, description: 'Эспрессо + вода' },
  { id: 'cappuccino', name: 'Капучино', price: 0, description: 'Эспрессо + молоко + пена' },
  { id: 'latte', name: 'Латте', price: 0, description: 'Эспрессо + много молока' },
  { id: 'mocha', name: 'Мокко', price: 0, description: 'Эспрессо + шоколад + молоко' },
]

const sizes: CoffeeOption[] = [
  { id: 'small', name: 'Маленький (200мл)', price: 0 },
  { id: 'medium', name: 'Средний (300мл)', price: 30 },
  { id: 'large', name: 'Большой (400мл)', price: 60 },
]

const milkTypes: CoffeeOption[] = [
  { id: 'regular', name: 'Обычное молоко', price: 0 },
  { id: 'oat', name: 'Овсяное молоко', price: 20 },
  { id: 'almond', name: 'Миндальное молоко', price: 25 },
  { id: 'coconut', name: 'Кокосовое молоко', price: 30 },
  { id: 'soy', name: 'Соевое молоко', price: 15 },
]

const syrups: CoffeeOption[] = [
  { id: 'vanilla', name: 'Ванильный сироп', price: 15 },
  { id: 'caramel', name: 'Карамельный сироп', price: 15 },
  { id: 'hazelnut', name: 'Фундучный сироп', price: 15 },
  { id: 'cinnamon', name: 'Коричный сироп', price: 15 },
  { id: 'pumpkin', name: 'Тыквенный сироп', price: 20 },
]

const toppings: CoffeeOption[] = [
  { id: 'whipped_cream', name: 'Взбитые сливки', price: 25 },
  { id: 'chocolate_chips', name: 'Шоколадная крошка', price: 20 },
  { id: 'cinnamon_powder', name: 'Корица', price: 10 },
  { id: 'cocoa_powder', name: 'Какао-порошок', price: 10 },
  { id: 'marshmallows', name: 'Зефирки', price: 30 },
]

const iceOptions: CoffeeOption[] = [
  { id: 'hot', name: 'Горячий', price: 0 },
  { id: 'iced', name: 'Со льдом', price: 0 },
  { id: 'frappe', name: 'Фраппе (взбитый со льдом)', price: 40 },
]

export default function CoffeeConstructor() {
  const { addItem } = useCart()
  const [selectedBase, setSelectedBase] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('medium')
  const [selectedMilk, setSelectedMilk] = useState<string>('regular')
  const [selectedSyrups, setSelectedSyrups] = useState<string[]>([])
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [selectedIce, setSelectedIce] = useState<string>('hot')

  const calculatePrice = () => {
    let totalPrice = 0
    
    // Базовая цена за основу
    const base = coffeeBases.find(b => b.id === selectedBase)
    if (base) totalPrice += base.price
    
    // Размер
    const size = sizes.find(s => s.id === selectedSize)
    if (size) totalPrice += size.price
    
    // Молоко
    const milk = milkTypes.find(m => m.id === selectedMilk)
    if (milk) totalPrice += milk.price
    
    // Сиропы
    selectedSyrups.forEach(syrupId => {
      const syrup = syrups.find(s => s.id === syrupId)
      if (syrup) totalPrice += syrup.price
    })
    
    // Топпинги
    selectedToppings.forEach(toppingId => {
      const topping = toppings.find(t => t.id === toppingId)
      if (topping) totalPrice += topping.price
    })
    
    // Лед
    const ice = iceOptions.find(i => i.id === selectedIce)
    if (ice) totalPrice += ice.price
    
    return totalPrice
  }

  const handleSyrupToggle = (syrupId: string) => {
    setSelectedSyrups(prev => 
      prev.includes(syrupId) 
        ? prev.filter(id => id !== syrupId)
        : [...prev, syrupId]
    )
  }

  const handleToppingToggle = (toppingId: string) => {
    setSelectedToppings(prev => 
      prev.includes(toppingId) 
        ? prev.filter(id => id !== toppingId)
        : [...prev, toppingId]
    )
  }

  const resetConstructor = () => {
    setSelectedBase('')
    setSelectedSize('medium')
    setSelectedMilk('regular')
    setSelectedSyrups([])
    setSelectedToppings([])
    setSelectedIce('hot')
  }

  const addToCart = () => {
    if (!selectedBase) {
      alert('Пожалуйста, выберите основу для кофе')
      return
    }

    const base = coffeeBases.find(b => b.id === selectedBase)
    const size = sizes.find(s => s.id === selectedSize)
    const milk = milkTypes.find(m => m.id === selectedMilk)
    const ice = iceOptions.find(i => i.id === selectedIce)
    
    const selectedSyrupNames = selectedSyrups.map(id => syrups.find(s => s.id === id)?.name).filter(Boolean)
    const selectedToppingNames = selectedToppings.map(id => toppings.find(t => t.id === id)?.name).filter(Boolean)
    
    const customName = `Кастомный ${base?.name}${size?.name !== 'Средний (300мл)' ? ` (${size?.name})` : ''}`
    
    const description = [
      `Основа: ${base?.name}`,
      `Размер: ${size?.name}`,
      `Молоко: ${milk?.name}`,
      ice?.name !== 'Горячий' ? `Температура: ${ice?.name}` : '',
      selectedSyrupNames.length > 0 ? `Сиропы: ${selectedSyrupNames.join(', ')}` : '',
      selectedToppingNames.length > 0 ? `Топпинги: ${selectedToppingNames.join(', ')}` : ''
    ].filter(Boolean).join(' | ')

    addItem({
      id: `custom-${Date.now()}`,
      name: customName,
      price: calculatePrice(),
      image: undefined
    })

    alert('Кастомный напиток добавлен в корзину!')
  }

  const totalPrice = calculatePrice()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Constructor */}
        <div className="space-y-8">
          {/* Coffee Base */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Выберите основу *</h3>
            <div className="grid grid-cols-1 gap-3">
              {coffeeBases.map((base) => (
                <label key={base.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="base"
                    value={base.id}
                    checked={selectedBase === base.id}
                    onChange={(e) => setSelectedBase(e.target.value)}
                    className="w-4 h-4 text-coffee-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{base.name}</div>
                    {base.description && (
                      <div className="text-sm text-gray-600">{base.description}</div>
                    )}
                  </div>
                  <div className="text-coffee-600 font-semibold">+{base.price}₽</div>
                </label>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Размер</h3>
            <div className="grid grid-cols-1 gap-3">
              {sizes.map((size) => (
                <label key={size.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="size"
                    value={size.id}
                    checked={selectedSize === size.id}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-4 h-4 text-coffee-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{size.name}</div>
                  </div>
                  <div className="text-coffee-600 font-semibold">+{size.price}₽</div>
                </label>
              ))}
            </div>
          </div>

          {/* Milk Type */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Тип молока</h3>
            <div className="grid grid-cols-1 gap-3">
              {milkTypes.map((milk) => (
                <label key={milk.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="milk"
                    value={milk.id}
                    checked={selectedMilk === milk.id}
                    onChange={(e) => setSelectedMilk(e.target.value)}
                    className="w-4 h-4 text-coffee-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{milk.name}</div>
                  </div>
                  <div className="text-coffee-600 font-semibold">+{milk.price}₽</div>
                </label>
              ))}
            </div>
          </div>

          {/* Syrups */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Сиропы (опционально)</h3>
            <div className="grid grid-cols-1 gap-3">
              {syrups.map((syrup) => (
                <label key={syrup.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSyrups.includes(syrup.id)}
                    onChange={() => handleSyrupToggle(syrup.id)}
                    className="w-4 h-4 text-coffee-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{syrup.name}</div>
                  </div>
                  <div className="text-coffee-600 font-semibold">+{syrup.price}₽</div>
                </label>
              ))}
            </div>
          </div>

          {/* Toppings */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Топпинги (опционально)</h3>
            <div className="grid grid-cols-1 gap-3">
              {toppings.map((topping) => (
                <label key={topping.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedToppings.includes(topping.id)}
                    onChange={() => handleToppingToggle(topping.id)}
                    className="w-4 h-4 text-coffee-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{topping.name}</div>
                  </div>
                  <div className="text-coffee-600 font-semibold">+{topping.price}₽</div>
                </label>
              ))}
            </div>
          </div>

          {/* Ice Options */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Температура</h3>
            <div className="grid grid-cols-1 gap-3">
              {iceOptions.map((ice) => (
                <label key={ice.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="ice"
                    value={ice.id}
                    checked={selectedIce === ice.id}
                    onChange={(e) => setSelectedIce(e.target.value)}
                    className="w-4 h-4 text-coffee-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{ice.name}</div>
                  </div>
                  <div className="text-coffee-600 font-semibold">+{ice.price}₽</div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-24">
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Ваш напиток</h3>
            
            {selectedBase ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Основа:</span>
                  <span>{coffeeBases.find(b => b.id === selectedBase)?.name}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Размер:</span>
                  <span>{sizes.find(s => s.id === selectedSize)?.name}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Молоко:</span>
                  <span>{milkTypes.find(m => m.id === selectedMilk)?.name}</span>
                </div>
                
                {selectedSyrups.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Сиропы:</span>
                    <span>{selectedSyrups.map(id => syrups.find(s => s.id === id)?.name).join(', ')}</span>
                  </div>
                )}
                
                {selectedToppings.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Топпинги:</span>
                    <span>{selectedToppings.map(id => toppings.find(t => t.id === id)?.name).join(', ')}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Температура:</span>
                  <span>{iceOptions.find(i => i.id === selectedIce)?.name}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-xl font-bold text-coffee-800">
                    <span>Итого:</span>
                    <span>{totalPrice}₽</span>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={addToCart}
                    disabled={!selectedBase}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Добавить в корзину
                  </button>
                  
                  <button
                    onClick={resetConstructor}
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Сбросить
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Выберите основу для начала создания напитка</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
