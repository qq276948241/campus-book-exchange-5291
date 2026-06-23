import { create } from 'zustand';
import type { Book, NewBook } from '@/types';
import { mockBooks } from '@/data/mockBooks';

interface BookStore {
  books: Book[];
  searchKeyword: string;
  addBook: (book: NewBook) => void;
  getBookById: (id: string) => Book | undefined;
  setSearchKeyword: (keyword: string) => void;
  filteredBooks: Book[];
}

const STORAGE_KEY = 'campus_books';

const loadFromStorage = (): Book[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    console.error('Failed to load books from storage');
  }
  return mockBooks;
};

const saveToStorage = (books: Book[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch {
    console.error('Failed to save books to storage');
  }
};

export const useBookStore = create<BookStore>((set, get) => ({
  books: loadFromStorage(),
  searchKeyword: '',

  addBook: (newBook) => {
    const book: Book = {
      ...newBook,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const books = [book, ...get().books];
    set({ books });
    saveToStorage(books);
  },

  getBookById: (id) => {
    return get().books.find((b) => b.id === id);
  },

  setSearchKeyword: (keyword) => {
    set({ searchKeyword: keyword });
  },

  get filteredBooks() {
    const { books, searchKeyword } = get();
    if (!searchKeyword.trim()) {
      return books;
    }
    const lower = searchKeyword.toLowerCase();
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(lower)
    );
  },
}));
