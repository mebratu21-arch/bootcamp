export const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  const state = store.getState()
  localStorage.setItem('redux-gold-state', JSON.stringify(state))
  return result
}

export const rehydrateState = () => {
  const serializedState = localStorage.getItem('redux-gold-state')
  if (serializedState === null) return undefined
  try {
    return JSON.parse(serializedState)
  } catch (e) {
    console.error('Could not rehydrate state', e)
    return undefined
  }
}
