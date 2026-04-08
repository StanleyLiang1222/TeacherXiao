import React from 'react';
import { THEMES } from '../../constants/themes';
import { ThemeConfig } from '../../types/tax';

interface ThemeSwitcherProps {
  currentTheme: ThemeConfig;
  setTheme: (id: string) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, setTheme }) => {
  return (
    <div className="flex gap-2 p-1 bg-black/5 rounded-full w-fit mx-auto mb-8 backdrop-blur-sm">
      {Object.values(THEMES).map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`flex items-center gap-2 px-4 py-2 text-sm transition-all duration-300 ${
            currentTheme.id === t.id
              ? 'bg-white shadow-sm text-black font-bold scale-105'
              : 'text-gray-500 hover:text-gray-900'
          } ${t.button}`}
        >
          {t.icon}
          <span>{t.name}</span>
        </button>
      ))}
    </div>
  );
};

export default React.memo(ThemeSwitcher);
