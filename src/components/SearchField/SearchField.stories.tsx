import React, { useState } from 'react';
import { SearchField } from './SearchField';
import { cn } from '../../utils/cn';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default {
  title: 'SearchField',
};

export const Default = () => {
  const [value, setValue] = useState('');
  return (
    <SearchField
      className={cn('w-64')}
      placeholder={text('Placeholder', 'Search')}
      value={value}
      onChange={setValue}
      onSubmit={action('onSubmit')}
      aria-label="Search"
      aria-autocomplete="list"
      aria-haspopup="listbox"
    />
  );
};
