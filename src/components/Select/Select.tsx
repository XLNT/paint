import React, { PropsWithChildren, ReactNode, ReactElement, cloneElement } from 'react';
import { WithClassName } from '../../utils/WithClassName';
import { InlineButton } from '../InlineButton/InlineButton';
import { cn } from '../../utils/cn';
import { useSelect } from 'downshift';

export interface SelectItem {
  value: string;
}

interface SelectProps<TSelectItem> extends PropsWithChildren<{}>, WithClassName {
  items: TSelectItem[];
  renderItem: (state: { item: TSelectItem; selected?: boolean; active?: boolean }) => ReactNode;

  expandIcon: ReactElement;
  collapseIcon: ReactElement;
  cancelIcon: ReactElement;
}

const itemToString = (item: SelectItem | null) => item?.value ?? '';

export function Select<TSelectItem extends SelectItem>({
  items,
  renderItem,
  className,
  children,
  expandIcon,
  collapseIcon,
  cancelIcon,
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
          isOpen
            ? collapseIcon
            : selectedItem
            ? // TODO: a11y clear button
              cloneElement(cancelIcon, {
                onClick: (e: any) => {
                  e.stopPropagation();
                  reset();
                },
              })
            : expandIcon
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
              className={cn('p-2', highlightedIndex === index && 'bg-smudge')}
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
