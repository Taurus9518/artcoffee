import Link from 'next/link'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
}

const menuItems: MenuItem[] = [
  // Кофе
  {
    id: 'espresso',
    name: 'Эспрессо',
    description: 'Классический итальянский кофе, крепкий и ароматный',
    price: 150,
    category: 'coffee'
  },
  {
    id: 'americano',
    name: 'Американо',
    description: 'Эспрессо с добавлением горячей воды',
    price: 180,
    category: 'coffee'
  },
  {
    id: 'cappuccino',
    name: 'Капучино',
    description: 'Эспрессо с молочной пеной и молоком',
    price: 200,
    category: 'coffee'
  },
  {
    id: 'latte',
    name: 'Латте',
    description: 'Эспрессо с большим количеством молока',
    price: 220,
    category: 'coffee'
  },
  {
    id: 'mocha',
    name: 'Мокко',
    description: 'Эспрессо с шоколадом и молоком',
    price: 250,
    category: 'coffee'
  },
  {
    id: 'macchiato',
    name: 'Макиато',
    description: 'Эспрессо с каплей молочной пены',
    price: 190,
    category: 'coffee'
  },
  // Десерты
  {
    id: 'croissant',
    name: 'Круассан',
    description: 'Свежий французский круассан с маслом',
    price: 120,
    category: 'dessert'
  },
  {
    id: 'cheesecake',
    name: 'Чизкейк',
    description: 'Нежный чизкейк с ягодным соусом',
    price: 180,
    category: 'dessert'
  },
  {
    id: 'tiramisu',
    name: 'Тирамису',
    description: 'Классический итальянский десерт',
    price: 200,
    category: 'dessert'
  },
  // Напитки
  {
    id: 'tea',
    name: 'Чай',
    description: 'Свежезаваренный чай на выбор',
    price: 100,
    category: 'drinks'
  },
  {
    id: 'hot_chocolate',
    name: 'Горячий шоколад',
    description: 'Густой горячий шоколад с зефиром',
    price: 160,
    category: 'drinks'
  },
  {
    id: 'smoothie',
    name: 'Смузи',
    description: 'Фруктовый смузи с ягодами',
    price: 180,
    category: 'drinks'
  }
]

export default function Menu() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-coffee-800 mb-4">Наше меню</h1>
        <p className="text-xl text-gray-600">Выберите из нашего разнообразного ассортимента</p>
      </div>

      {/* Menu Items */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {menuItems.map((item) => (
          <div key={item.id} className="card hover:shadow-xl transition-shadow duration-300">
            <div className="w-full h-48 bg-coffee-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-6xl">☕</span>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <div className="text-2xl font-bold text-coffee-600">{item.price}₽</div>
            </div>

            <Link href="/cart" className="w-full btn-primary text-center block">
              Добавить в корзину
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
