import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus, BookOpen, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useBookStore } from '@/store/useBookStore';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchKeyword, setSearchKeyword } = useBookStore();
  const [localSearch, setLocalSearch] = useState(searchKeyword);

  useEffect(() => {
    setLocalSearch(searchKeyword);
  }, [searchKeyword]);

  const isHome = location.pathname === '/';

  const handleSearch = (value: string) => {
    setLocalSearch(value);
    setSearchKeyword(value);
    if (!isHome) {
      navigate('/');
    }
  };

  const clearSearch = () => {
    setLocalSearch('');
    setSearchKeyword('');
  };

  return (
    <nav className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur-md border-b border-primary-800/50 shadow-lg">
      <div className="container px-4 py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-white shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg tracking-wide">校园书市</span>
              <p className="text-[11px] text-primary-300 -mt-0.5">Campus Book Market</p>
            </div>
          </Link>

          {isHome && (
            <div className="flex-1 relative max-w-xl mx-auto w-full">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="搜索书名..."
                  className="w-full pl-10 pr-10 py-2.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:bg-white/15 focus:ring-2 focus:ring-primary-500/50 transition-all duration-200"
                />
                {localSearch && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          <Link
            to="/publish"
            className="ml-auto shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">发布书籍</span>
            <span className="sm:hidden">发布</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
