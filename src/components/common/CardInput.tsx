import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ThemeConfig } from '../../types/tax';
import { formatNumber, parseNumber } from '../../utils/formatters';

interface CardInputProps {
  label: string;
  subLabel?: string | React.ReactNode;
  value: number;
  onChange: (val: number) => void;
  theme: ThemeConfig;
  icon: LucideIcon;
  className?: string;
}

const CardInput: React.FC<CardInputProps> = ({
  label,
  subLabel,
  value,
  onChange,
  theme,
  icon: Icon,
  className = ''
}) => {
  return (
    <div className={`p-4 ${theme.card} transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-full ${theme.bg} ${theme.accentColor}`}>
          <Icon size={20} />
        </div>
        <div className="flex flex-col">
          <div className={`text-sm ${theme.textMain}`}>{label}</div>
          <div className={`text-xs max-w-[200px] md:max-w-full leading-tight ${typeof subLabel === 'string' ? 'opacity-60' : ''}`}>
            {subLabel}
          </div>
        </div>
      </div>
      <div className="relative">
        <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textSub} font-medium`}>
          NT$
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={value === 0 ? '' : formatNumber(value)}
          placeholder="0"
          onChange={(e) => onChange(parseNumber(e.target.value))}
          className={`w-full py-3 pl-12 pr-4 text-lg font-bold outline-none transition-all duration-200 ${theme.input} ${
            value === 0 ? 'placeholder:text-gray-400 placeholder:italic' : theme.textMain
          }`}
        />
      </div>
    </div>
  );
};

export default React.memo(CardInput);
