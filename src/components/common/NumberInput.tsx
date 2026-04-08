import React from 'react';
import { Info, ExternalLink } from 'lucide-react';
import { ThemeConfig } from '../../types/tax';
import { formatNumber, parseNumber } from '../../utils/formatters';

interface NumberInputProps {
  label: string;
  subLabel?: string | React.ReactNode;
  value: number;
  onChange: (val: number) => void;
  theme: ThemeConfig;
  prefix?: string;
  tooltip?: {
    label: string;
    content: string[];
  } | null;
  externalLink?: {
    text: string;
    url: string;
  } | null;
  className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  subLabel,
  value,
  onChange,
  theme,
  prefix = "NT$",
  tooltip = null,
  externalLink = null,
  className = ""
}) => {
  return (
    <div className={`w-full relative group/input ${className}`}>
      <div className="flex flex-col mb-1">
        <div className={theme.labelStyle}>{label}</div>
        {subLabel && (
          <div className={`text-[10px] md:text-xs opacity-60 -mt-0.5 mb-1 ${theme.textMain}`}>
            {subLabel}
          </div>
        )}
        
        {externalLink && (
          <a
            href={externalLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] text-blue-500 hover:text-blue-600 hover:underline mb-1 w-fit transition-colors"
          >
            <ExternalLink size={10} />
            <span>{externalLink.text}</span>
          </a>
        )}

        {tooltip && (
          <div className="relative w-fit mb-2 group/tooltip z-20">
            <div className="flex items-center gap-1.5 cursor-help text-xs text-blue-500 hover:text-blue-600 font-medium transition-colors border-b border-dashed border-blue-300 pb-0.5">
              <Info size={14} />
              <span>{tooltip.label}</span>
            </div>
            <div className="absolute left-0 top-full mt-2 w-max max-w-[280px] p-4 bg-slate-800 text-white text-xs rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none transform translate-y-1 group-hover/tooltip:translate-y-0">
              <div className="absolute -top-1.5 left-4 w-3 h-3 bg-slate-800 rotate-45"></div>
              <ul className="space-y-2">
                {tooltip.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span className="opacity-90 leading-relaxed text-left">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textSub} font-medium`}>
          {prefix}
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={value === 0 ? '' : formatNumber(value)}
          placeholder="0"
          onChange={(e) => onChange(parseNumber(e.target.value))}
          className={`w-full py-3 pl-12 pr-4 text-lg font-bold outline-none transition-all duration-200 ${theme.input} ${value === 0 ? 'placeholder:text-gray-400 placeholder:italic' : theme.textMain}`}
        />
      </div>
    </div>
  );
};

export default React.memo(NumberInput);
