import React, { PropsWithChildren, ReactNode } from 'react';
import { WithClassName } from '../../utils/WithClassName';
import { SimpleInlineButton } from '../InlineButton/InlineButton';
import { cn } from '../../utils/cn';
import { useSelect } from 'downshift';

interface SelectProps<TSelectItem> extends PropsWithChildren<{}>, WithClassName {
  items: TSelectItem[];
  selectedItem: TSelectItem | undefined | null;
  onSelectItem: (item: TSelectItem | null) => void;
  itemToKey: (item: TSelectItem) => string;
  renderItem: (state: {
    item: TSelectItem;
    selected?: boolean;
    active?: boolean;
    label?: boolean;
  }) => ReactNode;

  renderIcon: (opts: { open: boolean; hasSelectedItem: boolean }) => ReactNode;
}

export function Select<TSelectItem>({
  items,
  selectedItem,
  onSelectItem,
  itemToKey,
  renderItem,
  className,
  children,
  renderIcon,
}: SelectProps<TSelectItem>) {
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    reset,
  } = useSelect({
    items,
    selectedItem,
    onSelectedItemChange: ({ selectedItem }) => onSelectItem(selectedItem ?? null),
  });

  return (
    <div className={cn(className, 'relative', 'flex flex-row')}>
      <SimpleInlineButton
        className={cn('flex-1')}
        {...getToggleButtonProps()}
        icon={
          <span
            onClick={(e) => {
              if (!!selectedItem) {
                e.preventDefault();
                e.stopPropagation();
                reset();
              }
            }}
          >
            {renderIcon({ open: isOpen, hasSelectedItem: !!selectedItem })}
          </span>
        }
      >
        {selectedItem ? (
          renderItem({ item: selectedItem, label: true })
        ) : (
          <span className={cn('truncate')}>{children}</span>
        )}
      </SimpleInlineButton>
      <ul
        className={cn(
          !isOpen && 'hidden',
          'absolute top-full left-0 w-full',
          'border border-bruise bg-gesso',
          'overflow-y-auto overflow-x-hidden overscroll-contain',
        )}
        style={{
          maxHeight: '16rem',
        }}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              key={itemToKey(item)}
              className={cn(
                'flex flex-row min-w-0',
                // general item pading
                'p-2',
                // highlighted state
                highlightedIndex === index && 'bg-smudge',
              )}
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
