import Link from 'next/link'

export default function Cart() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/menu" className="text-gray-600 hover:text-coffee-600 transition-colors">
              ← Назад к меню
            </Link>
            <h1 className="text-3xl font-bold text-coffee-800">Корзина</h1>
          </div>
        </div>

        <div className="text-center py-16">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Корзина пуста</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Добавьте товары из меню, чтобы оформить заказ
          </p>
          <Link href="/menu" className="btn-primary text-lg px-8 py-3">
            Перейти к меню
          </Link>
        </div>

        {/* Demo Cart Items */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-coffee-800 mb-8 text-center">Пример корзины</h3>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="card">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-coffee-200 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">☕</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">Эспрессо</h3>
                      <p className="text-gray-600">150₽ за штуку</p>
                    </div>

                    <div className="text-center">
                      <span className="text-lg font-semibold">2 шт.</span>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-semibold text-coffee-600">300₽</div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-coffee-200 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">☕</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">Капучино</h3>
                      <p className="text-gray-600">200₽ за штуку</p>
                    </div>

                    <div className="text-center">
                      <span className="text-lg font-semibold">1 шт.</span>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-semibold text-coffee-600">200₽</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Итого</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Эспрессо × 2</span>
                    <span className="font-medium">300₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Капучино × 1</span>
                    <span className="font-medium">200₽</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold text-coffee-800">
                    <span>Общая сумма:</span>
                    <span>500₽</span>
                  </div>
                </div>

                <button className="w-full btn-primary text-lg py-3">
                  Оформить заказ
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Оплата при получении заказа
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
