export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero py-16">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-6xl font-bold mb-6 fade-in-up">
              Добро пожаловать в <span className="text-coffee-light">Art Coffee</span>
            </h1>
            <p className="text-xl mb-8 fade-in-up" style={{ maxWidth: '600px', margin: '0 auto 32px' }}>
              Откройте для себя мир премиального кофе. Мы тщательно отбираем лучшие зерна 
              и готовим каждую чашку с любовью и мастерством.
            </p>
            <div className="flex justify-center gap-6 fade-in-up" style={{ flexWrap: 'wrap' }}>
              <a href="/menu" className="btn btn-primary">Посмотреть меню</a>
              <a href="/constructor" className="btn btn-secondary">Создать свой кофе</a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-3">
            <div className="card text-center fade-in-up">
              <div style={{ fontSize: '64px', marginBottom: '24px' }} className="pulse">☕</div>
              <h3 className="text-3xl font-bold mb-4 text-coffee">Свежие зерна</h3>
              <p className="text-gray text-lg">
                Мы используем только свежеобжаренные зерна премиум качества из лучших регионов мира
              </p>
            </div>
            
            <div className="card text-center fade-in-up">
              <div style={{ fontSize: '64px', marginBottom: '24px' }} className="pulse">❤️</div>
              <h3 className="text-3xl font-bold mb-4 text-coffee">С любовью</h3>
              <p className="text-gray text-lg">
                Каждая чашка готовится с особой заботой и вниманием к деталям нашими мастерами
              </p>
            </div>
            
            <div className="card text-center fade-in-up">
              <div style={{ fontSize: '64px', marginBottom: '24px' }} className="pulse">⭐</div>
              <h3 className="text-3xl font-bold mb-4 text-coffee">Премиум качество</h3>
              <p className="text-gray text-lg">
                Профессиональные бариста и лучшие рецепты для идеального вкуса в каждой чашке
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-16 bg-coffee-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-coffee mb-4">Популярные напитки</h2>
            <p className="text-xl text-gray">Попробуйте наши самые любимые позиции</p>
          </div>
          
          <div className="grid grid-3">
            <div className="product-card fade-in-up">
              <div className="product-image">
                ☕
              </div>
              <div className="product-content">
                <h3 className="product-title">Эспрессо</h3>
                <p className="product-description">Классический итальянский кофе, крепкий и ароматный</p>
                <div className="product-price">150₽</div>
                <div className="product-actions">
                  <a href="/menu" className="btn btn-primary">Заказать</a>
                </div>
              </div>
            </div>
            
            <div className="product-card fade-in-up">
              <div className="product-image">
                ☕
              </div>
              <div className="product-content">
                <h3 className="product-title">Капучино</h3>
                <p className="product-description">Идеальное сочетание кофе и молока с воздушной пеной</p>
                <div className="product-price">200₽</div>
                <div className="product-actions">
                  <a href="/menu" className="btn btn-primary">Заказать</a>
                </div>
              </div>
            </div>
            
            <div className="product-card fade-in-up">
              <div className="product-image">
                ☕
              </div>
              <div className="product-content">
                <h3 className="product-title">Латте</h3>
                <p className="product-description">Нежный и ароматный напиток с большим количеством молока</p>
                <div className="product-price">220₽</div>
                <div className="product-actions">
                  <a href="/menu" className="btn btn-primary">Заказать</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container">
          <div className="card bg-coffee text-white text-center">
            <h2 className="text-5xl font-bold mb-6">Приходите к нам!</h2>
            <p className="text-xl mb-8">Мы ждем вас каждый день с 7:00 до 22:00</p>
            <div className="grid grid-3 mt-8">
              <div className="flex items-center justify-center gap-4">
                <span style={{ fontSize: '32px' }}>🕐</span>
                <div>
                  <div className="font-bold text-lg">Часы работы</div>
                  <div>Пн-Вс: 7:00 - 22:00</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span style={{ fontSize: '32px' }}>📍</span>
                <div>
                  <div className="font-bold text-lg">Адрес</div>
                  <div>ул. Кофейная, 123</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span style={{ fontSize: '32px' }}>📞</span>
                <div>
                  <div className="font-bold text-lg">Телефон</div>
                  <div>+7 (999) 123-45-67</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
