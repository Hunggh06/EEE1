import type { VocabItem } from '../../types/vocab';
import { MNEMONICS_U1_TO_U2 } from './mnemonicsU1to2';
import { MNEMONICS_U3_TO_U4 } from './mnemonicsU3to4';
import { MNEMONICS_U5_TO_U6 } from './mnemonicsU5to6';
import { MNEMONICS_U7_TO_U8 } from './mnemonicsU7to8';
import unit1Data from './unit1.json';
import unit2Data from './unit2.json';
import unit3Data from './unit3.json';
import unit4Data from './unit4.json';
import unit5Data from './unit5.json';
import unit6Data from './unit6.json';
import unit7Data from './unit7.json';
import unit8Data from './unit8.json';

export const VOCAB_MNEMONICS_VI: Record<string, string> = {
  ...MNEMONICS_U1_TO_U2,
  ...MNEMONICS_U3_TO_U4,
  ...MNEMONICS_U5_TO_U6,
  ...MNEMONICS_U7_TO_U8
};

function attachMnemonics(rawItems: unknown): VocabItem[] {
  const items = rawItems as VocabItem[];
  return items.map((item) => {
    const mnemonic = VOCAB_MNEMONICS_VI[item.id];
    return mnemonic ? { ...item, mnemonicVi: mnemonic } : item;
  });
}

const unit1 = attachMnemonics(unit1Data);
const unit2 = attachMnemonics(unit2Data);
const unit3 = attachMnemonics(unit3Data);
const unit4 = attachMnemonics(unit4Data);
const unit5 = attachMnemonics(unit5Data);
const unit6 = attachMnemonics(unit6Data);
const unit7 = attachMnemonics(unit7Data);
const unit8 = attachMnemonics(unit8Data);

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
