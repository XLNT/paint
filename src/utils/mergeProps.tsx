import { mergeProps as _mergeProps } from '@react-aria/utils';

export function mergeProps(...[initial, ...others]: Record<string, any>[]) {
  for (const other of others) {
    initial = _mergeProps(initial, other);
  }

  return initial;
}
