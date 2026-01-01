import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import FeaturedMenu from '../components/FeaturedMenu'
import Features from '../components/Features'
function LandingPage() {
    return (
        <div className="min-h-screen">
            <Hero />
            <Features />
            <FeaturedMenu />

            <section className="py-20 bg-surface border-t border-border">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl mb-4 font-bold">Ready to Order?</h2>
                    <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">Browse our full menu and get your favorites delivered</p>
                    <Link to="/menu" className="btn-primary inline-flex">
                        <span>View Full Menu</span>
                        <span className="ml-2">→</span>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
