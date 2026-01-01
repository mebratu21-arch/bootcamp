import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PromoBanner from '../components/PromoBanner'
import FloatingCart from '../components/FloatingCart'
import CartDrawer from '../components/CartDrawer'
import HelpButton from '../components/HelpButton'
import useUIStore from '../stores/uiStore'
function MainLayout() {
    const { showPromoBanner, darkMode } = useUIStore()

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? '' : 'light'}`}>
            {showPromoBanner && <PromoBanner />}
            <Navbar />
            <main className={`pt-[70px] ${showPromoBanner ? 'pt-[114px]' : ''}`}>
                <Outlet />
            </main>
            <Footer />
            <FloatingCart />
            <CartDrawer />
            <HelpButton />
        </div>
    )
}

export default MainLayout
