import React, { useState } from 'react'
import UserDashboard from './features/users/UserDashboard'
import InventoryManager from './features/inventory/InventoryManager'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('users')

  return (
    <div className="app">
      <header className="app-header">
        <h1>Redux Toolkit Gold Exercises</h1>
        <nav className="nav-tabs">
          <button 
            className={activeTab === 'users' ? 'active' : ''} 
            onClick={() => setActiveTab('users')}
          >
            Async Dashboard
          </button>
          <button 
            className={activeTab === 'inventory' ? 'active' : ''} 
            onClick={() => setActiveTab('inventory')}
          >
            Entity Adapter Inventory
          </button>
        </nav>
      </header>
      
      <main className="content">
        {activeTab === 'users' && <UserDashboard />}
        {activeTab === 'inventory' && <InventoryManager />}
      </main>

      <footer className="footer">
        <p>Redux persistence enabled in localStorage</p>
      </footer>
    </div>
  )
}

export default App
