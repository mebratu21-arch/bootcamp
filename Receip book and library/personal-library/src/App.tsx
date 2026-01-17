import './App.css';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';

function App() {
  return (
    <>
      <header className="header">
        <h1>📚 Personal Library</h1>
        <p>Your digital book collection powered by React & Redux</p>
      </header>
      
      <AddBookForm />
      <BookList />
    </>
  );
}

export default App;
