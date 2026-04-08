import React from 'react';

export interface TaxAssetData {
  realEstate: number;
  stockListed: number;
  stockOTC: number;
  stockEmerging: number;
  stockPrivate: number;
  cash: number;
  insurancePolicy: number;
  others: number;
}

export interface TaxExclusionData {
  hasDailyNecessities: boolean;
  hasProfessionalTools: boolean;
}

export interface TaxDeductionData {
  hasSpouse: boolean;
  childrenAdultCount: number;
  childrenMinorAges: (number | "")[];
  parentCount: number;
  disabilityCount: number;
  hasFuneral: boolean;
  dependentSiblingGrandparentCount: number;
  dependentMinorSiblingAges: (number | "")[];
  liabilities: number;
}

export interface CalculationResult {
  exclusionTotal: number;
  deductionTotal: number;
  netTaxable: number;
  taxAmount: number;
  bracket: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  bg: string;
  textMain: string;
  textSub: string;
  card: string;
  highlight: string;
  accentColor: string;
  input: string;
  button: string;
  font: string;
  radius: string;
  labelStyle: string;
}
