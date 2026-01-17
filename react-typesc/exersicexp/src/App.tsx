import Greeting from './components/Greeting';
import Counter from './components/Counter';
import UserCard from './components/UserCard';
import UserList from './components/UserList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>React + TypeScript Exercises</h1>
      
      <div className="exercises-grid">
        <Greeting name="TypeScript Developer" messageCount={5} />
        
        <Counter />
        
        <div className="card user-cards-container">
          <h2>Exercise 4: User Cards (Optional Props)</h2>
          <div className="user-cards-grid">
            <UserCard name="Alice" age={28} role="Engineer" />
            <UserCard name="Bob" age={30} />
            <UserCard />
          </div>
        </div>

        <UserList />
      </div>
    </div>
  );
}

export default App;
