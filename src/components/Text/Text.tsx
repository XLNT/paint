import React from 'react';
import makeBasicElement from '../util/makeBasicElement';
import { cn } from '../../utils/cn';

export const H1 = makeBasicElement('h1', cn('font-serif font-bold text-h1 leading-tight'));
export const H2 = makeBasicElement('h2', cn('font-serif font-bold text-h2 leading-tight'));
export const H3 = makeBasicElement('h3', cn('font-serif font-bold text-h3 leading-tight'));
export const H4 = makeBasicElement('h4', cn('font-serif font-medium text-h4 leading-tight'));
export const Text = makeBasicElement('p', cn('font-sans'));
export const LinkText = makeBasicElement<HTMLAnchorElement>(
  'a',
  cn('font-sans underline cursor-pointer'),
);
export const BoldText = makeBasicElement(Text, cn('font-bold'));
export const SubText = makeBasicElement(Text, cn('text-subtext'));

export const SlugText = makeBasicElement('code', cn('font-mono'));
