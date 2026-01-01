function ItemModal({ item, onClose, onAddToCart }) {
    const handleAdd = () => {
        onAddToCart(item)
        onClose()
    }

    return (
        <>
            <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-[2.5rem] shadow-2xl animate-slide-up">
                <button
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-surface-hover/50 text-text-primary hover:bg-error hover:text-white transition-all z-10"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                        <span className="text-[10rem] filter drop-shadow-2xl animate-float">
                            {item.image}
                        </span>
                        <div className="absolute bottom-6 left-6 px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-accent border border-white/10 uppercase tracking-widest">
                            {item.category}
                        </div>
                    </div>

                    <div className="p-8 flex flex-col">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-4 text-text-primary uppercase tracking-tight leading-none">
                                {item.name}
                            </h2>
                            <p className="text-text-secondary text-sm leading-relaxed italic">
                                "{item.description}"
                            </p>
                        </div>

                        <div className="space-y-8 flex-grow">
                            {item.ingredients && (
                                <div className="animate-fade-in [animation-delay:100ms]">
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
                                        <span className="text-base grayscale opacity-50">🧾</span> Ingredients
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {item.ingredients.map((ing, i) => (
                                            <span key={i} className="px-3 py-1 bg-surface-hover/50 border border-white/5 rounded-lg text-xs font-medium text-text-secondary">
                                                {ing}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="animate-fade-in [animation-delay:200ms]">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
                                    <span className="text-base grayscale opacity-50">📊</span> Nutrition
                                </h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { label: 'Calories', val: item.calories || 0, unit: '' },
                                        { label: 'Fat', val: '0', unit: 'g' },
                                        { label: 'Protein', val: '0', unit: 'g' }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-surface-hover/30 border border-white/5 rounded-2xl p-3 text-center">
                                            <span className="block text-lg font-bold text-text-primary leading-none mb-1">
                                                {stat.val}{stat.unit}
                                            </span>
                                            <span className="block text-[9px] uppercase tracking-tighter text-text-muted">
                                                {stat.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex items-center justify-between gap-6 pt-6 border-t border-white/5 animate-fade-in [animation-delay:300ms]">
                            <div>
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">
                                    Unit Price
                                </span>
                                <span className="text-3xl font-black text-secondary">
                                    ${item.price.toFixed(2)}
                                </span>
                            </div>
                            <button
                                className="flex-grow h-14 btn-primary"
                                onClick={handleAdd}
                            >
                                <span className="text-xl">🛒</span>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemModal
