import { Link } from 'react-router-dom'


function Footer() {
    return (
        <footer className="bg-surface border-t border-border mt-auto">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl animate-float">☕</span>
                            <h3 className="text-xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Café Elegante
                            </h3>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed mb-6">
                            Crafting exceptional coffee experiences since 2020. Every cup tells a story.
                        </p>
                        <div className="flex gap-3">
                            {['📘', '📸', '🐦'].map((icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-background border border-border hover:bg-surface-hover hover:border-primary/50 transition-all text-sm">
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-text-primary">Menu</h4>
                        <ul className="space-y-2">
                            {[
                                { to: '/menu', label: 'All Items' },
                                { to: '/menu?category=coffee', label: 'Coffee' },
                                { to: '/menu?category=pastries', label: 'Pastries' },
                                { to: '/menu?category=food', label: 'Food' },
                            ].map(link => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-text-secondary hover:text-primary text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-text-primary">Orders</h4>
                        <ul className="space-y-2">
                            {[
                                { to: '/orders', label: 'Track Order' },
                                { to: '/history', label: 'Order History' },
                                { to: '/checkout', label: 'Checkout' },
                            ].map(link => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-text-secondary hover:text-primary text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-text-primary">Contact</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/contact" className="text-text-secondary hover:text-primary text-sm transition-colors flex items-center gap-2">
                                    <span>📝</span> Contact Form
                                </Link>
                            </li>
                            <li>
                                <a href="tel:+1234567890" className="text-text-secondary hover:text-primary text-sm transition-colors flex items-center gap-2">
                                    <span>📞</span> (123) 456-7890
                                </a>
                            </li>
                            <li>
                                <a href="mailto:hello@cafe.com" className="text-text-secondary hover:text-primary text-sm transition-colors flex items-center gap-2">
                                    <span>✉️</span> hello@cafe.com
                                </a>
                            </li>
                            <li>
                                <span className="text-text-secondary text-sm flex items-center gap-2">
                                    <span>📍</span> 123 Coffee Street
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-text-secondary text-sm">
                        &copy; 2024 Café Elegante. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link to="/contact" className="text-text-secondary hover:text-primary text-sm transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/contact" className="text-text-secondary hover:text-primary text-sm transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
