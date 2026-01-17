import { useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import styles from './AddBookForm.module.css';

export default function AddBookForm() {
  const { addBook } = useBooks();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    else if (title.length < 2) newErrors.title = 'Title must be at least 2 characters';
    
    if (!author.trim()) newErrors.author = 'Author is required';
    else if (author.length < 2) newErrors.author = 'Author must be at least 2 characters';
    
    if (!genre.trim()) newErrors.genre = 'Genre is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    addBook({ title, author, genre });
    setTitle('');
    setAuthor('');
    setGenre('');
    setErrors({});
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>📚 Add New Book</h2>
      
      <div className={styles.formGroup}>
        <label htmlFor="book-title">Book Title</label>
        <input
          type="text"
          id="book-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., The Great Gatsby"
          className={errors.title ? styles.error : ''}
        />
        {errors.title && <span className={styles.errorMessage}>{errors.title}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="book-author">Author</label>
        <input
          type="text"
          id="book-author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g., F. Scott Fitzgerald"
          className={errors.author ? styles.error : ''}
        />
        {errors.author && <span className={styles.errorMessage}>{errors.author}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="book-genre">Genre</label>
        <select
          id="book-genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className={errors.genre ? styles.error : ''}
        >
          <option value="">Select a genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
          <option value="Biography">Biography</option>
          <option value="History">History</option>
          <option value="Self-Help">Self-Help</option>
          <option value="Poetry">Poetry</option>
          <option value="Other">Other</option>
        </select>
        {errors.genre && <span className={styles.errorMessage}>{errors.genre}</span>}
      </div>
      
      <button type="submit" className={styles.submitBtn}>
        + Add to Library
      </button>
    </form>
  );
}
