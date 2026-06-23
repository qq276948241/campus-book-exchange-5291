import { Clock, ArrowUpDown } from 'lucide-react';
import type { BookCondition, SortType, ConditionFilter } from '@/types';

export const CONDITION_STYLES: Record<BookCondition, string> = {
  '全新': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  '九成新': 'bg-sky-100 text-sky-700 border-sky-200',
  '八成新': 'bg-blue-100 text-blue-700 border-blue-200',
  '七成新': 'bg-amber-100 text-amber-700 border-amber-200',
  '六成新及以下': 'bg-rose-100 text-rose-700 border-rose-200',
};

export const CONDITION_ACTIVE_STYLES: Record<BookCondition, string> = {
  '全新': 'bg-emerald-500 text-white border-emerald-500',
  '九成新': 'bg-sky-500 text-white border-sky-500',
  '八成新': 'bg-blue-500 text-white border-blue-500',
  '七成新': 'bg-amber-500 text-white border-amber-500',
  '六成新及以下': 'bg-rose-500 text-white border-rose-500',
};

export const CONDITION_OPTIONS: { value: ConditionFilter; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: '全新', label: '全新' },
  { value: '九成新', label: '九成新' },
  { value: '八成新', label: '八成新' },
  { value: '七成新', label: '七成新' },
  { value: '六成新及以下', label: '六成新' },
];

export const SORT_OPTIONS: { value: SortType; label: string; icon: typeof Clock }[] = [
  { value: 'latest', label: '最新发布', icon: Clock },
  { value: 'price-asc', label: '价格从低到高', icon: ArrowUpDown },
];
