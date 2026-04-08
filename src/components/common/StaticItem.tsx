import React from 'react';
import { LucideIcon, Check } from 'lucide-react';
import { ThemeConfig } from '../../types/tax';

interface StaticItemProps {
  label: string;
  subLabel: string;
  theme: ThemeConfig;
  icon: LucideIcon;
}

const StaticItem: React.FC<StaticItemProps> = ({ label, subLabel, theme, icon: Icon }) => {
  return (
    <div className={`flex items-center justify-between p-4 ${theme.card}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${theme.bg} ${theme.accentColor}`}>
          <Icon size={20} />
        </div>
        <div>
          <div className={`text-sm ${theme.textMain}`}>{label}</div>
          <div className={`text-xs opacity-60 text-left`}>{subLabel}</div>
        </div>
      </div>
      <div className="flex items-center gap-3 px-2">
        <span className={`text-xs font-bold text-green-600 flex items-center gap-1`}>
          <Check size={14} /> 適用
        </span>
      </div>
    </div>
  );
};

export default React.memo(StaticItem);
