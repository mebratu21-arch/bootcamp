import type { Book } from '../types';
import { useBooks } from '../hooks/useBooks';
import styles from './BookItem.module.css';

interface BookItemProps {
  book: Book;
}

export default function BookItem({ book }: BookItemProps) {
  const { removeBook, toggleRead } = useBooks();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to remove "${book.title}" from your library?`)) {
      removeBook(book.id);
    }
  };

  return (
    <div className={`${styles.card} ${book.isRead ? styles.read : ''}`}>
      <div className={styles.cardHeader}>
        <span className={styles.genre}>{book.genre}</span>
        <button
          className={`${styles.statusBtn} ${book.isRead ? styles.statusRead : ''}`}
          onClick={() => toggleRead(book.id)}
          title={book.isRead ? 'Mark as unread' : 'Mark as read'}
        >
          {book.isRead ? '✓ Read' : '○ Unread'}
        </button>
      </div>
      
      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.author}>by {book.author}</p>
      
      <div className={styles.cardFooter}>
        <span className={styles.date}>Added {formatDate(book.addedAt)}</span>
        <button
          className={styles.deleteBtn}
          onClick={handleDelete}
          title="Remove book"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
