import makeBasicElement from '../util/makeBasicElement';
import { cn } from '../../utils/cn';

export const Chiclet = makeBasicElement(
  'div',
  cn('inline-block text-subtext', 'm-1 px-2 py-1 rounded'),
);
