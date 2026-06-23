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

const conditionOrder: Record<string, number> = {
  '全新': 5,
  '九成新': 4,
  '八成新': 3,
  '七成新': 2,
  '六成新及以下': 1,
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

  getBookById: (id) => {
    return get().books.find((b) => b.id === id);
  },

  setSearchKeyword: (keyword) => {
    set({ searchKeyword: keyword });
  },

  setConditionFilter: (condition) => {
    set({ conditionFilter: condition });
  },

  setSortType: (sort) => {
    set({ sortType: sort });
  },

  get filteredBooks() {
    const { books, searchKeyword, conditionFilter, sortType } = get();
    let result = [...books];

    if (searchKeyword.trim()) {
      const lower = searchKeyword.toLowerCase();
      result = result.filter((b) => b.title.toLowerCase().includes(lower));
    }

    if (conditionFilter !== 'all') {
      result = result.filter((b) => b.condition === conditionFilter);
    }

    if (sortType === 'latest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortType === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    }

    return result;
  },
}));
