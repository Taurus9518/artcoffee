import Link from 'next/link'

export default function ConstructorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-coffee-800 mb-4">Конструктор кофе</h1>
        <p className="text-xl text-gray-600">Создайте свой идеальный напиток</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Constructor */}
          <div className="space-y-8">
            {/* Coffee Base */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Выберите основу *</h3>
              <div className="grid grid-cols-1 gap-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" name="base" value="espresso" className="w-4 h-4 text-coffee-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Эспрессо</div>
                    <div className="text-sm text-gray-600">Классическая основа</div>
                  </div>
                  <div className="text-coffee-600 font-semibold">+0₽</div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" name="base" value="americano" className="w-4 h-4 text-coffee-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Американо</div>
                    <div className="text-sm text-gray-600">Эспрессо + вода</div>
                  </div>
                  <div className="text-coffee-600 font-semibold">+0₽</div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" name="base" value="cappuccino" className="w-4 h-4 text-coffee-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Капучино</div>
                    <div className="text-sm text-gray-600">Эспрессо + молоко + пена</div>
                  </div>
                  <div className="text-coffee-600 font-semibold">+0₽</div>
                </label>
              </div>
            </div>

            {/* Size */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Размер</h3>
              <div className="grid grid-cols-1 gap-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" name="size" value="small" className="w-4 h-4 text-coffee-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Маленький (200мл)</div>
                  </div>
                  <div className="text-coffee-600 font-semibold">+0₽</div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" name="size" value="medium" defaultChecked className="w-4 h-4 text-coffee-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Средний (300мл)</div>
                  </div>
                  <div className="text-coffee-600 font-semibold">+30₽</div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" name="size" value="large" className="w-4 h-4 text-coffee-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Большой (400мл)</div>
                  </div>
                  <div className="text-coffee-600 font-semibold">+60₽</div>
                </label>
              </div>
            </div>

            {/* Milk Type */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Тип молока</h3>
              <div className="grid grid-cols-1 gap-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" name="milk" value="regular" defaultChecked className="w-4 h-4 text-coffee-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Обычное молоко</div>
                  </div>
                  <div className="text-coffee-600 font-semibold">+0₽</div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" name="milk" value="oat" className="w-4 h-4 text-coffee-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Овсяное молоко</div>
                  </div>
                  <div className="text-coffee-600 font-semibold">+20₽</div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" name="milk" value="almond" className="w-4 h-4 text-coffee-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Миндальное молоко</div>
                  </div>
                  <div className="text-coffee-600 font-semibold">+25₽</div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Ваш напиток</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Основа:</span>
                  <span>Выберите основу</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Размер:</span>
                  <span>Средний (300мл)</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Молоко:</span>
                  <span>Обычное молоко</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-xl font-bold text-coffee-800">
                    <span>Итого:</span>
                    <span>30₽</span>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Link href="/cart" className="flex-1 btn-primary text-center">
                    Добавить в корзину
                  </Link>
                  
                  <button className="btn-secondary">
                    Сбросить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
