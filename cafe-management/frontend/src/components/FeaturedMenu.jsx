import { Link } from 'react-router-dom'

function FeaturedMenu() {
    const featuredItems = [
        {
            id: 1,
            name: 'Signature Latte',
            description: 'Our award-winning house blend',
            price: 5.50,
            image: '☕',
            badge: 'Bestseller'
        },
        {
            id: 2,
            name: 'Butter Croissant',
            description: 'Freshly baked, flaky & golden',
            price: 4.00,
            image: '🥐',
            badge: 'Fresh'
        },
        {
            id: 3,
            name: 'Avocado Toast',
            description: 'Sourdough with fresh avocado',
            price: 9.50,
            image: '🥑',
            badge: 'Popular'
        },
        {
            id: 4,
            name: 'Matcha Latte',
            description: 'Premium ceremonial grade matcha',
            price: 6.00,
            image: '🍵',
            badge: 'New'
        }
    ]

    return (
        <section className="py-20 bg-background">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <span className="section-tag">Popular Picks</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Customer Favorites</h2>
                    <p className="text-text-secondary text-lg">Discover what our customers love the most</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="group relative bg-surface border border-white/5 rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30 transition-all duration-300"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-accent border border-white/10">
                                {item.badge}
                            </div>

                            <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                                <span className="text-7xl filter drop-shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    {item.image}
                                </span>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                <p className="text-text-secondary text-sm mb-4 line-clamp-2">{item.description}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-2xl font-bold text-secondary">${item.price.toFixed(2)}</span>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-light text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                                        <span className="text-xl font-bold">+</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/menu" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-medium hover:gap-3 transition-all">
                        View All Menu Items
                        <span className="text-lg">→</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}
export default FeaturedMenu
