import {MAX_DURATION_VIDEO} from '@src/constants';

export function isBiggerThanMax(range: [number, number]) {
  return range[1] - range[0] > MAX_DURATION_VIDEO;
}
