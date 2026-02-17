export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isRead: boolean;
  addedAt: number;
}

export interface BooksState {
  books: Book[];
  searchQuery: string;
  filterStatus: 'all' | 'read' | 'unread';
}
