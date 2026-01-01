import { create } from 'zustand'

import { persist } from 'zustand/middleware'

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                set((state) => {
                    const existing = state.items.find(i => i.id === item.id)
                    if (existing) {
                        return {
                            items: state.items.map(i =>
                                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                            )
                        }
                    }
                    return { items: [...state.items, { ...item, quantity: 1 }] }
                })
            },

            removeItem: (id) => {
                set((state) => ({
                    items: state.items.filter(item => item.id !== id)
                }))
            },

            updateQuantity: (id, delta) => {
                set((state) => ({
                    items: state.items.map(item => {
                        if (item.id === id) {
                            const newQty = item.quantity + delta
                            return newQty > 0 ? { ...item, quantity: newQty } : null
                        }
                        return item
                    }).filter(Boolean)
                }))
            },

            clearCart: () => set({ items: [] }),

            get total() {
                return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            },

            get itemCount() {
                return get().items.reduce((sum, item) => sum + item.quantity, 0)
            }
        }),
        {
            name: 'cafe-cart-storage'
        }
    )
)

export default useCartStore
