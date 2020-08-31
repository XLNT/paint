import React, { useState } from 'react';
import { Select } from './Select';
import { cn } from '../../utils/cn';
import { ReactComponent as ExpandIcon } from '../../assets/icon/down arrow.svg';
import { ReactComponent as CollapseIcon } from '../../assets/icon/down arrow.svg';
import { ReactComponent as CancelIcon } from '../../assets/icon/close.svg';

export default {
  title: 'Select',
};

interface Item {
  value: string;
  parent?: string;
}

const ITEMS: Item[] = [
  {
    value: 'a',
  },
  {
    value: 'b',
  },
  {
    value: 'cccccccccccccccccccccc',
  },
  { value: 'd', parent: 'c' },
  { value: 'e', parent: 'c' },
];

export const Simple = () => {
  const [value, setValue] = useState<Item | null>(null);

  return (
    <Select
      className={cn('w-48')}
      items={ITEMS}
      selectedItem={value}
      onSelectItem={setValue}
      itemToKey={(item) => item.value}
      renderItem={({ item, label }) => (
        <span className={cn('truncate', !label && item.parent && 'pl-2')}>{item.value}</span>
      )}
      renderIcon={({ open, hasSelectedItem }) =>
        hasSelectedItem ? <CancelIcon /> : open ? <ExpandIcon /> : <CollapseIcon />
      }
    >
      Test Value
    </Select>
  );
};
