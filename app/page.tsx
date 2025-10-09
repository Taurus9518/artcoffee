import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-coffee-800 mb-6">
            Добро пожаловать в <span className="text-coffee-600">Art Coffee</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Откройте для себя мир премиального кофе. Мы тщательно отбираем лучшие зерна 
            и готовим каждую чашку с любовью и мастерством.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu" className="btn-primary text-lg px-8 py-3">
              Посмотреть меню
            </Link>
            <Link href="/constructor" className="btn-secondary text-lg px-8 py-3">
              Создать свой кофе
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="card text-center">
            <div className="w-12 h-12 bg-coffee-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">☕</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Свежие зерна</h3>
            <p className="text-gray-600">
              Мы используем только свежеобжаренные зерна премиум качества
            </p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-coffee-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❤️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">С любовью</h3>
            <p className="text-gray-600">
              Каждая чашка готовится с особой заботой и вниманием к деталям
            </p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-coffee-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Премиум качество</h3>
            <p className="text-gray-600">
              Профессиональные бариста и лучшие рецепты для идеального вкуса
            </p>
          </div>
        </div>
      </section>

      {/* Constructor Section */}
      <section className="py-16 bg-coffee-50 rounded-2xl">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-800 mb-4">Создайте свой идеальный кофе</h2>
          <p className="text-xl text-gray-600 mb-8">
            Используйте наш конструктор кофе, чтобы создать напиток именно по вашему вкусу.
          </p>
          <Link href="/constructor" className="btn-primary text-lg px-8 py-3">
            Попробовать конструктор
          </Link>
        </div>
      </section>

      {/* Popular Items Preview */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-coffee-800 mb-4">Популярные напитки</h2>
          <p className="text-gray-600">Попробуйте наши самые любимые позиции</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="card">
            <div className="w-full h-48 bg-coffee-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-6xl">☕</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Эспрессо</h3>
            <p className="text-gray-600 mb-4">Классический итальянский кофе</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-coffee-600">150₽</span>
              <Link href="/menu" className="btn-primary">
                Заказать
              </Link>
            </div>
          </div>
          
          <div className="card">
            <div className="w-full h-48 bg-coffee-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-6xl">☕</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Капучино</h3>
            <p className="text-gray-600 mb-4">Идеальное сочетание кофе и молока</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-coffee-600">200₽</span>
              <Link href="/menu" className="btn-primary">
                Заказать
              </Link>
            </div>
          </div>
          
          <div className="card">
            <div className="w-full h-48 bg-coffee-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-6xl">☕</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Латте</h3>
            <p className="text-gray-600 mb-4">Нежный и ароматный напиток</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-coffee-600">220₽</span>
              <Link href="/menu" className="btn-primary">
                Заказать
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-coffee-800 text-white rounded-2xl">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Приходите к нам!</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="flex items-center justify-center gap-2">
              <span>🕐</span>
              <span>Пн-Вс: 7:00 - 22:00</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>📍 ул. Кофейная, 123</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>📞 +7 (999) 123-45-67</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
