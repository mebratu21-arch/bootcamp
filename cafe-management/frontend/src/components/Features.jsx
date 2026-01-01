function Features() {
    const features = [
        {
            icon: '⚡',
            title: 'Fast Delivery',
            description: 'Get your order delivered in under 15 minutes'
        },
        {
            icon: '🌿',
            title: 'Fresh Ingredients',
            description: 'Locally sourced, organic ingredients daily'
        },
        {
            icon: '👨‍🍳',
            title: 'Expert Baristas',
            description: 'Award-winning coffee made by professionals'
        },
        {
            icon: '💳',
            title: 'Easy Payment',
            description: 'Multiple payment options including Apple Pay'
        }
    ]

    return (
        <section className="py-20 relative bg-surface/50 backdrop-blur-sm">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass p-8 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-3 text-text-primary">{feature.title}</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
