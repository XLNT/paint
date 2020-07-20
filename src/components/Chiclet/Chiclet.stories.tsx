import React from 'react';
import { Chiclet } from './Chiclet';
import { text } from '@storybook/addon-knobs';
import { cn } from '../../utils/cn';
import { H4, H3 } from '../Text/Text';

export default {
  title: 'Chiclet',
};

export const Default = () => <Chiclet className={cn('bg-gesso')}>{text('Content', '4')}</Chiclet>;

export const Max = () => (
  <Chiclet className={cn('bg-gesso')}>
    {text('Content', '99')}
    <sup>+</sup>
  </Chiclet>
);

export const WithHeader = () => (
  <div className={cn('space-y-4')}>
    <H3>Inline with header</H3>
    <div
      className={cn(
        'px-4',
        'inline-flex flex-row items-center',
        'space-x-2',
        'border-t border-b border-smudge',
      )}
    >
      <H4 className={cn('relative')}>{text('Header', 'Header')}</H4>
      <Chiclet className={cn('bg-gesso')}>{text('Content', '4')}</Chiclet>
    </div>
  </div>
);
