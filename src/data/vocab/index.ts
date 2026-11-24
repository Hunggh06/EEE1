import type { VocabItem } from '../../types/vocab';
import unit1Data from './unit1.json';
import unit2Data from './unit2.json';
import unit3Data from './unit3.json';
import unit4Data from './unit4.json';
import unit5Data from './unit5.json';
import unit6Data from './unit6.json';
import unit7Data from './unit7.json';
import unit8Data from './unit8.json';

const unit1 = unit1Data as VocabItem[];
const unit2 = unit2Data as VocabItem[];
const unit3 = unit3Data as VocabItem[];
const unit4 = unit4Data as VocabItem[];
const unit5 = unit5Data as VocabItem[];
const unit6 = unit6Data as VocabItem[];
const unit7 = unit7Data as VocabItem[];
const unit8 = unit8Data as VocabItem[];

export const VOCAB_BY_UNIT: Record<number, VocabItem[]> = {
  1: unit1,
  2: unit2,
  3: unit3,
  4: unit4,
  5: unit5,
  6: unit6,
  7: unit7,
  8: unit8
};

export const ALL_VOCAB: VocabItem[] = [
  ...unit1,
  ...unit2,
  ...unit3,
  ...unit4,
  ...unit5,
  ...unit6,
  ...unit7,
  ...unit8
];

export const VOCAB_BY_ID: Record<string, VocabItem> = Object.fromEntries(
  ALL_VOCAB.map((item) => [item.id, item])
);

export const ALL_WORD_IDS = new Set<string>(ALL_VOCAB.map((item) => item.id));

export function getUnitVocab(unit: number): VocabItem[] {
  return VOCAB_BY_UNIT[unit] ?? [];
}

export function getTopicsForUnit(unit: number): string[] {
  const seen = new Set<string>();
  const topics: string[] = [];
  for (const item of getUnitVocab(unit)) {
    if (!seen.has(item.topic)) {
      seen.add(item.topic);
      topics.push(item.topic);
    }
  }
  return topics;
}
