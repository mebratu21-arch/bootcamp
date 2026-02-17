import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from './features/ui/uiSlice'
import './App.css'
import AddProduct from './components/AddProduct'
import InventoryList from './components/InventoryList'

function App() {
  const theme = useSelector((state) => state.ui.theme)
  const dispatch = useDispatch()

  return (
    <div className={`app theme-${theme}`}>
      <header className="app-header">
        <h1>🏪 Store Inventory Management</h1>
        <div className="theme-controls">
          <button onClick={() => dispatch(setTheme('light'))}>Light</button>
          <button onClick={() => dispatch(setTheme('dark'))}>Dark</button>
          <button onClick={() => dispatch(setTheme('ninja'))}>Ninja</button>
        </div>
        <p>Manage your products with ease using Redux Toolkit</p>
      </header>
      
      <div className="app-container">
        <div className="section">
          <AddProduct />
        </div>
        
        <div className="section">
          <InventoryList />
        </div>
      </div>
    </div>
  )
}

export default App

