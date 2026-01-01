import useUIStore from '../stores/uiStore'
import './PromoBanner.css'

function PromoBanner() {
    const { dismissPromoBanner } = useUIStore()

    return (
        <div className="promo-banner">
            <div className="promo-content">
                <span className="promo-icon">🎉</span>
                <p>
                    <strong>Welcome Offer!</strong> Get 20% off your first order with code
                    <span className="promo-code">WELCOME20</span>
                </p>
            </div>
            <button className="promo-close" onClick={dismissPromoBanner}>
                ✕
            </button>
        </div>
    )
}

export default PromoBanner
