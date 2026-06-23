import { useBookStore } from '@/store/useBookStore';
import BookCard from '@/components/BookCard';
import { BookOpen, Search } from 'lucide-react';

export default function Home() {
  const { filteredBooks, searchKeyword } = useBookStore();

  return (
    <div className="container px-4 py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary-400" />
          书籍广场
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {searchKeyword ? (
            <>搜索 "<span className="text-primary-400">{searchKeyword}</span>" 共找到 {filteredBooks.length} 本</>
          ) : (
            <>共 {filteredBooks.length} 本好书等你来淘</>
          )}
        </p>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="masonry-grid">
          {filteredBooks.map((book) => (
            <div key={book.id} className="masonry-item">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <Search className="w-10 h-10 text-slate-500" />
          </div>
          <p className="text-slate-400 text-lg">没有找到相关书籍</p>
          <p className="text-slate-500 text-sm mt-1">试试其他关键词吧</p>
        </div>
      )}
    </div>
  );
}
