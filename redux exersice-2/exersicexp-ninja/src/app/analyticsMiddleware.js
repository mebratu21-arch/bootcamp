export const analyticsMiddleware = (store) => (next) => (action) => {
  if (action.type === 'inventory/updateQuantity') {
    const state = store.getState();
    const product = state.inventory.products.find(p => p.id === action.payload.id);
    const oldQty = product?.quantity;
    console.log(`[Analytics] Product ${action.payload.id} quantity changed from ${oldQty} to ${action.payload.quantity}`);
  }
  
  if (action.type === 'inventory/removeProduct') {
    console.log(`[Analytics] Product ${action.payload} was removed from inventory`);
  }

  return next(action);
};
