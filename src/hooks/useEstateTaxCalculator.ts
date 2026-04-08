import { useState, useMemo, useEffect } from 'react';
import { 
  TaxAssetData, 
  TaxExclusionData, 
  TaxDeductionData, 
  CalculationResult 
} from '../types/tax';
import { 
  EXEMPTION, 
  EXCLUSION_OPTS, 
  DEDUCTIONS_OPTS, 
  TAX_BRACKETS 
} from '../constants/taxRules';
import { loadFromLocal, saveToLocal } from '../utils/formatters';

const STORAGE_KEY = 'estate_tax_calculator_data';

export const useEstateTaxCalculator = () => {
  // --- Initial State (Try to load from LocalStorage) ---
  const initialState = loadFromLocal(STORAGE_KEY, {
    themeId: 'modern',
    assets: {
      realEstate: 0,
      stockListed: 0,
      stockOTC: 0,
      stockEmerging: 0,
      stockPrivate: 0,
      cash: 0,
      insurancePolicy: 0,
      others: 30000000,
    },
    exclusions: {
      hasDailyNecessities: false,
      hasProfessionalTools: false,
    },
    deductions: {
      hasSpouse: true,
      childrenAdultCount: 2,
      childrenMinorAges: [],
      parentCount: 0,
      disabilityCount: 0,
      hasFuneral: true,
      dependentSiblingGrandparentCount: 0,
      dependentMinorSiblingAges: [],
      liabilities: 0,
    }
  });

  const [themeId, setThemeId] = useState<string>(initialState.themeId);
  const [assets, setAssets] = useState<TaxAssetData>(initialState.assets);
  const [exclusions, setExclusions] = useState<TaxExclusionData>(initialState.exclusions);
  const [deductions, setDeductions] = useState<TaxDeductionData>(initialState.deductions);

  // --- Auto Save ---
  useEffect(() => {
    saveToLocal(STORAGE_KEY, { themeId, assets, exclusions, deductions });
  }, [themeId, assets, exclusions, deductions]);

  const totalAssets = useMemo(() => 
    Object.values(assets).reduce((acc: number, val: number) => acc + val, 0), 
    [assets]
  );

  const calculations = useMemo((): CalculationResult => {
    let exclusionTotal = 0;
    let deductionTotal = 0;

    // Exclusions
    if (exclusions.hasDailyNecessities) exclusionTotal += EXCLUSION_OPTS.dailyNecessities;
    if (exclusions.hasProfessionalTools) exclusionTotal += EXCLUSION_OPTS.professionalTools;

    // Deductions
    if (deductions.hasSpouse) deductionTotal += DEDUCTIONS_OPTS.spouse;
    deductionTotal += deductions.childrenAdultCount * DEDUCTIONS_OPTS.child;
    
    deductions.childrenMinorAges.forEach(age => {
      deductionTotal += DEDUCTIONS_OPTS.child;
      if (age !== "" && !isNaN(Number(age))) {
        const yearsRemaining = 18 - Number(age);
        if (yearsRemaining > 0) {
          deductionTotal += yearsRemaining * DEDUCTIONS_OPTS.child;
        }
      }
    });

    deductionTotal += deductions.parentCount * DEDUCTIONS_OPTS.parent;
    deductionTotal += deductions.disabilityCount * DEDUCTIONS_OPTS.disability;
    deductionTotal += deductions.dependentSiblingGrandparentCount * DEDUCTIONS_OPTS.sibling;
    deductionTotal += deductions.liabilities;

    deductions.dependentMinorSiblingAges.forEach(age => {
      deductionTotal += DEDUCTIONS_OPTS.sibling;
      if (age !== "" && !isNaN(Number(age))) {
        const yearsRemaining = 18 - Number(age);
        if (yearsRemaining > 0) {
          deductionTotal += yearsRemaining * DEDUCTIONS_OPTS.sibling;
        }
      }
    });

    if (deductions.hasFuneral) deductionTotal += DEDUCTIONS_OPTS.funeral;

    const netTaxable = Math.max(0, totalAssets - EXEMPTION - exclusionTotal - deductionTotal);
    
    // Tax Calculation via Brackets
    let taxAmount = 0;
    let bracket = "免稅";

    if (netTaxable > 0) {
      const activeBracket = TAX_BRACKETS.find(b => netTaxable <= b.threshold) || TAX_BRACKETS[TAX_BRACKETS.length - 1];
      taxAmount = Math.floor(netTaxable * activeBracket.rate - activeBracket.credit);
      bracket = `${activeBracket.rate * 100}%`;
    }

    return { exclusionTotal, deductionTotal, netTaxable, taxAmount, bracket };
  }, [totalAssets, exclusions, deductions]);

  return {
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
  };
};
