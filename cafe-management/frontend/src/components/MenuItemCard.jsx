import { useState } from 'react'
function MenuItemCard({ item, onAdd, onViewDetails, delay }) {
    const [isAdding, setIsAdding] = useState(false)

    const handleAdd = (e) => {
        e.stopPropagation()
        setIsAdding(true)
        onAdd(item)
        setTimeout(() => setIsAdding(false), 600)
    }

    return (
        <div
            className="group glass rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 animate-fade-in cursor-pointer"
            style={{ animationDelay: `${delay}ms` }}
            onClick={onViewDetails}
        >
            <div className="relative h-48 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center overflow-hidden">
                <span className="text-7xl filter drop-shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {item.image}
                </span>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Details
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                        {item.category}
                    </span>
                    {item.calories && (
                        <span className="text-[10px] font-medium text-text-muted">
                            {item.calories} cal
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                <p className="text-text-secondary text-sm mb-6 line-clamp-2 leading-relaxed">{item.description}</p>

                <div className="flex items-center justify-between gap-4">
                    <span className="text-2xl font-bold text-text-primary px-3 py-1 bg-surface rounded-xl">
                        ${item.price.toFixed(2)}
                    </span>
                    <button
                        className={`relative h-11 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden ${isAdding
                                ? 'bg-success text-white'
                                : 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95'
                            }`}
                        onClick={handleAdd}
                    >
                        {isAdding ? (
                            <span className="animate-fade-in">✓ Added</span>
                        ) : (
                            <>
                                <span className="text-xl">+</span>
                                <span>Add</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MenuItemCard
