import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ThemeConfig } from '../../types/tax';

interface CounterProps {
  label: string;
  subLabel?: string | React.ReactNode;
  value: number;
  onChange: (val: number) => void;
  theme: ThemeConfig;
  icon: LucideIcon;
  children?: React.ReactNode;
  className?: string;
  showControls?: boolean;
}

const Counter: React.FC<CounterProps> = ({
  label,
  subLabel,
  value,
  onChange,
  theme,
  icon: Icon,
  children,
  className = '',
  showControls = true
}) => {
  return (
    <div className={`p-4 ${theme.card} transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
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
        {showControls && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onChange(Math.max(0, value - 1))}
              className={`w-8 h-8 flex items-center justify-center ${theme.bg} hover:brightness-95 active:scale-95 transition-transform ${theme.radius}`}
            >
              -
            </button>
            <span className={`w-6 text-center font-bold ${theme.textMain}`}>{value}</span>
            <button
              onClick={() => onChange(value + 1)}
              className={`w-8 h-8 flex items-center justify-center ${theme.bg} hover:brightness-95 active:scale-95 transition-transform ${theme.radius}`}
            >
              +
            </button>
          </div>
        )}
      </div>
      {children && <div className="mt-4 border-t border-gray-100 pt-4 animate-in slide-in-from-top-2">{children}</div>}
    </div>
  );
};

export default React.memo(Counter);
