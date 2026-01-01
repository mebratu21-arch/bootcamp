import { create } from 'zustand'

const useOrderStore = create((set) => ({
    orders: [],
    currentOrder: null,

    addOrder: (order) => {
        set((state) => ({
            orders: [order, ...state.orders],
            currentOrder: order
        }))
    },

    setCurrentOrder: (order) => set({ currentOrder: order }),

    updateOrderStatus: (orderId, status) => {
        set((state) => ({
            orders: state.orders.map(order =>
                order.id === orderId ? { ...order, status } : order
            ),
            currentOrder: state.currentOrder?.id === orderId
                ? { ...state.currentOrder, status }
                : state.currentOrder
        }))
    },

    clearCurrentOrder: () => set({ currentOrder: null })
}))

export default useOrderStore
