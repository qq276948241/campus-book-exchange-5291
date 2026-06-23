import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, BookOpen, Barcode, Tag, FileText, MessageSquare, Contact, Loader2, CheckCircle } from 'lucide-react';
import { useBookStore } from '@/store/useBookStore';
import type { BookCondition, ContactType, NewBook } from '@/types';

const conditions: BookCondition[] = ['全新', '九成新', '八成新', '七成新', '六成新及以下'];
const contactTypes: ContactType[] = ['QQ', '微信', '电话'];

export default function Publish() {
  const navigate = useNavigate();
  const addBook = useBookStore((state) => state.addBook);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [coverImage, setCoverImage] = useState<string>('');
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<BookCondition>('八成新');
  const [description, setDescription] = useState('');
  const [sellerMessage, setSellerMessage] = useState('');
  const [contact, setContact] = useState('');
  const [contactType, setContactType] = useState<ContactType>('微信');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCoverImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !price || !coverImage) {
      return;
    }

    setIsSubmitting(true);

    const newBook: NewBook = {
      title,
      isbn,
      price: Number(price),
      condition,
      description: description || '卖家暂未填写书籍描述',
      coverImage,
      sellerMessage: sellerMessage || '欢迎咨询~',
      contact,
      contactType,
    };

    await new Promise((resolve) => setTimeout(resolve, 600));
    addBook(newBook);
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      navigate('/');
    }, 1200);
  };

  if (showSuccess) {
    return (
      <div className="container px-4 py-20">
        <div className="bg-white rounded-2xl shadow-card p-10 max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">发布成功！</h2>
          <p className="text-slate-500">即将返回书籍广场...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 md:py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary-400" />
            发布二手书
          </h1>
          <p className="text-slate-400 text-sm mt-1">填写书籍信息，让好书找到新主人</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              封面照片 <span className="text-rose-500">*</span>
            </label>
            {coverImage ? (
              <div className="relative rounded-xl overflow-hidden w-full max-w-xs aspect-[4/3] bg-slate-100">
                <img src={coverImage} alt="封面" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full max-w-xs aspect-[4/3] rounded-xl border-2 border-dashed border-slate-300 hover:border-primary-500 hover:bg-primary-50 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-primary-600 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">点击上传封面</span>
                <span className="text-xs text-slate-400">支持 JPG、PNG 格式</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-primary-600" />
                书名 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="请输入书籍名称"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <Barcode className="w-4 h-4 text-primary-600" />
                ISBN
              </label>
              <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="请输入 ISBN（选填）"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                  <span className="w-4 h-4 text-primary-600 font-bold text-sm flex items-center justify-center">¥</span>
                  价格 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="请输入售价"
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-primary-600" />
                  新旧程度
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as BookCondition)}
                  className="input-field appearance-none bg-white cursor-pointer"
                >
                  {conditions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-primary-600" />
                书籍描述
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="简要介绍这本书的内容、出版社等信息"
                rows={4}
                className="input-field resize-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6 space-y-5">
            <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <Contact className="w-4 h-4 text-primary-600" />
              联系方式
            </h3>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-primary-500" />
                卖家留言
              </label>
              <textarea
                value={sellerMessage}
                onChange={(e) => setSellerMessage(e.target.value)}
                placeholder="给买家留个言吧~"
                rows={2}
                className="input-field resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  联系方式类型
                </label>
                <select
                  value={contactType}
                  onChange={(e) => setContactType(e.target.value as ContactType)}
                  className="input-field appearance-none bg-white cursor-pointer"
                >
                  {contactTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  {contactType}号
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={`请输入您的${contactType}`}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !title || !price || !coverImage}
            className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                发布中...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                立即发布
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
