import React, { PropsWithChildren, ReactNode } from 'react';
import { WithClassName } from '../../utils/WithClassName';
import { InlineButton } from '../InlineButton/InlineButton';
import { cn } from '../../utils/cn';
import { useSelect } from 'downshift';
import { ReactComponent as ExpandIcon } from '../../icons/nav down.svg';
import { ReactComponent as CollapseIcon } from '../../icons/nav up.svg';
import { ReactComponent as CancelIcon } from '../../icons/close.svg';

export interface SelectItem {
  value: string;
}

interface SelectProps<TSelectItem> extends PropsWithChildren<{}>, WithClassName {
  items: TSelectItem[];
  renderItem: (state: { item: TSelectItem; selected?: boolean; active?: boolean }) => ReactNode;
}

const itemToString = (item: SelectItem | null) => item?.value ?? '';

export function Select<TSelectItem extends SelectItem>({
  items,
  renderItem,
  className,
  children,
}: SelectProps<TSelectItem>) {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    reset,
  } = useSelect({ items, itemToString, onSelectedItemChange: console.log.bind(console) });

  return (
    <div className={cn(className, 'relative', 'flex flex-row')}>
      <InlineButton
        className={cn('flex-1')}
        {...getLabelProps()}
        {...getToggleButtonProps()}
        icon={
          isOpen ? (
            <CollapseIcon />
          ) : selectedItem ? (
            // TODO: a11y clear button
            <CancelIcon
              onClick={(e) => {
                e.stopPropagation();
                reset();
              }}
            />
          ) : (
            <ExpandIcon />
          )
        }
      >
        {selectedItem ? renderItem({ item: selectedItem }) : children}
      </InlineButton>
      <ul
        className={cn(
          !isOpen && 'hidden',
          'absolute top-full left-0 w-full',
          'border border-bruise bg-gesso',
          'overflow-y-auto overscroll-contain',
        )}
        style={{
          maxHeight: '16rem',
        }}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              key={item.value}
              {...getItemProps({
                item,
                index,
              })}
            >
              {renderItem({
                item,
                selected: selectedItem === item,
                active: highlightedIndex === index,
              })}
            </li>
          ))}
      </ul>
    </div>
  );
}
