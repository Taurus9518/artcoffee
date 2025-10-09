export default function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold text-coffee mb-4">
          Добро пожаловать в <span style={{ color: '#8B4513' }}>Art Coffee</span>
        </h1>
        <p className="text-xl text-gray mb-8" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Откройте для себя мир премиального кофе. Мы тщательно отбираем лучшие зерна 
          и готовим каждую чашку с любовью и мастерством.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/menu" className="btn btn-primary">Посмотреть меню</a>
          <a href="/constructor" className="btn btn-secondary">Создать свой кофе</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="grid grid-3">
          <div className="card text-center">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>☕</div>
            <h3 className="text-2xl font-bold mb-4">Свежие зерна</h3>
            <p className="text-gray">
              Мы используем только свежеобжаренные зерна премиум качества
            </p>
          </div>
          
          <div className="card text-center">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>❤️</div>
            <h3 className="text-2xl font-bold mb-4">С любовью</h3>
            <p className="text-gray">
              Каждая чашка готовится с особой заботой и вниманием к деталям
            </p>
          </div>
          
          <div className="card text-center">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⭐</div>
            <h3 className="text-2xl font-bold mb-4">Премиум качество</h3>
            <p className="text-gray">
              Профессиональные бариста и лучшие рецепты для идеального вкуса
            </p>
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-coffee mb-4">Популярные напитки</h2>
          <p className="text-gray">Попробуйте наши самые любимые позиции</p>
        </div>
        
        <div className="grid grid-3">
          <div className="card">
            <div style={{ height: '200px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', marginBottom: '16px' }}>
              ☕
            </div>
            <h3 className="text-2xl font-bold mb-2">Эспрессо</h3>
            <p className="text-gray mb-4">Классический итальянский кофе</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-2xl font-bold text-coffee">150₽</span>
              <a href="/menu" className="btn btn-primary">Заказать</a>
            </div>
          </div>
          
          <div className="card">
            <div style={{ height: '200px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', marginBottom: '16px' }}>
              ☕
            </div>
            <h3 className="text-2xl font-bold mb-2">Капучино</h3>
            <p className="text-gray mb-4">Идеальное сочетание кофе и молока</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-2xl font-bold text-coffee">200₽</span>
              <a href="/menu" className="btn btn-primary">Заказать</a>
            </div>
          </div>
          
          <div className="card">
            <div style={{ height: '200px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', marginBottom: '16px' }}>
              ☕
            </div>
            <h3 className="text-2xl font-bold mb-2">Латте</h3>
            <p className="text-gray mb-4">Нежный и ароматный напиток</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-2xl font-bold text-coffee">220₽</span>
              <a href="/menu" className="btn btn-primary">Заказать</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16" style={{ background: '#8B4513', color: 'white', borderRadius: '16px', margin: '32px 0' }}>
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Приходите к нам!</h2>
          <div className="grid grid-3" style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span>🕐</span>
              <span>Пн-Вс: 7:00 - 22:00</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span>📍</span>
              <span>ул. Кофейная, 123</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span>📞</span>
              <span>+7 (999) 123-45-67</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
