import { Link } from 'react-router-dom'
function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background opacity-90"></div>
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>

            <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-border backdrop-blur-sm mb-8 animate-fade-in">
                        <span className="text-lg">✨</span>
                        <span className="text-sm font-semibold text-accent uppercase tracking-wider">Premium Coffee Experience</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in [animation-delay:200ms]">
                        Crafted with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Passion</span>,<br />
                        Served with <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Love</span>
                    </h1>

                    <p className="text-xl text-text-secondary leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 animate-fade-in [animation-delay:400ms]">
                        Experience the finest artisan coffee and freshly baked pastries
                        in a cozy atmosphere. Order now for pickup or delivery.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16 animate-fade-in [animation-delay:600ms]">
                        <Link to="/menu" className="btn-primary w-full sm:w-auto">
                            <span>🍽️</span>
                            Browse Menu
                        </Link>
                        <Link to="/orders" className="btn-secondary w-full sm:w-auto">
                            <span>📦</span>
                            Track Order
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8 animate-fade-in [animation-delay:800ms]">
                        <div className="text-center lg:text-left">
                            <span className="block text-2xl font-bold text-white mb-1">50+</span>
                            <span className="text-sm text-text-muted uppercase tracking-wider">Menu Items</span>
                        </div>
                        <div className="text-center lg:text-left border-l border-white/10 pl-8">
                            <span className="block text-2xl font-bold text-white mb-1">4.9</span>
                            <span className="text-sm text-text-muted uppercase tracking-wider">Rating ⭐</span>
                        </div>
                        <div className="text-center lg:text-left border-l border-white/10 pl-8">
                            <span className="block text-2xl font-bold text-white mb-1">15min</span>
                            <span className="text-sm text-text-muted uppercase tracking-wider">Avg Delivery</span>
                        </div>
                    </div>
                </div>

                <div className="relative hidden lg:block">
                    <div className="relative w-[500px] h-[500px] mx-auto animate-float">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
                        <div className="relative z-10 text-[20rem] flex items-center justify-center filter drop-shadow-2xl transform rotate-12 transition-transform hover:rotate-6 duration-500">
                            ☕
                        </div>

                        {/* Floating elements */}
                        <div className="absolute top-0 right-0 text-6xl animate-bounce [animation-delay:1s] filter drop-shadow-lg">🥐</div>
                        <div className="absolute bottom-20 left-0 text-5xl animate-bounce [animation-delay:2s] filter drop-shadow-lg">🧁</div>
                        <div className="absolute top-1/2 -right-12 text-5xl animate-bounce [animation-delay:1.5s] filter drop-shadow-lg">🍩</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
