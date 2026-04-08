import React from 'react';
import { TableProperties } from 'lucide-react';
import { ThemeConfig } from '../../types/tax';
import { TAX_BRACKETS } from '../../constants/taxRules';
import { formatNumber } from '../../utils/formatters';

interface TaxBracketTableProps {
  theme: ThemeConfig;
}

const TaxBracketTable: React.FC<TaxBracketTableProps> = ({ theme }) => {
  return (
    <div className={`p-5 ${theme.card}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`p-1.5 rounded-lg ${theme.bg}`}>
          <TableProperties size={18} className={theme.accentColor} />
        </div>
        <h3 className={`font-bold ${theme.textMain}`}>115年 課稅級距表</h3>
      </div>
      <div className="space-y-3 text-sm">
        {TAX_BRACKETS.map((bracket, index) => (
          <div 
            key={index} 
            className={`flex justify-between items-center pb-2 ${
              index !== TAX_BRACKETS.length - 1 ? 'border-b border-gray-200/50' : ''
            }`}
          >
            <span className={theme.textSub}>{bracket.range}</span>
            <div className="text-right">
              <div className={`font-bold ${theme.textMain}`}>{bracket.rate * 100}%</div>
              {bracket.credit > 0 && (
                <div className="text-[10px] opacity-60">累進差額 {formatNumber(bracket.credit / 10000)}萬</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(TaxBracketTable);
