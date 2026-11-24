import type { UnitGrammarModule } from '../../types/curriculum';
import { GRAMMAR_U1_TO_U4 } from './u1to4';
import { GRAMMAR_U5_TO_U8 } from './u5to8';

export const ALL_GRAMMAR_MODULES: UnitGrammarModule[] = [
  ...GRAMMAR_U1_TO_U4,
  ...GRAMMAR_U5_TO_U8
];

export const GRAMMAR_BY_UNIT: Record<number, UnitGrammarModule> = Object.fromEntries(
  ALL_GRAMMAR_MODULES.map((m) => [m.unit, m])
);

export function getUnitGrammar(unitNumber: number): UnitGrammarModule | undefined {
  return GRAMMAR_BY_UNIT[unitNumber];
}
