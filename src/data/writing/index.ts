import type { UnitWritingTask } from '../../types/curriculum';
import { WRITING_U1_TO_U4 } from './u1to4';
import { WRITING_U5_TO_U8 } from './u5to8';

export const ALL_WRITING_TASKS: UnitWritingTask[] = [
  ...WRITING_U1_TO_U4,
  ...WRITING_U5_TO_U8
];

export const WRITING_BY_UNIT: Record<number, UnitWritingTask> = Object.fromEntries(
  ALL_WRITING_TASKS.map((t) => [t.unit, t])
);

export function getUnitWriting(unitNumber: number): UnitWritingTask | undefined {
  return WRITING_BY_UNIT[unitNumber];
}
