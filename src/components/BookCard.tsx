import { Link } from 'react-router-dom';
import { CONDITION_STYLES } from '@/constants';
import type { Book } from '@/types';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link to={`/book/${book.id}`} className="block group">
      <div className="material-card">
        <div className="relative overflow-hidden bg-slate-100">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5">
            <span className={`tag-pill border ${CONDITION_STYLES[book.condition]}`}>
              {book.condition}
            </span>
          </div>
        </div>
        <div className="p-3.5">
          <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-primary-700 transition-colors">
            {book.title}
          </h3>
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm text-primary-600 font-medium">¥</span>
            <span className="text-xl font-bold text-primary-600">{book.price}</span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500 truncate">
            ISBN: {book.isbn}
          </p>
        </div>
      </div>
    </Link>
  );
}
