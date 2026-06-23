import { useBookStore } from '@/store/useBookStore';
import BookCard from '@/components/BookCard';
import { BookOpen, Search } from 'lucide-react';
import { CONDITION_ACTIVE_STYLES, CONDITION_OPTIONS, SORT_OPTIONS } from '@/constants';
import type { BookCondition } from '@/types';

export default function Home() {
  const {
    filteredBooks,
    searchKeyword,
    conditionFilter,
    sortType,
    setConditionFilter,
    setSortType,
  } = useBookStore();

  const getResultText = () => {
    const parts: string[] = [];
    if (searchKeyword) parts.push(`搜索 "${searchKeyword}"`);
    if (conditionFilter !== 'all') parts.push(`筛选 ${conditionFilter}`);
    parts.push(`共 ${filteredBooks.length} 本`);
    return parts.join(' · ');
  };

  const getConditionActiveClass = (value: string) => {
    if (value === 'all') return 'bg-primary-600 text-white border-primary-600';
    return CONDITION_ACTIVE_STYLES[value as BookCondition];
  };

  const getSortLabel = () => SORT_OPTIONS.find((s) => s.value === sortType)?.label || '';

  return (
    <div className="container px-4 py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary-400" />
          书籍广场
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {searchKeyword || conditionFilter !== 'all' ? (
            <span>{getResultText()}</span>
          ) : (
            <>共 {filteredBooks.length} 本好书等你来淘</>
          )}
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 mr-1">成色:</span>
            {CONDITION_OPTIONS.map((opt) => {
              const isActive = conditionFilter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setConditionFilter(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                    isActive
                      ? `${getConditionActiveClass(opt.value)} shadow-md`
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:block w-px h-6 bg-white/10" />

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 mr-1">排序:</span>
            {SORT_OPTIONS.map((opt) => {
              const isActive = sortType === opt.value;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() => setSortType(opt.value)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {(conditionFilter !== 'all' || sortType !== 'latest') && (
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
            <span className="text-xs text-slate-500">当前筛选:</span>
            <div className="flex flex-wrap gap-2">
              {conditionFilter !== 'all' && (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  CONDITION_ACTIVE_STYLES[conditionFilter as BookCondition]
                }`}>
                  {conditionFilter}
                  <button
                    onClick={() => setConditionFilter('all')}
                    className="ml-1 hover:bg-white/20 rounded-full p-0.5 -mr-1"
                  >
                    <Search className="w-3 h-3 rotate-45" />
                  </button>
                </span>
              )}
              {sortType !== 'latest' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-600 text-white">
                  {getSortLabel()}
                  <button
                    onClick={() => setSortType('latest')}
                    className="ml-1 hover:bg-white/20 rounded-full p-0.5 -mr-1"
                  >
                    <Search className="w-3 h-3 rotate-45" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
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
          <p className="text-slate-500 text-sm mt-1">试试调整筛选条件或搜索关键词</p>
          {(conditionFilter !== 'all' || searchKeyword) && (
            <button
              onClick={() => {
                setConditionFilter('all');
                useBookStore.getState().setSearchKeyword('');
              }}
              className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-colors"
            >
              清除所有筛选
            </button>
          )}
        </div>
      )}
    </div>
  );
}
