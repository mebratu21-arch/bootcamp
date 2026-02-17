import AgeDisplay from './features/age/AgeDisplay'
import AgeControls from './features/age/AgeControls'

function App() {
  return (
    <div className="App">
      <div className="card-container">
        <h1>Age Tracker</h1>
        <AgeDisplay />
        <AgeControls />
      </div>
    </div>
  )
}

export default App
