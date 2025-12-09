// ==================== INTERFACE DEFINITIONS ====================

/**
 * Interface representing a Book in the library system
 */
interface Book {
    title: string;
    author: string;
    isbn: string;           // Unique identifier for each book
    publishedYear: number;
    genre?: string;         // Optional property
}

/**
 * Interface for book search criteria (optional enhancement)
 */
interface BookSearchCriteria {
    title?: string;
    author?: string;
    genre?: string;
    publishedYear?: number;
}

// ==================== BASE LIBRARY CLASS ====================

/**
 * Base Library class that manages a collection of books
 */
class Library {
    // Private property to store books
    private books: Book[] = [];
    
    // Protected property for library name (accessible in subclasses)
    protected libraryName: string;
    
    /**
     * Constructor for Library class
     * @param name - Name of the library
     */
    constructor(name: string) {
        this.libraryName = name;
    }
    
    /**
     * Add a new book to the library
     * @param book - The book to add
     * @returns Success message or error
     */
    public addBook(book: Book): string {
        // Validate the book
        if (!this.validateBook(book)) {
            return "Invalid book data. Book not added.";
        }
        
        // Check if book already exists (by ISBN)
        if (this.getBookByISBN(book.isbn)) {
            return `Book with ISBN ${book.isbn} already exists in the library.`;
        }
        
        // Add the book to the collection
        this.books.push(book);
        return `Book "${book.title}" added successfully to ${this.libraryName}.`;
    }
    
    /**
     * Get book details by ISBN
     * @param isbn - The ISBN to search for
     * @returns Book details or null if not found
     */
    public getBookDetails(isbn: string): Book | null {
        const book = this.getBookByISBN(isbn);
        if (book) {
            return { ...book }; // Return a copy to prevent direct modification
        }
        return null;
    }
    
    /**
     * Get all books in the library
     * @returns Array of all books
     */
    public getAllBooks(): Book[] {
        return [...this.books]; // Return a copy
    }
    
    /**
     * Get the total number of books in the library
     * @returns Number of books
     */
    public getTotalBooks(): number {
        return this.books.length;
    }
    
    /**
     * Search books by criteria (enhanced feature)
     * @param criteria - Search criteria
     * @returns Array of matching books
     */
    public searchBooks(criteria: BookSearchCriteria): Book[] {
        return this.books.filter(book => {
            // Check each criterion if provided
            if (criteria.title && !book.title.toLowerCase().includes(criteria.title.toLowerCase())) {
                return false;
            }
            if (criteria.author && !book.author.toLowerCase().includes(criteria.author.toLowerCase())) {
                return false;
            }
            if (criteria.genre && book.genre !== criteria.genre) {
                return false;
            }
            if (criteria.publishedYear && book.publishedYear !== criteria.publishedYear) {
                return false;
            }
            return true;
        });
    }
    
    /**
     * Remove a book by ISBN
     * @param isbn - The ISBN of the book to remove
     * @returns Success message or error
     */
    public removeBook(isbn: string): string {
        const initialLength = this.books.length;
        this.books = this.books.filter(book => book.isbn !== isbn);
        
        if (this.books.length < initialLength) {
            return `Book with ISBN ${isbn} removed successfully.`;
        } else {
            return `Book with ISBN ${isbn} not found in the library.`;
        }
    }
    
    /**
     * Get library information
     * @returns Library info string
     */
    public getLibraryInfo(): string {
        return `${this.libraryName} - Total Books: ${this.getTotalBooks()}`;
    }
    
    // ==================== PRIVATE HELPER METHODS ====================
    
    /**
     * Validate book data before adding
     * @param book - Book to validate
     * @returns True if valid, false otherwise
     */
    private validateBook(book: Book): boolean {
        if (!book.title || book.title.trim() === '') {
            console.error('Error: Book title is required');
            return false;
        }
        
        if (!book.author || book.author.trim() === '') {
            console.error('Error: Book author is required');
            return false;
        }
        
        if (!book.isbn || book.isbn.trim() === '') {
            console.error('Error: Book ISBN is required');
            return false;
        }
        
        // Validate ISBN format (basic validation)
        if (!this.validateISBN(book.isbn)) {
            console.error('Error: Invalid ISBN format');
            return false;
        }
        
        if (!book.publishedYear || book.publishedYear < 0 || book.publishedYear > new Date().getFullYear()) {
            console.error('Error: Invalid publication year');
            return false;
        }
        
        return true;
    }
    
    /**
     * Basic ISBN validation (10 or 13 digits, can include hyphens)
     * @param isbn - ISBN to validate
     * @returns True if valid format
     */
    private validateISBN(isbn: string): boolean {
        // Remove hyphens for validation
        const cleanISBN = isbn.replace(/-/g, '');
        
        // Check if it's a valid ISBN-10 or ISBN-13
        const isbn10Pattern = /^\d{9}[\dX]$/;
        const isbn13Pattern = /^\d{13}$/;
        
        return isbn10Pattern.test(cleanISBN) || isbn13Pattern.test(cleanISBN);
    }
    
    /**
     * Find a book by ISBN
     * @param isbn - ISBN to search for
     * @returns The book if found, undefined otherwise
     */
    private getBookByISBN(isbn: string): Book | undefined {
        return this.books.find(book => book.isbn === isbn);
    }
}

// ==================== DIGITAL LIBRARY CLASS ====================

/**
 * DigitalLibrary class that extends the base Library class
 * Adds digital-specific features
 */
class DigitalLibrary extends Library {
    // Readonly property for website URL
    public readonly website: string;
    
    // Private property to track digital features
    private digitalFeatures: string[];
    
    /**
     * Constructor for DigitalLibrary
     * @param name - Name of the digital library
     * @param website - Website URL (readonly)
     */
    constructor(name: string, website: string) {
        super(name);
        this.website = website;
        this.digitalFeatures = [
            'Online Access',
            'Digital Downloads',
            'E-book Lending',
            'Audiobook Streaming'
        ];
    }
    
    /**
     * List all book titles in the library
     * @returns Array of book titles
     */
    public listBooks(): string[] {
        return this.getAllBooks().map(book => book.title);
    }
    
    /**
     * List books with full details as formatted strings
     * @returns Array of formatted book details
     */
    public listBooksWithDetails(): string[] {
        return this.getAllBooks().map((book, index) => {
            const genreInfo = book.genre ? `, Genre: ${book.genre}` : '';
            return `${index + 1}. "${book.title}" by ${book.author} (${book.publishedYear})${genreInfo} - ISBN: ${book.isbn}`;
        });
    }
    
    /**
     * Get digital library information (overrides parent method)
     * @returns Enhanced library info
     */
    public getLibraryInfo(): string {
        const baseInfo = super.getLibraryInfo();
        return `${baseInfo}, Website: ${this.website}, Digital Features: ${this.digitalFeatures.length}`;
    }
    
    /**
     * Get available digital features
     * @returns Array of digital features
     */
    public getDigitalFeatures(): string[] {
        return [...this.digitalFeatures];
    }
    
    /**
     * Add a new digital feature
     * @param feature - Feature to add
     */
    public addDigitalFeature(feature: string): void {
        if (!this.digitalFeatures.includes(feature)) {
            this.digitalFeatures.push(feature);
            console.log(`Added digital feature: ${feature}`);
        }
    }
    
    /**
     * Search and display books (enhanced version)
     * @param criteria - Search criteria
     * @returns Formatted search results
     */
    public searchAndDisplayBooks(criteria: BookSearchCriteria): string {
        const results = this.searchBooks(criteria);
        
        if (results.length === 0) {
            return `No books found matching your criteria.`;
        }
        
        let output = `Found ${results.length} book(s):\n`;
        results.forEach((book, index) => {
            const genreInfo = book.genre ? `, Genre: ${book.genre}` : '';
            output += `${index + 1}. "${book.title}" by ${book.author} (${book.publishedYear})${genreInfo}\n`;
        });
        
        return output;
    }
}

// ==================== DEMONSTRATION & USAGE ====================

console.log("=== DIGITAL LIBRARY SYSTEM DEMONSTRATION ===\n");

// Create a digital library instance
const myDigitalLibrary = new DigitalLibrary(
    "City Digital Library",
    "https://www.citydigitallibrary.org"
);

console.log("1. Library Information:");
console.log(myDigitalLibrary.getLibraryInfo());
console.log(`Digital Features: ${myDigitalLibrary.getDigitalFeatures().join(', ')}`);
console.log(`Website (readonly): ${myDigitalLibrary.website}`);

// Try to modify readonly property (this will cause TypeScript error if uncommented)
// myDigitalLibrary.website = "https://new-website.org"; // Error: Cannot assign to 'website' because it is a read-only property

console.log("\n" + "=".repeat(50) + "\n");

// Create some sample books
const sampleBooks: Book[] = [
    {
        title: "The TypeScript Handbook",
        author: "Alice Johnson",
        isbn: "978-3-16-148410-0",
        publishedYear: 2023,
        genre: "Programming"
    },
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "978-0-13-235088-4",
        publishedYear: 2008,
        genre: "Software Engineering"
    },
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "978-0-7432-7356-5",
        publishedYear: 1925
        // genre is optional, so we can omit it
    },
    {
        title: "Design Patterns",
        author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
        isbn: "978-0-201-63361-0",
        publishedYear: 1994,
        genre: "Computer Science"
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "978-0-06-112008-4",
        publishedYear: 1960,
        genre: "Fiction"
    }
];

console.log("2. Adding books to the library:");
sampleBooks.forEach(book => {
    const result = myDigitalLibrary.addBook(book);
    console.log(`- ${result}`);
});

// Try to add a duplicate book (should fail)
console.log("\nTrying to add a duplicate book:");
const duplicateBook: Book = {
    title: "Duplicate Book",
    author: "Test Author",
    isbn: "978-3-16-148410-0", // Same ISBN as first book
    publishedYear: 2023
};
console.log(`- ${myDigitalLibrary.addBook(duplicateBook)}`);

// Try to add an invalid book
console.log("\nTrying to add an invalid book:");
const invalidBook: Book = {
    title: "",
    author: "Invalid Author",
    isbn: "123",
    publishedYear: 3000
};
console.log(`- ${myDigitalLibrary.addBook(invalidBook)}`);

console.log("\n" + "=".repeat(50) + "\n");

console.log("3. Getting book details by ISBN:");
const isbnToFind = "978-0-13-235088-4"; // Clean Code ISBN
const bookDetails = myDigitalLibrary.getBookDetails(isbnToFind);

if (bookDetails) {
    console.log(`Found book with ISBN ${isbnToFind}:`);
    console.log(`- Title: ${bookDetails.title}`);
    console.log(`- Author: ${bookDetails.author}`);
    console.log(`- Published Year: ${bookDetails.publishedYear}`);
    console.log(`- Genre: ${bookDetails.genre || 'Not specified'}`);
} else {
    console.log(`Book with ISBN ${isbnToFind} not found.`);
}

console.log("\n" + "=".repeat(50) + "\n");

console.log("4. Listing all book titles:");
const bookTitles = myDigitalLibrary.listBooks();
console.log(`Total books: ${bookTitles.length}`);
bookTitles.forEach((title, index) => {
    console.log(`${index + 1}. ${title}`);
});

console.log("\n" + "=".repeat(50) + "\n");

console.log("5. Listing all books with full details:");
const booksWithDetails = myDigitalLibrary.listBooksWithDetails();
booksWithDetails.forEach(details => {
    console.log(details);
});

console.log("\n" + "=".repeat(50) + "\n");

console.log("6. Searching for books:");
console.log("a) Searching for books with 'Pattern' in title:");
console.log(myDigitalLibrary.searchAndDisplayBooks({ title: "Pattern" }));

console.log("\nb) Searching for programming books:");
console.log(myDigitalLibrary.searchAndDisplayBooks({ genre: "Programming" }));

console.log("\nc) Searching for books published in 1960:");
console.log(myDigitalLibrary.searchAndDisplayBooks({ publishedYear: 1960 }));

console.log("\n" + "=".repeat(50) + "\n");

console.log("7. Removing a book:");
const isbnToRemove = "978-0-06-112008-4"; // To Kill a Mockingbird
console.log(`Before removal: ${myDigitalLibrary.getTotalBooks()} books`);
console.log(`- ${myDigitalLibrary.removeBook(isbnToRemove)}`);
console.log(`After removal: ${myDigitalLibrary.getTotalBooks()} books`);

console.log("\nTrying to remove non-existent book:");
console.log(`- ${myDigitalLibrary.removeBook("000-0-00-000000-0")}`);

console.log("\n" + "=".repeat(50) + "\n");

console.log("8. Updated library information:");
console.log(myDigitalLibrary.getLibraryInfo());
console.log(`Book titles after removal: ${myDigitalLibrary.listBooks().join(', ')}`);

console.log("\n" + "=".repeat(50) + "\n");

console.log("9. Adding a new digital feature:");
myDigitalLibrary.addDigitalFeature("Virtual Reality Reading");
console.log(`Updated digital features: ${myDigitalLibrary.getDigitalFeatures().join(', ')}`);

console.log("\n" + "=".repeat(50) + "\n");

// ==================== ADVANCED FEATURES DEMONSTRATION ====================

console.log("=== ADVANCED FEATURES DEMONSTRATION ===\n");

// Creating a specialized digital library with additional features
class EnhancedDigitalLibrary extends DigitalLibrary {
    private borrowedBooks: Map<string, string>; // ISBN -> User ID
    private userRatings: Map<string, number[]>; // ISBN -> Array of ratings
    
    constructor(name: string, website: string) {
        super(name, website);
        this.borrowedBooks = new Map();
        this.userRatings = new Map();
    }
    
    /**
     * Borrow a book
     * @param isbn - ISBN of the book to borrow
     * @param userId - User ID borrowing the book
     * @returns Success message or error
     */
    public borrowBook(isbn: string, userId: string): string {
        const book = this.getBookDetails(isbn);
        
        if (!book) {
            return `Book with ISBN ${isbn} not found.`;
        }
        
        if (this.borrowedBooks.has(isbn)) {
            return `Book "${book.title}" is already borrowed.`;
        }
        
        this.borrowedBooks.set(isbn, userId);
        return `Book "${book.title}" borrowed successfully by user ${userId}.`;
    }
    
    /**
     * Return a borrowed book
     * @param isbn - ISBN of the book to return
     * @returns Success message or error
     */
    public returnBook(isbn: string): string {
        if (!this.borrowedBooks.has(isbn)) {
            return `Book with ISBN ${isbn} is not currently borrowed.`;
        }
        
        const book = this.getBookDetails(isbn);
        this.borrowedBooks.delete(isbn);
        
        return `Book "${book?.title || 'Unknown'}" returned successfully.`;
    }
    
    /**
     * Rate a book
     * @param isbn - ISBN of the book to rate
     * @param rating - Rating from 1 to 5
     * @returns Success message or error
     */
    public rateBook(isbn: string, rating: number): string {
        if (rating < 1 || rating > 5) {
            return "Rating must be between 1 and 5.";
        }
        
        if (!this.getBookDetails(isbn)) {
            return `Book with ISBN ${isbn} not found.`;
        }
        
        if (!this.userRatings.has(isbn)) {
            this.userRatings.set(isbn, []);
        }
        
        const ratings = this.userRatings.get(isbn)!;
        ratings.push(rating);
        
        return `Rating ${rating} added for book. Average rating: ${this.getAverageRating(isbn).toFixed(1)}`;
    }
    
    /**
     * Get average rating for a book
     * @param isbn - ISBN of the book
     * @returns Average rating or 0 if no ratings
     */
    public getAverageRating(isbn: string): number {
        const ratings = this.userRatings.get(isbn);
        if (!ratings || ratings.length === 0) {
            return 0;
        }
        
        const sum = ratings.reduce((total, rating) => total + rating, 0);
        return sum / ratings.length;
    }
    
    /**
     * Get currently borrowed books
     * @returns Array of borrowed book ISBNs with user IDs
     */
    public getBorrowedBooks(): Array<{isbn: string, userId: string}> {
        return Array.from(this.borrowedBooks.entries()).map(([isbn, userId]) => ({
            isbn,
            userId
        }));
    }
}

// Demonstrate enhanced digital library
console.log("Creating Enhanced Digital Library:");
const enhancedLibrary = new EnhancedDigitalLibrary(
    "Enhanced Digital Library",
    "https://enhanced-library.org"
);

// Add a book
enhancedLibrary.addBook({
    title: "Advanced TypeScript",
    author: "John Doe",
    isbn: "978-1-56619-909-4",
    publishedYear: 2022,
    genre: "Programming"
});

console.log("\nBorrowing and rating features:");
console.log(enhancedLibrary.borrowBook("978-1-56619-909-4", "user123"));
console.log(enhancedLibrary.rateBook("978-1-56619-909-4", 5));
console.log(enhancedLibrary.rateBook("978-1-56619-909-4", 4));
console.log(`Average rating: ${enhancedLibrary.getAverageRating("978-1-56619-909-4")}`);

console.log("\nBorrowed books:");
console.log(enhancedLibrary.getBorrowedBooks());

console.log("\nReturning book:");
console.log(enhancedLibrary.returnBook("978-1-56619-909-4"));

console.log("\n" + "=".repeat(50));
console.log("=== LIBRARY SYSTEM DEMONSTRATION COMPLETE ===");