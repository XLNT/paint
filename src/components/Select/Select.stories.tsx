import React, { useState } from 'react';
import { Select } from './Select';
import { ReactComponent as ExpandIcon } from '../../icons/nav down.svg';
import { ReactComponent as CollapseIcon } from '../../icons/nav up.svg';
import { ReactComponent as CancelIcon } from '../../icons/close.svg';
import { cn } from '../../utils/cn';

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
      className={cn('w-24')}
      items={ITEMS}
      selectedItem={value}
      onSelectItem={setValue}
      itemToKey={(item) => item.value}
      renderItem={({ item }) => (
        <span className={cn('truncate', item.parent && 'pl-2')}>{item.value}</span>
      )}
      expandIcon={<ExpandIcon />}
      collapseIcon={<CollapseIcon />}
      cancelIcon={<CancelIcon />}
    >
      Test Value
    </Select>
  );
};
