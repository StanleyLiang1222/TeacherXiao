import { useState, useCallback } from 'react';
import {
  DollarSign,
  Users,
  Leaf,
  TrendingUp,
  Heart,
  Baby,
  Accessibility,
  Building,
  LineChart,
  Briefcase,
  Archive,
  Coffee,
  Wrench,
  Banknote,
  Shield,
  Wallet,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types & Constants
import { THEMES } from './constants/themes';
import { EXCLUSION_OPTS } from './constants/taxRules';

// Hooks
import { useEstateTaxCalculator } from './hooks/useEstateTaxCalculator';

// Utils
import { formatNumber } from './utils/formatters';

// Components
import ThemeSwitcher from './components/common/ThemeSwitcher';
import NumberInput from './components/common/NumberInput';
import Counter from './components/common/Counter';
import ToggleCard from './components/common/ToggleCard';
import StaticItem from './components/common/StaticItem';
import CardInput from './components/common/CardInput';
import ResultBlock from './components/calculator/ResultBlock';
import AssetDistributionChart from './components/calculator/AssetDistributionChart';
import TaxBracketTable from './components/calculator/TaxBracketTable';

export default function EstateTaxCalculator() {
  const {
    assets,
    setAssets,
    exclusions,
    setExclusions,
    deductions,
    setDeductions,
    totalAssets,
    calculations,
    themeId,
    setThemeId
  } = useEstateTaxCalculator();

  const theme = THEMES[themeId] || THEMES.modern;

  // --- Handlers ---
  const handleAssetChange = useCallback((key: keyof typeof assets, val: number) => {
    setAssets(prev => ({ ...prev, [key]: val }));
  }, [setAssets]);

  const handleExclusionToggle = useCallback((key: keyof typeof exclusions) => {
    setExclusions(prev => ({ ...prev, [key]: !prev[key] }));
  }, [setExclusions]);

  const handleDeductionChange = useCallback((key: keyof typeof deductions, val: any) => {
    setDeductions(prev => ({ ...prev, [key]: val }));
  }, [setDeductions]);

  const handleMinorCountChange = useCallback((newCount: number) => {
    const current = deductions.childrenMinorAges;
    if (newCount > current.length) {
      handleDeductionChange('childrenMinorAges', [...current, ""]);
    } else {
      handleDeductionChange('childrenMinorAges', current.slice(0, newCount));
    }
  }, [deductions.childrenMinorAges, handleDeductionChange]);

  const handleMinorAgeChange = useCallback((idx: number, val: string) => {
    const newAges = [...deductions.childrenMinorAges];
    const num = parseInt(val);
    newAges[idx] = (!isNaN(num) && num >= 0 && num < 18) ? num : (val === "" ? "" : newAges[idx]);
    handleDeductionChange('childrenMinorAges', newAges);
  }, [deductions.childrenMinorAges, handleDeductionChange]);

  const handleDependentMinorSiblingCountChange = useCallback((newCount: number) => {
    const current = deductions.dependentMinorSiblingAges;
    if (newCount > current.length) {
      handleDeductionChange('dependentMinorSiblingAges', [...current, ""]);
    } else {
      handleDeductionChange('dependentMinorSiblingAges', current.slice(0, newCount));
    }
  }, [deductions.dependentMinorSiblingAges, handleDeductionChange]);

  const handleDependentMinorSiblingAgeChange = useCallback((idx: number, val: string) => {
    const newAges = [...deductions.dependentMinorSiblingAges];
    const num = parseInt(val);
    newAges[idx] = (!isNaN(num) && num >= 0 && num < 18) ? num : (val === "" ? "" : newAges[idx]);
    handleDeductionChange('dependentMinorSiblingAges', newAges);
  }, [deductions.dependentMinorSiblingAges, handleDeductionChange]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.font} pb-32 lg:pb-10`}>
      <header className="pt-8 pb-6 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-2 opacity-60"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase">Taiwan Tax 2026</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-4xl md:text-5xl font-black mb-6 mt-4 ${theme.textMain}`}
        >
          遺產稅試算機
        </motion.h1>
        <ThemeSwitcher currentTheme={theme} setTheme={setThemeId} />
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Asset Section */}
            <section className={`p-6 md:p-8 ${theme.card}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${theme.bg}`}>
                    <DollarSign className={theme.accentColor} />
                  </div>
                  <h2 className={`text-xl font-bold ${theme.textMain}`}>資產總額 Assets</h2>
                </div>
                <div className="text-right">
                  <div className={`text-xs ${theme.textSub}`}>Total Summary</div>
                  <motion.div 
                    key={totalAssets}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className={`text-2xl font-black ${theme.textMain}`}
                  >
                    {formatNumber(totalAssets)}
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <NumberInput
                  label="不動產 Real Estate"
                  subLabel="時價(土地公告現值+房屋評定現值)"
                  value={assets.realEstate}
                  onChange={(val) => handleAssetChange('realEstate', val)}
                  theme={theme}
                  tooltip={{
                    label: "時價佔市價成數參考查詢",
                    content: ["高樓大廈：約3成", "電梯華廈：約5成", "公寓：約7成", "透天厝：約9成", "一般土地：約市價"]
                  }}
                />

                <div className="w-full">
                  <div className={`${theme.labelStyle} opacity-100 mb-2`}>上市櫃股票 Stocks (Public)</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <NumberInput
                      label="上市 Listed"
                      subLabel="依死亡當日收盤價"
                      value={assets.stockListed}
                      onChange={(val) => handleAssetChange('stockListed', val)}
                      theme={theme}
                      externalLink={{ text: "證交所行情查詢", url: "https://www.twse.com.tw/zh/trading/historical/stock-day-avg.html" }}
                    />
                    <NumberInput
                      label="上櫃 OTC"
                      subLabel="依死亡當日收盤價"
                      value={assets.stockOTC}
                      onChange={(val) => handleAssetChange('stockOTC', val)}
                      theme={theme}
                      externalLink={{ text: "櫃買中心查詢", url: "https://share.google/XqiUGPNeKTTNusbHQ" }}
                    />
                  </div>
                </div>

                <NumberInput
                  label="興櫃股票 Emerging Stocks"
                  subLabel="依死亡日當日加權平均成交價估定之"
                  value={assets.stockEmerging}
                  onChange={(val) => handleAssetChange('stockEmerging', val)}
                  theme={theme}
                  externalLink={{ text: "興櫃行情查詢", url: "https://share.google/EVXjepOyJhcE4bKWz" }}
                />

                <NumberInput
                  label="未上市股票 Stocks (Private)"
                  subLabel="依公司資產淨值計算"
                  value={assets.stockPrivate}
                  onChange={(val) => handleAssetChange('stockPrivate', val)}
                  theme={theme}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <NumberInput
                    label="現金"
                    value={assets.cash}
                    onChange={(val) => handleAssetChange('cash', val)}
                    theme={theme}
                  />
                  <NumberInput
                    label="保單價值(非被保人)"
                    subLabel="要保人保單價值準備金"
                    value={assets.insurancePolicy}
                    onChange={(val) => handleAssetChange('insurancePolicy', val)}
                    theme={theme}
                  />
                </div>

                <NumberInput
                  label="其他動產及財產權利"
                  subLabel="黃金、骨董、債權等"
                  value={assets.others}
                  onChange={(val) => handleAssetChange('others', val)}
                  theme={theme}
                />
              </div>
            </section>

            {/* Exclusion Section */}
            <section className={`p-6 md:p-8 ${theme.card}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${theme.bg}`}>
                  <Archive className={theme.accentColor} />
                </div>
                <h2 className={`text-xl font-bold ${theme.textMain}`}>不計入遺產總額</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ToggleCard
                  label="日常生活器具"
                  subLabel="最高免計 100 萬"
                  checked={exclusions.hasDailyNecessities}
                  onChange={() => handleExclusionToggle('hasDailyNecessities')}
                  theme={theme}
                  icon={Coffee}
                />
                <ToggleCard
                  label="職業上工具"
                  subLabel="最高免計 56 萬"
                  checked={exclusions.hasProfessionalTools}
                  onChange={() => handleExclusionToggle('hasProfessionalTools')}
                  theme={theme}
                  icon={Wrench}
                />
              </div>
            </section>

            {/* Deduction Section */}
            <section className="space-y-4">
              <ToggleCard
                label="配偶"
                subLabel="扣除 553 萬"
                checked={deductions.hasSpouse}
                onChange={(val) => handleDeductionChange('hasSpouse', val)}
                theme={theme}
                icon={Heart}
              />
              
              <Counter
                label="成年直系卑親屬"
                subLabel="每人扣除 56 萬"
                value={deductions.childrenAdultCount}
                onChange={(val) => handleDeductionChange('childrenAdultCount', val)}
                theme={theme}
                icon={Baby}
              />

              <Counter
                label="未成年直系卑親屬"
                subLabel="每人 56 萬 + 距 18 歲年數加扣"
                value={deductions.childrenMinorAges.length}
                onChange={handleMinorCountChange}
                theme={theme}
                icon={Baby}
              >
                <AnimatePresence>
                  {deductions.childrenMinorAges.length > 0 && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3 overflow-hidden"
                    >
                      {deductions.childrenMinorAges.map((age, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className={`text-sm w-12 ${theme.textSub}`}>#{idx + 1}</span>
                          <input
                            type="number"
                            placeholder="請輸入年齡"
                            value={age}
                            onChange={(e) => handleMinorAgeChange(idx, e.target.value)}
                            className={`w-full p-2 border rounded-lg ${theme.input} ${theme.textMain}`}
                          />
                          <span className="text-xs opacity-50">歲</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Counter>

              <Counter
                label="父母 (健在)"
                subLabel="每人扣除 138 萬"
                value={deductions.parentCount}
                onChange={(val) => handleDeductionChange('parentCount', val)}
                theme={theme}
                icon={Users}
              />

              <Counter
                label="身心障礙親屬"
                subLabel="重度以上每人加扣 693 萬"
                value={deductions.disabilityCount}
                onChange={(val) => handleDeductionChange('disabilityCount', val)}
                theme={theme}
                icon={Accessibility}
              />

              <StaticItem label="喪葬費" subLabel="定額扣除 138 萬" theme={theme} icon={Leaf} />

              <Counter
                label="受扶養祖父母/成年兄弟姊妹"
                subLabel="每人扣除 56 萬"
                value={deductions.dependentSiblingGrandparentCount}
                onChange={(val) => handleDeductionChange('dependentSiblingGrandparentCount', val)}
                theme={theme}
                icon={Users}
              />

              <Counter
                label="受扶養未成年兄弟姊妹"
                subLabel="56 萬 + 距 18 歲加扣"
                value={deductions.dependentMinorSiblingAges.length}
                onChange={handleDependentMinorSiblingCountChange}
                theme={theme}
                icon={Users}
              >
                <AnimatePresence>
                  {deductions.dependentMinorSiblingAges.length > 0 && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3 overflow-hidden"
                    >
                      {deductions.dependentMinorSiblingAges.map((age, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className={`text-sm w-12 ${theme.textSub}`}>#{idx + 1}</span>
                          <input
                            type="number"
                            placeholder="請輸入年齡"
                            value={age}
                            onChange={(e) => handleDependentMinorSiblingAgeChange(idx, e.target.value)}
                            className={`w-full p-2 border rounded-lg ${theme.input} ${theme.textMain}`}
                          />
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Counter>

              <CardInput
                label="負債"
                subLabel="死亡前未償債務"
                value={deductions.liabilities}
                onChange={(val) => handleDeductionChange('liabilities', val)}
                theme={theme}
                icon={CreditCard}
              />
            </section>
          </div>

          {/* Right Column: Results & Charts */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-6 space-y-6">
              <ResultBlock
                label="預估應納稅額 Estimated Tax"
                value={calculations.taxAmount}
                theme={theme}
                isHighlight={true}
                subtext={`適用稅率：${calculations.bracket}`}
              />

              <AssetDistributionChart
                theme={theme}
                assets={{
                  realEstate: assets.realEstate,
                  stocks: assets.stockListed + assets.stockOTC + assets.stockEmerging + assets.stockPrivate,
                  cash: assets.cash,
                  others: assets.insurancePolicy + assets.others
                }}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 ${theme.card}`}>
                  <div className={`text-xs ${theme.textSub} mb-1`}>免稅額</div>
                  <div className={`text-lg font-bold ${theme.textMain}`}>1,333萬</div>
                </div>
                <div className={`p-4 ${theme.card}`}>
                  <div className={`text-xs ${theme.textSub} mb-1`}>不計入總額</div>
                  <div className="text-lg font-bold text-orange-500">{formatNumber(calculations.exclusionTotal)}</div>
                </div>
                <div className={`col-span-2 p-4 ${theme.card}`}>
                  <div className={`text-xs ${theme.textSub} mb-1`}>扣除額總計</div>
                  <div className="text-lg font-bold text-green-600">{formatNumber(calculations.deductionTotal)}</div>
                </div>
                <div className={`col-span-2 p-4 ${theme.card}`}>
                  <div className={`text-xs ${theme.textSub} mb-1`}>課稅遺產淨額</div>
                  <div className={`text-xl font-bold ${theme.textMain}`}>{formatNumber(calculations.netTaxable)}</div>
                </div>
              </div>

              <TaxBracketTable theme={theme} />

              <div className="text-center text-[0.75rem] opacity-40 mt-4">
                試算結果僅供參考，實際稅額以國稅局核定為準。<br/>
                Designed for 2026 Taiwan Tax Regulations.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Footer */}
      <div className={`fixed bottom-0 left-0 w-full lg:hidden z-50 p-4 pb-6 backdrop-blur-xl border-t ${
        themeId === 'modern' ? 'bg-white/90 border-slate-200' : 
        themeId === 'classic' ? 'bg-[#F5F5F0]/95 border-stone-300' : 'bg-emerald-50/95 border-emerald-100'
        } shadow-[0_-4px_20px_rgba(0,0,0,0.1)]`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <div className="text-xs opacity-60 uppercase mb-1">Estimated Tax</div>
            <div className={`text-2xl font-black ${theme.textMain}`}>
              <span className="text-sm mr-1">NT$</span>
              {formatNumber(calculations.taxAmount)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold bg-gray-100/50 px-2 py-1 rounded inline-block mb-1">
              {calculations.bracket} 稅率
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
