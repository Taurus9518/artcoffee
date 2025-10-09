'use client'

export default function Menu() {
  const menuItems = [
    { id: 'espresso', name: 'Эспрессо', description: 'Классический итальянский кофе, крепкий и ароматный', price: 150, category: 'coffee' },
    { id: 'americano', name: 'Американо', description: 'Эспрессо с добавлением горячей воды', price: 180, category: 'coffee' },
    { id: 'cappuccino', name: 'Капучино', description: 'Эспрессо с молочной пеной и молоком', price: 200, category: 'coffee' },
    { id: 'latte', name: 'Латте', description: 'Эспрессо с большим количеством молока', price: 220, category: 'coffee' },
    { id: 'mocha', name: 'Мокко', description: 'Эспрессо с шоколадом и молоком', price: 250, category: 'coffee' },
    { id: 'macchiato', name: 'Макиато', description: 'Эспрессо с каплей молочной пены', price: 190, category: 'coffee' },
    { id: 'croissant', name: 'Круассан', description: 'Свежий французский круассан с маслом', price: 120, category: 'dessert' },
    { id: 'cheesecake', name: 'Чизкейк', description: 'Нежный чизкейк с ягодным соусом', price: 180, category: 'dessert' },
    { id: 'tiramisu', name: 'Тирамису', description: 'Классический итальянский десерт', price: 200, category: 'dessert' },
    { id: 'tea', name: 'Чай', description: 'Свежезаваренный чай на выбор', price: 100, category: 'drinks' },
    { id: 'hot_chocolate', name: 'Горячий шоколад', description: 'Густой горячий шоколад с зефиром', price: 160, category: 'drinks' },
    { id: 'smoothie', name: 'Смузи', description: 'Фруктовый смузи с ягодами', price: 180, category: 'drinks' }
  ]

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'coffee', name: 'Кофе' },
    { id: 'dessert', name: 'Десерты' },
    { id: 'drinks', name: 'Напитки' }
  ]

  return (
    <div className="container">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-coffee mb-4">Наше меню</h1>
        <p className="text-xl text-gray">Выберите из нашего разнообразного ассортимента</p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-12" style={{ flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`btn ${category.id === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              // Простая фильтрация без JavaScript
              const items = document.querySelectorAll('.menu-item');
              items.forEach((item: any) => {
                if (category.id === 'all' || item.dataset.category === category.id) {
                  item.style.display = 'block';
                } else {
                  item.style.display = 'none';
                }
              });
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-3">
        {menuItems.map((item) => (
          <div key={item.id} className="product-card menu-item fade-in-up" data-category={item.category}>
            <div className="product-image">
              {item.category === 'coffee' ? '☕' : item.category === 'dessert' ? '🍰' : '🥤'}
            </div>
            <div className="product-content">
              <h3 className="product-title">{item.name}</h3>
              <p className="product-description">{item.description}</p>
              <div className="product-price">{item.price}₽</div>
              <div className="product-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    // Добавление в корзину
                    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                    const existingItem = cart.find((cartItem: any) => cartItem.id === item.id);
                    
                    if (existingItem) {
                      existingItem.quantity += 1;
                    } else {
                      cart.push({ ...item, quantity: 1 });
                    }
                    
                    localStorage.setItem('cart', JSON.stringify(cart));
                    
                    // Обновление счетчика корзины
                    const badge = document.getElementById('cart-badge');
                    if (badge) {
                      const totalItems = cart.reduce((sum: number, cartItem: any) => sum + cartItem.quantity, 0);
                      badge.textContent = totalItems.toString();
                      badge.style.display = totalItems > 0 ? 'flex' : 'none';
                    }
                    
                    // Анимация добавления
                    const button = (event as any).target as HTMLElement;
                    button.textContent = 'Добавлено!';
                    button.style.background = '#10b981';
                    setTimeout(() => {
                      button.textContent = 'Добавить в корзину';
                      button.style.background = '';
                    }, 1000);
                  }}
                >
                  Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
