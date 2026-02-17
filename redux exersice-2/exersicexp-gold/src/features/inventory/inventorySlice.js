import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const inventoryAdapter = createEntityAdapter({
  selectId: (item) => item.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: inventoryAdapter.getInitialState(),
  reducers: {
    addItem: inventoryAdapter.addOne,
    removeItem: inventoryAdapter.removeOne,
    updateItem: inventoryAdapter.updateOne,
  },
})

export const { addItem, removeItem, updateItem } = inventorySlice.actions

export const {
  selectAll: selectAllInventory,
  selectById: selectInventoryById,
} = inventoryAdapter.getSelectors((state) => state.inventory)

export default inventorySlice.reducer
