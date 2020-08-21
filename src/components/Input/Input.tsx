import makeBasicElement from '../util/makeBasicElement';
import { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export const Input = makeBasicElement<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  'input',
  cn(
    'appearance-none',
    'block',
    'w-full',
    'rounded border',
    'py-3 px-4',
    'leading-tight',
    'overflow-hidden',
    'focus:outline-none',
    'focus:bg-gesso',
  ),
);
