import { useBooks } from '../hooks/useBooks';
import BookItem from './BookItem';
import styles from './BookList.module.css';

export default function BookList() {
  const { books, allBooks, searchQuery, filterStatus, setSearchQuery, setFilterStatus } = useBooks();

  const stats = {
    total: allBooks.length,
    read: allBooks.filter(b => b.isRead).length,
    unread: allBooks.filter(b => !b.isRead).length
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search by title, author, or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'all' ? styles.active : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All <span className={styles.badge}>{stats.total}</span>
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'read' ? styles.active : ''}`}
            onClick={() => setFilterStatus('read')}
          >
            Read <span className={styles.badge}>{stats.read}</span>
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'unread' ? styles.active : ''}`}
            onClick={() => setFilterStatus('unread')}
          >
            Unread <span className={styles.badge}>{stats.unread}</span>
          </button>
        </div>
      </div>
      
      {books.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📖</div>
          <h3>
            {searchQuery 
              ? 'No books found' 
              : filterStatus === 'read' 
                ? 'No books marked as read yet' 
                : filterStatus === 'unread'
                  ? 'No unread books'
                  : 'Your library is empty'}
          </h3>
          <p>
            {searchQuery 
              ? 'Try a different search term' 
              : 'Add your first book to get started!'}
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {books.map(book => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
