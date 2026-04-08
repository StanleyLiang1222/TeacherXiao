import React from 'react';
import { PieChart } from 'lucide-react';
import { ThemeConfig } from '../../types/tax';

interface AssetDistributionChartProps {
  assets: {
    realEstate: number;
    stocks: number;
    cash: number;
    others: number;
  };
  theme: ThemeConfig;
}

const AssetDistributionChart: React.FC<AssetDistributionChartProps> = ({ assets, theme }) => {
  const { realEstate, stocks, cash, others } = assets;
  const total = realEstate + stocks + cash + others;
  
  const categories = [
    { label: '不動產', value: realEstate, color: '#6366f1' },
    { label: '股票', value: stocks, color: '#ca8a04' },
    { label: '現金', value: cash, color: '#10b981' },
    { label: '其他', value: others, color: '#94a3b8' }
  ];

  const activeData = categories.filter(c => c.value > 0);
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  return (
    <div className={`p-6 ${theme.card}`}>
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100/50 pb-4">
        <PieChart size={20} className={theme.textSub} />
        <h3 className={`font-bold ${theme.textMain}`}>資產分佈圖</h3>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 md:w-48 md:h-48 mb-8">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {total === 0 ? (
              <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#e2e8f0" strokeWidth="12" />
            ) : (
              activeData.map((slice) => {
                const percent = slice.value / total;
                const dash = percent * circumference;
                const gapValue = activeData.length > 1 ? 2 : 0;
                const gap = circumference - dash;
                const offset = -(cumulativePercent * circumference);
                cumulativePercent += percent;
                return (
                  <circle
                    key={slice.label}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth="12"
                    strokeDasharray={`${Math.max(0, dash - gapValue)} ${gap + gapValue}`}
                    strokeDashoffset={offset}
                    className="transition-all duration-700 ease-out"
                    strokeLinecap="butt"
                  />
                );
              })
            )}
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full px-2">
          {categories.map(cat => {
            const percent = total > 0 ? ((cat.value / total) * 100).toFixed(1) : "0.0";
            return (
              <div key={cat.label} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></div>
                  <span className={`${theme.textMain} font-medium`}>{cat.label}</span>
                </div>
                <span className={theme.textSub}>{percent}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AssetDistributionChart);
