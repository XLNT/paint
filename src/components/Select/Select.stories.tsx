import React, { useState } from 'react';
import { Select, SelectItem } from './Select';
import { ReactComponent as ExpandIcon } from '../../icons/nav down.svg';
import { ReactComponent as CollapseIcon } from '../../icons/nav up.svg';
import { ReactComponent as CancelIcon } from '../../icons/close.svg';

export default {
  title: 'Select',
};

const ITEMS: SelectItem[] = [
  {
    value: 'a',
  },
  {
    value: 'b',
  },
  {
    value: 'c',
  },
];

export const Simple = () => {
  const [value, setValue] = useState(null);

  return (
    <Select
      items={ITEMS}
      renderItem={({ item }) => item.value}
      expandIcon={<ExpandIcon />}
      collapseIcon={<CollapseIcon />}
      cancelIcon={<CancelIcon />}
    >
      Test Value
    </Select>
  );
};
