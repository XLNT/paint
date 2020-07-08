import React from 'react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { cn } from '../../utils/cn';

export default {
  title: 'Button',
};

export const Text = () => (
  <button className={cn('bg-gesso border')} onClick={action('clicked')}>
    {text('Text', 'Hello Banana')}
  </button>
);

export const Emoji = () => (
  <button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </button>
);
