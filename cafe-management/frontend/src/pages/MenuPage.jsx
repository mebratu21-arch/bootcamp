import { useState, useEffect } from 'react'
import useCartStore from '../stores/cartStore'
import MenuItemCard from '../components/MenuItemCard'
import ItemModal from '../components/ItemModal'
function MenuPage() {
    const [menuItems, setMenuItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)
    const addItem = useCartStore((state) => state.addItem)

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/menu')
                const data = await response.json()
                if (Array.isArray(data)) {
                    setMenuItems(data)
                } else {
                    setMenuItems(getDemoMenuItems())
                }
            } catch (_) {
                console.log('Using demo menu items')
                setMenuItems(getDemoMenuItems())
            } finally {
                setLoading(false)
            }
        }
        fetchMenu()
    }, [])

    const getDemoMenuItems = () => [
        { id: 1, name: 'Espresso', description: 'Rich and bold single shot of premium coffee', price: 3.50, category: 'Coffee', image: '☕', ingredients: ['Arabica beans', 'Water'], calories: 5 },
        { id: 2, name: 'Cappuccino', description: 'Espresso with steamed milk and velvety foam', price: 4.50, category: 'Coffee', image: '☕', ingredients: ['Espresso', 'Steamed milk', 'Foam'], calories: 120 },
        { id: 3, name: 'Caramel Latte', description: 'Smooth espresso with caramel and creamy milk', price: 5.50, category: 'Coffee', image: '☕', ingredients: ['Espresso', 'Milk', 'Caramel syrup'], calories: 250 },
        { id: 4, name: 'Mocha', description: 'Rich chocolate meets bold espresso', price: 5.00, category: 'Coffee', image: '☕', ingredients: ['Espresso', 'Chocolate', 'Milk', 'Whipped cream'], calories: 290 },
        { id: 5, name: 'Americano', description: 'Espresso diluted with hot water for a smooth finish', price: 3.00, category: 'Coffee', image: '☕', ingredients: ['Espresso', 'Hot water'], calories: 10 },
        { id: 6, name: 'Matcha Latte', description: 'Premium ceremonial grade matcha with oat milk', price: 6.00, category: 'Coffee', image: '🍵', ingredients: ['Matcha powder', 'Oat milk', 'Honey'], calories: 180 },
        { id: 7, name: 'Butter Croissant', description: 'Flaky, golden French pastry baked fresh daily', price: 4.00, category: 'Pastries', image: '🥐', ingredients: ['Flour', 'Butter', 'Eggs'], calories: 320 },
        { id: 8, name: 'Chocolate Muffin', description: 'Rich double chocolate chip muffin', price: 3.50, category: 'Pastries', image: '🧁', ingredients: ['Flour', 'Chocolate', 'Eggs', 'Butter'], calories: 410 },
        { id: 9, name: 'Cinnamon Roll', description: 'Warm cinnamon swirl with cream cheese frosting', price: 4.50, category: 'Pastries', image: '🍥', ingredients: ['Flour', 'Cinnamon', 'Cream cheese'], calories: 380 },
        { id: 10, name: 'Blueberry Scone', description: 'Buttery scone packed with fresh blueberries', price: 3.75, category: 'Pastries', image: '🫐', ingredients: ['Flour', 'Butter', 'Blueberries'], calories: 290 },
        { id: 11, name: 'Avocado Toast', description: 'Sourdough with smashed avocado and poached egg', price: 9.50, category: 'Food', image: '🥑', ingredients: ['Sourdough', 'Avocado', 'Egg', 'Chili flakes'], calories: 380 },
        { id: 12, name: 'Caesar Salad', description: 'Crisp romaine with parmesan and house dressing', price: 10.50, category: 'Food', image: '🥗', ingredients: ['Romaine', 'Parmesan', 'Croutons', 'Caesar dressing'], calories: 320 },
        { id: 13, name: 'Club Sandwich', description: 'Triple-decker with turkey, bacon, and avocado', price: 12.00, category: 'Food', image: '🥪', ingredients: ['Turkey', 'Bacon', 'Avocado', 'Lettuce', 'Tomato'], calories: 520 },
        { id: 14, name: 'Açaí Bowl', description: 'Blended açaí topped with granola and fresh fruits', price: 11.00, category: 'Food', image: '🍇', ingredients: ['Açaí', 'Banana', 'Granola', 'Honey'], calories: 440 },
        { id: 15, name: 'Iced Tea', description: 'House-brewed black tea over ice with lemon', price: 3.00, category: 'Drinks', image: '🧊', ingredients: ['Black tea', 'Ice', 'Lemon'], calories: 0 },
        { id: 16, name: 'Fresh Orange Juice', description: 'Freshly squeezed Florida oranges', price: 5.00, category: 'Drinks', image: '🍊', ingredients: ['Fresh oranges'], calories: 110 },
        { id: 17, name: 'Strawberry Smoothie', description: 'Blended strawberries with yogurt and honey', price: 6.50, category: 'Drinks', image: '🍓', ingredients: ['Strawberries', 'Yogurt', 'Honey', 'Ice'], calories: 220 },
        { id: 18, name: 'Sparkling Water', description: 'Premium Italian sparkling mineral water', price: 2.50, category: 'Drinks', image: '💧', ingredients: ['Sparkling water'], calories: 0 },
    ]

    const categories = ['All', ...new Set(menuItems.map(item => item.category))]

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const handleAddToCart = (item) => {
        addItem(item)
    }

    if (loading) {
        return (
            <div className="min-h-screen container-custom pt-10 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-text-secondary animate-pulse">Loading delicious items...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen pb-20">
            <div className="container-custom pt-12 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="max-w-2xl">
                        <span className="section-tag">Our Selection</span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Menu</h1>
                        <p className="text-text-secondary text-lg">Discover our carefully crafted selection of coffee, pastries, and more</p>
                    </div>

                    <div className="relative w-full md:w-80 group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">🔍</span>
                        <input
                            type="text"
                            placeholder="Search menu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field pl-12 h-14"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-12">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${activeCategory === category
                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25'
                                : 'bg-surface border-border text-text-secondary hover:border-primary/50 hover:text-text-primary'
                                }`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                            {activeCategory === category && (
                                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] bg-white/20 rounded-full">
                                    {category === 'All' ? menuItems.length : menuItems.filter(i => i.category === category).length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item, index) => (
                        <MenuItemCard
                            key={item.id}
                            item={item}
                            onAdd={handleAddToCart}
                            onViewDetails={() => setSelectedItem(item)}
                            delay={index * 50}
                        />
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                        <div className="text-6xl mb-6 grayscale opacity-50">🔍</div>
                        <h3 className="text-xl font-bold mb-2">No items found</h3>
                        <p className="text-text-secondary">Try adjusting your search or filter</p>
                    </div>
                )}
            </div>

            {selectedItem && (
                <ItemModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    )
}

export default MenuPage
