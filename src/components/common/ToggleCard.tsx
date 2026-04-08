import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ThemeConfig } from '../../types/tax';

interface ToggleCardProps {
  label: string;
  subLabel?: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  theme: ThemeConfig;
  icon: LucideIcon;
  className?: string;
  labelClassName?: string;
  subLabelClassName?: string;
}

const ToggleCard: React.FC<ToggleCardProps> = ({
  label,
  subLabel,
  checked,
  onChange,
  theme,
  icon: Icon,
  className = '',
  labelClassName = '',
  subLabelClassName = ''
}) => {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`relative cursor-pointer overflow-hidden p-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${theme.card} ${
        checked ? 'ring-2 ring-offset-2 ring-blue-500/50' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${checked ? theme.highlight : theme.bg}`}>
            <Icon size={20} className={checked ? 'text-white' : theme.accentColor} />
          </div>
          <div className="flex flex-col">
            <div className={labelClassName || `font-bold ${theme.textMain}`}>{label}</div>
            <div className={subLabelClassName || `text-xs ${theme.textSub}`}>{subLabel}</div>
          </div>
        </div>
        <div 
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            checked ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
          }`}
        >
          {checked && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ToggleCard);
