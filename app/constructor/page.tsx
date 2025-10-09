import CoffeeConstructor from '@/components/CoffeeConstructor'

export default function ConstructorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-coffee-800 mb-4">Конструктор кофе</h1>
        <p className="text-xl text-gray-600">Создайте свой идеальный напиток</p>
      </div>

      <CoffeeConstructor />
    </div>
  )
}
