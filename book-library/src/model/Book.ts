export interface Book {
    id: string;
    title: string;
    author: string;
    isRead: boolean;
    category: string;
    dateAdded: string;
}

export class BookItem implements Book {
    id: string;
    title: string;
    author: string;
    isRead: boolean;
    category: string;
    dateAdded: string;

    constructor(
        id: string,
        title: string,
        author: string,
        category: string = 'Uncategorized',
        isRead: boolean = false,
        dateAdded: string = new Date().toISOString()
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.isRead = isRead;
        this.dateAdded = dateAdded;
    }

    // Method to toggle read status (immutable - returns new instance)
    toggleRead(): BookItem {
        return new BookItem(
            this.id,
            this.title,
            this.author,
            this.category,
            !this.isRead,
            this.dateAdded
        );
    }

    // Serialization helper
    toJSON(): Book {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            isRead: this.isRead,
            category: this.category,
            dateAdded: this.dateAdded
        };
    }

    // Deserialization helper
    static fromJSON(data: Book): BookItem {
        return new BookItem(
            data.id,
            data.title,
            data.author,
            data.category,
            data.isRead,
            data.dateAdded
        );
    }
}
