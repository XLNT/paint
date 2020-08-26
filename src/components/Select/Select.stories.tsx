import React, { useState } from 'react';
import { Select, SelectItem } from './Select';

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
    <Select items={ITEMS} renderItem={({ item }) => item.value}>
      Test Value
    </Select>
  );
};
