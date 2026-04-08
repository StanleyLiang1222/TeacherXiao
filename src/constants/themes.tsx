import React from 'react';
import { Code, Crown, Leaf } from 'lucide-react';
import { ThemeConfig } from '../types/tax';

export const THEMES: Record<string, ThemeConfig> = {
  modern: {
    id: 'modern',
    name: 'Modern 現代',
    icon: <Code size={18} />,
    bg: 'bg-slate-100',
    textMain: 'text-slate-900',
    textSub: 'text-slate-500',
    card: 'bg-white/80 backdrop-blur-xl shadow-lg border border-white/50 rounded-2xl',
    highlight: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-200/50 shadow-xl',
    accentColor: 'text-blue-600',
    input: 'bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-xl',
    button: 'rounded-xl',
    font: 'font-sans',
    radius: 'rounded-2xl',
    labelStyle: 'text-xs font-bold uppercase tracking-wider text-slate-900 mb-1'
  },
  classic: {
    id: 'classic',
    name: 'Classic 經典',
    icon: <Crown size={18} />,
    bg: 'bg-[#F5F5F0]',
    textMain: 'text-stone-900',
    textSub: 'text-stone-600',
    card: 'bg-[#FAF9F6] border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] rounded-none',
    highlight: 'bg-stone-900 text-[#D4AF37] border-2 border-stone-900',
    accentColor: 'text-stone-800',
    input: 'bg-transparent border-b-2 border-stone-300 focus:border-stone-900 rounded-none px-0',
    button: 'rounded-none border-2 border-stone-900 hover:bg-stone-200',
    font: 'font-serif',
    radius: 'rounded-none',
    labelStyle: 'text-sm font-serif italic text-stone-500 mb-1'
  },
  soft: {
    id: 'soft',
    name: 'Soft 極簡',
    icon: <Leaf size={18} />,
    bg: 'bg-emerald-50',
    textMain: 'text-emerald-900',
    textSub: 'text-emerald-600/70',
    card: 'bg-white shadow-none border border-emerald-100 rounded-[2rem]',
    highlight: 'bg-emerald-400 text-white rounded-[2rem]',
    accentColor: 'text-emerald-500',
    input: 'bg-emerald-50/50 border-none focus:ring-0 text-emerald-800 rounded-full px-6',
    button: 'rounded-full',
    font: 'font-sans',
    radius: 'rounded-[2rem]',
    labelStyle: 'text-sm font-medium text-emerald-400/80 mb-2 pl-2'
  }
};
