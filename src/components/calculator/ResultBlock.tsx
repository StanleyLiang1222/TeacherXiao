import React from 'react';
import { Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeConfig } from '../../types/tax';
import { formatNumber } from '../../utils/formatters';

interface ResultBlockProps {
  label: string;
  value: number;
  theme: ThemeConfig;
  isHighlight?: boolean;
  subtext?: string | null;
}

const ResultBlock: React.FC<ResultBlockProps> = ({
  label,
  value,
  theme,
  isHighlight = false,
  subtext = null
}) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`p-6 flex flex-col justify-between h-full ${
        isHighlight ? theme.highlight : theme.card
      }`}
    >
      <div className="flex items-start justify-between">
        <span className={isHighlight ? 'text-white/80' : theme.textSub}>{label}</span>
        {isHighlight && <Calculator className="text-white/50" />}
      </div>
      <div className="mt-4">
        <div className={`text-3xl lg:text-4xl font-black tracking-tight ${isHighlight ? 'text-white' : theme.textMain}`}>
          <span className="text-lg opacity-60 font-normal mr-1">NT$</span>
          <motion.span
            key={value}
            initial={{ opacity: 0.5, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {formatNumber(value)}
          </motion.span>
        </div>
        {subtext && <div className="text-xs mt-2 opacity-70">{subtext}</div>}
      </div>
    </motion.div>
  );
};

export default React.memo(ResultBlock);
