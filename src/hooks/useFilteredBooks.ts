import { useMemo } from 'react';
import { useBookStore } from '@/store/useBookStore';
import { getFilteredBooks } from '@/utils/bookFilter';

export function useFilteredBooks() {
  const books = useBookStore((state) => state.books);
  const searchKeyword = useBookStore((state) => state.searchKeyword);
  const conditionFilter = useBookStore((state) => state.conditionFilter);
  const sortType = useBookStore((state) => state.sortType);

  const filteredBooks = useMemo(
    () => getFilteredBooks(books, searchKeyword, conditionFilter, sortType),
    [books, searchKeyword, conditionFilter, sortType],
  );

  return filteredBooks;
}
