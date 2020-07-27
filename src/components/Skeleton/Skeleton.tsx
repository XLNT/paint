import makeBasicElement from '../util/makeBasicElement';
import { cn } from '../../utils/cn';

// TODO: implicit dependency on global `skeleton` selector. depends on moving from pika to webpack
// to bundle paint and correctly support css modules

export const Skeleton = makeBasicElement('div', cn('block rounded', 'skeleton'));
