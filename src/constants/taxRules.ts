export const EXEMPTION = 13330000; // 免稅額

export const EXCLUSION_OPTS = {
  dailyNecessities: 1000000, // 日常生活必需之器具及用品
  professionalTools: 560000  // 職業上之工具
};

export const DEDUCTIONS_OPTS = {
  spouse: 5530000,           // 配偶
  child: 560000,             // 直系血親卑親屬 (基本)
  parent: 1380000,           // 父母
  disability: 6930000,       // 身心障礙
  sibling: 560000,           // 受扶養兄弟姊妹
  funeral: 1380000           // 喪葬費專用
};

export const TAX_BRACKETS = [
  { threshold: 56210000, rate: 0.10, credit: 0, range: "0 ~ 5,621萬" },
  { threshold: 112420000, rate: 0.15, credit: 2810500, range: "5,621萬 ~ 1億1,242萬" },
  { threshold: Infinity, rate: 0.20, credit: 8431500, range: "1億1,242萬 以上" }
];
