import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import useUIStore from '../stores/uiStore'
import useCartStore from '../stores/cartStore'


function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const { showPromoBanner, mobileMenuOpen, toggleMobileMenu, closeMobileMenu, openCart, darkMode, toggleDarkMode } = useUIStore()
    const items = useCartStore((state) => state.items)
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        closeMobileMenu()
    }, [location, closeMobileMenu])

    const navLinks = [
        { to: '/', label: 'Home', icon: '🏠' },
        { to: '/menu', label: 'Menu', icon: '🍽️' },
        { to: '/orders', label: 'Track Order', icon: '📦' },
        { to: '/history', label: 'History', icon: '📋' },
    ]

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${scrolled ? 'bg-surface/95 backdrop-blur-md border-border shadow-sm' : 'bg-transparent'
            } ${showPromoBanner ? 'top-[44px]' : ''}`}>

            <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <span className="text-2xl animate-float">☕</span>
                    <span className="text-xl font-bold font-display bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                        Café Elegante
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className={`hidden md:flex items-center gap-2 ${mobileMenuOpen ? 'flex flex-col absolute top-[70px] left-0 right-0 bg-surface p-4 border-t border-border md:static md:flex-row md:bg-transparent md:p-0 md:border-none' : ''}`}>
                    {navLinks.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg'
                                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                }`}
                        >
                            <span className="text-base">{link.icon}</span>
                            <span>{link.label}</span>
                        </NavLink>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-surface border border-border text-lg hover:bg-surface-hover hover:border-primary/50 transition-all duration-200"
                        onClick={toggleDarkMode}
                        title={darkMode ? 'Light Mode' : 'Dark Mode'}
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>

                    <button
                        className="relative w-11 h-11 flex items-center justify-center rounded-full bg-surface border border-border text-xl hover:bg-surface-hover hover:border-primary/50 transition-all duration-200"
                        onClick={openCart}
                    >
                        <span className="text-xl">🛒</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-bold text-white bg-primary rounded-full animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 p-2"
                        onClick={toggleMobileMenu}
                    >
                        <span className={`w-full h-0.5 bg-text-primary rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-full h-0.5 bg-text-primary rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-full h-0.5 bg-text-primary rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed z-40 inset-0 top-[70px] bg-black/50 backdrop-blur-sm" onClick={closeMobileMenu}></div>
            )}
        </nav>
    )
}

export default Navbar
