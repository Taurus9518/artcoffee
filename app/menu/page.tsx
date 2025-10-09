export default function Menu() {
  const menuItems = [
    { id: 'espresso', name: 'Эспрессо', description: 'Классический итальянский кофе, крепкий и ароматный', price: 150 },
    { id: 'americano', name: 'Американо', description: 'Эспрессо с добавлением горячей воды', price: 180 },
    { id: 'cappuccino', name: 'Капучино', description: 'Эспрессо с молочной пеной и молоком', price: 200 },
    { id: 'latte', name: 'Латте', description: 'Эспрессо с большим количеством молока', price: 220 },
    { id: 'mocha', name: 'Мокко', description: 'Эспрессо с шоколадом и молоком', price: 250 },
    { id: 'macchiato', name: 'Макиато', description: 'Эспрессо с каплей молочной пены', price: 190 },
    { id: 'croissant', name: 'Круассан', description: 'Свежий французский круассан с маслом', price: 120 },
    { id: 'cheesecake', name: 'Чизкейк', description: 'Нежный чизкейк с ягодным соусом', price: 180 },
    { id: 'tiramisu', name: 'Тирамису', description: 'Классический итальянский десерт', price: 200 },
    { id: 'tea', name: 'Чай', description: 'Свежезаваренный чай на выбор', price: 100 },
    { id: 'hot_chocolate', name: 'Горячий шоколад', description: 'Густой горячий шоколад с зефиром', price: 160 },
    { id: 'smoothie', name: 'Смузи', description: 'Фруктовый смузи с ягодами', price: 180 }
  ]

  return (
    <div className="container">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-coffee mb-4">Наше меню</h1>
        <p className="text-xl text-gray">Выберите из нашего разнообразного ассортимента</p>
      </div>

      <div className="grid grid-3">
        {menuItems.map((item) => (
          <div key={item.id} className="card">
            <div style={{ height: '200px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', marginBottom: '16px' }}>
              ☕
            </div>
            
            <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
            <p className="text-gray mb-4">{item.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-2xl font-bold text-coffee">{item.price}₽</span>
              <a href="/cart" className="btn btn-primary">Добавить в корзину</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
