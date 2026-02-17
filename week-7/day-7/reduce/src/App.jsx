import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from '../redux/action'
import './App.css';

function App() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <h1>Redux Exercise</h1>
      <div className="card">
        <p>Count: {count}</p>
        <div className="button-group">
          <button onClick={() => dispatch(decrement())}>-</button>
          <button onClick={() => dispatch(reset())}>Reset</button>
          <button onClick={() => dispatch(increment())}>+</button>
        </div>
      </div>
      <p className="hint">
        Edit <code>src/App.jsx</code> to expand this exercise!
      </p>
    </div>
  )
}

export default App
