import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Barcode, MessageSquare, Phone, Smartphone, User } from 'lucide-react';
import { useBookStore } from '@/store/useBookStore';
import { CONDITION_STYLES } from '@/constants';
import type { ContactType } from '@/types';

const contactIconMap: Record<ContactType, typeof Phone> = {
  'QQ': Smartphone,
  '微信': MessageSquare,
  '电话': Phone,
};

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = useBookStore((state) => state.getBookById(id || ''));

  if (!book) {
    return (
      <div className="container px-4 py-12 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md mx-auto">
          <p className="text-slate-600 text-lg mb-4">这本书不存在或已被下架</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            返回书籍广场
          </Link>
        </div>
      </div>
    );
  }

  const ContactIcon = contactIconMap[book.contactType];

  return (
    <div className="container px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-white/80 hover:text-white mb-5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        返回
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-card p-4 sticky top-24">
            <div className="rounded-xl overflow-hidden bg-slate-100 aspect-[4/3]">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-lg text-primary-600 font-medium">¥</span>
              <span className="text-3xl font-bold text-primary-600">{book.price}</span>
            </div>
            <div className="mt-3">
              <span className={`tag-pill border ${CONDITION_STYLES[book.condition]}`}>
                {book.condition}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
              {book.title}
            </h1>
            <div className="mt-3 flex items-center gap-2 text-slate-500 text-sm">
              <Barcode className="w-4 h-4" />
              <span>ISBN: {book.isbn}</span>
            </div>
            <div className="mt-5 pt-5 border-t border-slate-100">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">书籍描述</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {book.description}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-primary-600" />
              卖家留言
            </h3>
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-4 border border-primary-100">
              <p className="text-slate-700 leading-relaxed">
                "{book.sellerMessage}"
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-card p-6 text-white">
            <h3 className="text-base font-semibold flex items-center gap-2 mb-4">
              <ContactIcon className="w-5 h-5" />
              联系方式
            </h3>
            <div className="flex items-center justify-between bg-white/10 rounded-xl p-4 backdrop-blur">
              <div>
                <p className="text-xs text-white/70 mb-1">{book.contactType}</p>
                <p className="text-2xl font-bold tracking-wide">{book.contact}</p>
              </div>
              <div className="hidden sm:block">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 rounded-full text-sm">
                  <ContactIcon className="w-4 h-4" />
                  联系卖家
                </span>
              </div>
            </div>
            <p className="mt-4 text-xs text-white/60">
              * 请通过以上方式联系卖家，线下完成交易
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
