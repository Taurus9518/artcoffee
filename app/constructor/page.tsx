export default function Constructor() {
  return (
    <div className="container">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-coffee mb-4">Конструктор кофе</h1>
        <p className="text-xl text-gray">Создайте свой идеальный напиток</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Constructor */}
        <div>
          <div className="card">
            <h3 className="text-2xl font-bold mb-4">Выберите основу *</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="radio" name="base" value="espresso" style={{ width: '16px', height: '16px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600' }}>Эспрессо</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Классическая основа</div>
                </div>
                <div style={{ color: '#8B4513', fontWeight: '600' }}>+0₽</div>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="radio" name="base" value="americano" style={{ width: '16px', height: '16px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600' }}>Американо</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Эспрессо + вода</div>
                </div>
                <div style={{ color: '#8B4513', fontWeight: '600' }}>+0₽</div>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="radio" name="base" value="cappuccino" style={{ width: '16px', height: '16px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600' }}>Капучино</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Эспрессо + молоко + пена</div>
                </div>
                <div style={{ color: '#8B4513', fontWeight: '600' }}>+0₽</div>
              </label>
            </div>
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold mb-4">Размер</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="radio" name="size" value="small" style={{ width: '16px', height: '16px' }} />
                <div style={{ flex: 1, fontWeight: '600' }}>Маленький (200мл)</div>
                <div style={{ color: '#8B4513', fontWeight: '600' }}>+0₽</div>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="radio" name="size" value="medium" defaultChecked style={{ width: '16px', height: '16px' }} />
                <div style={{ flex: 1, fontWeight: '600' }}>Средний (300мл)</div>
                <div style={{ color: '#8B4513', fontWeight: '600' }}>+30₽</div>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="radio" name="size" value="large" style={{ width: '16px', height: '16px' }} />
                <div style={{ flex: 1, fontWeight: '600' }}>Большой (400мл)</div>
                <div style={{ color: '#8B4513', fontWeight: '600' }}>+60₽</div>
              </label>
            </div>
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold mb-4">Тип молока</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="radio" name="milk" value="regular" defaultChecked style={{ width: '16px', height: '16px' }} />
                <div style={{ flex: 1, fontWeight: '600' }}>Обычное молоко</div>
                <div style={{ color: '#8B4513', fontWeight: '600' }}>+0₽</div>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="radio" name="milk" value="oat" style={{ width: '16px', height: '16px' }} />
                <div style={{ flex: 1, fontWeight: '600' }}>Овсяное молоко</div>
                <div style={{ color: '#8B4513', fontWeight: '600' }}>+20₽</div>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="radio" name="milk" value="almond" style={{ width: '16px', height: '16px' }} />
                <div style={{ flex: 1, fontWeight: '600' }}>Миндальное молоко</div>
                <div style={{ color: '#8B4513', fontWeight: '600' }}>+25₽</div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card" style={{ position: 'sticky', top: '100px' }}>
            <h3 className="text-2xl font-bold mb-4">Ваш напиток</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600' }}>Основа:</span>
                <span>Выберите основу</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600' }}>Размер:</span>
                <span>Средний (300мл)</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600' }}>Молоко:</span>
                <span>Обычное молоко</span>
              </div>
              
              <div style={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold', color: '#8B4513' }}>
                  <span>Итого:</span>
                  <span>30₽</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <a href="/cart" className="btn btn-primary" style={{ flex: 1, textAlign: 'center' }}>
                  Добавить в корзину
                </a>
                
                <button className="btn btn-secondary">
                  Сбросить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
