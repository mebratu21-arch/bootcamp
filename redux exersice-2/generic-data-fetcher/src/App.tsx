import DataFetcher from './components/DataFetcher';
import './App.css';

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🚀 Generic Data Fetcher</h1>
        <p>Powered by React, Redux Toolkit & TypeScript</p>
      </header>
      
      <main className="container">
        <DataFetcher<User[]>
          url="https://jsonplaceholder.typicode.com/users"
          render={(users) => (
            <div className="user-grid">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
              ))}
            </div>
          )}
        />
      </main>
    </div>
  );
}

export default App;
