import { create } from 'zustand';
import type { Book, NewBook, SortType, ConditionFilter } from '@/types';
import { mockBooks } from '@/data/mockBooks';

interface BookStore {
  books: Book[];
  searchKeyword: string;
  conditionFilter: ConditionFilter;
  sortType: SortType;
  addBook: (book: NewBook) => void;
  getBookById: (id: string) => Book | undefined;
  setSearchKeyword: (keyword: string) => void;
  setConditionFilter: (condition: ConditionFilter) => void;
  setSortType: (sort: SortType) => void;
}

const STORAGE_KEY = 'campus_books';

const loadFromStorage = (): Book[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
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
  conditionFilter: 'all',
  sortType: 'latest',

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

  getBookById: (id) => get().books.find((b) => b.id === id),

  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  setConditionFilter: (condition) => set({ conditionFilter: condition }),
  setSortType: (sort) => set({ sortType: sort }),
}));
