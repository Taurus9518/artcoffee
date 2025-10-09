export default function Cart() {
  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/menu" style={{ color: '#666' }}>← Назад к меню</a>
          <h1 className="text-4xl font-bold text-coffee">Корзина</h1>
        </div>
      </div>

      <div className="text-center" style={{ padding: '64px 0' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🛒</div>
        <h2 className="text-4xl font-bold mb-4">Корзина пуста</h2>
        <p className="text-xl text-gray mb-8">
          Добавьте товары из меню, чтобы оформить заказ
        </p>
        <a href="/menu" className="btn btn-primary">Перейти к меню</a>
      </div>

      {/* Demo Cart Items */}
      <div style={{ marginTop: '64px' }}>
        <h3 className="text-2xl font-bold text-coffee mb-8 text-center">Пример корзины</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
          {/* Cart Items */}
          <div>
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '64px', height: '64px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                  ☕
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 className="text-xl font-bold mb-2">Эспрессо</h3>
                  <p className="text-gray">150₽ за штуку</p>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <span className="text-xl font-bold">2 шт.</span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="text-xl font-bold text-coffee">300₽</div>
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '64px', height: '64px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                  ☕
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 className="text-xl font-bold mb-2">Капучино</h3>
                  <p className="text-gray">200₽ за штуку</p>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <span className="text-xl font-bold">1 шт.</span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="text-xl font-bold text-coffee">200₽</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="card" style={{ position: 'sticky', top: '100px' }}>
              <h2 className="text-2xl font-bold mb-4">Итого</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span className="text-gray">Эспрессо × 2</span>
                  <span style={{ fontWeight: '600' }}>300₽</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span className="text-gray">Капучино × 1</span>
                  <span style={{ fontWeight: '600' }}>200₽</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold', color: '#8B4513' }}>
                  <span>Общая сумма:</span>
                  <span>500₽</span>
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', fontSize: '18px', padding: '12px' }}>
                Оформить заказ
              </button>

              <p style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '16px' }}>
                Оплата при получении заказа
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
