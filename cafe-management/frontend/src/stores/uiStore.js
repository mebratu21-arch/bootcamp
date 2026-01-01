import { create } from 'zustand'

const useUIStore = create((set) => ({
    darkMode: true,
    cartOpen: false,
    mobileMenuOpen: false,
    showPromoBanner: true,

    toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    setDarkMode: (value) => set({ darkMode: value }),

    openCart: () => set({ cartOpen: true }),
    closeCart: () => set({ cartOpen: false }),
    toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),

    openMobileMenu: () => set({ mobileMenuOpen: true }),
    closeMobileMenu: () => set({ mobileMenuOpen: false }),
    toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

    dismissPromoBanner: () => set({ showPromoBanner: false })
}))

export default useUIStore
