import type { Book, SortType, ConditionFilter } from '@/types';

export function filterByKeyword(books: Book[], keyword: string): Book[] {
  const trimmed = keyword.trim().toLowerCase();
  if (!trimmed) return books;
  return books.filter((b) => b.title.toLowerCase().includes(trimmed));
}

export function filterByCondition(books: Book[], condition: ConditionFilter): Book[] {
  if (condition === 'all') return books;
  return books.filter((b) => b.condition === condition);
}

export function sortBooks(books: Book[], sortType: SortType): Book[] {
  const sorted = [...books];
  if (sortType === 'latest') {
    sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortType === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  }
  return sorted;
}

export function getFilteredBooks(
  books: Book[],
  keyword: string,
  condition: ConditionFilter,
  sortType: SortType,
): Book[] {
  const afterKeyword = filterByKeyword(books, keyword);
  const afterCondition = filterByCondition(afterKeyword, condition);
  return sortBooks(afterCondition, sortType);
}
