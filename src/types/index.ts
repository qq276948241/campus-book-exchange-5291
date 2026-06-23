export type BookCondition = '全新' | '九成新' | '八成新' | '七成新' | '六成新及以下';
export type ContactType = 'QQ' | '微信' | '电话';
export type SortType = 'latest' | 'price-asc';
export type ConditionFilter = BookCondition | 'all';

export interface Book {
  id: string;
  title: string;
  isbn: string;
  price: number;
  condition: BookCondition;
  description: string;
  coverImage: string;
  sellerMessage: string;
  contact: string;
  contactType: ContactType;
  createdAt: string;
}

export type NewBook = Omit<Book, 'id' | 'createdAt'>;
