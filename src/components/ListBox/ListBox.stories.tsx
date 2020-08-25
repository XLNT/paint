import React, { useState } from 'react';
import { ListBox } from './ListBox';
import { Item, Section } from '@react-stately/collections';
import { cn } from '../../utils/cn';
import { BoldText, Text } from '../Text/Text';

export default {
  title: 'ListBox',
};

export const Flat = () => {
  const [values, setValues] = useState<Set<string>>(() => new Set());

  return (
    <ListBox
      className={cn('rounded border border-bruise')}
      items={[{ key: 'a' }, { key: 'b' }, { key: 'c' }]}
      selectionMode="single"
      selectedKeys={values}
      onSelectionChange={(keys) => setValues(keys as Set<string>)}
    >
      {(item) => (
        <Item>
          <Text>{item.key}</Text>
        </Item>
      )}
    </ListBox>
  );
};

export const Sections = () => {
  const [values, setValues] = useState<Set<string>>(() => new Set());

  return (
    <ListBox
      className={cn('rounded border border-bruise')}
      items={[
        { key: 'a', children: [{ key: 'c' }] },
        { key: 'b', children: [{ key: 'd' }] },
      ]}
      selectionMode="single"
      selectedKeys={values}
      onSelectionChange={(keys) => setValues(keys as Set<string>)}
    >
      {(section) => (
        <Section
          key={section.key}
          items={section.children}
          title={<BoldText>{section.key}</BoldText>}
        >
          {(item) => (
            <Item key={item.key}>
              <Text>{item.key}</Text>
            </Item>
          )}
        </Section>
      )}
    </ListBox>
  );
};
