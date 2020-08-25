import React, { useRef } from 'react';
import { useListState, ListState } from '@react-stately/list';
import { useListBox, useOption, useListBoxSection } from '@react-aria/listbox';
import { useSeparator } from '@react-aria/separator';
import { useFocusRing } from '@react-aria/focus';
import { AriaListBoxProps } from '@react-types/listbox';
import { Node } from '@react-types/shared';
import { mergeProps } from '@react-aria/utils';
import { WithClassName } from '../..';
import { cn } from '../../utils/cn';

interface ListBoxProps<T> extends AriaListBoxProps<T>, WithClassName {}

export function ListBox<T extends object>(props: ListBoxProps<T>) {
  const { className } = props;
  const ref = useRef(null);
  const state = useListState(props);
  const { listBoxProps } = useListBox(props, state, ref);

  return (
    <ul
      ref={ref}
      className={cn(
        className,
        // 'flex flex-col',
        'overflow-y-auto overflow-x-hidden overscroll-contain',
      )}
      {...listBoxProps}
    >
      {Array.from(state.collection).map((node) => (
        <ListBox.Node key={node.key} node={node} state={state} />
      ))}
    </ul>
  );
}

ListBox.Node = function ListBoxNode<T>({ node, state }: { node: Node<T>; state: ListState<T> }) {
  switch (node.type) {
    case 'section':
      return <ListBox.Section section={node} state={state} />;
    case 'item':
      return <ListBox.Option item={node} state={state} />;
    default:
      return null;
  }
};

ListBox.Section = function ListBoxSection<T>({
  section,
  state,
}: {
  section: Node<T>;
  state: ListState<T>;
}) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  const { separatorProps } = useSeparator({
    elementType: 'li',
  });

  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li {...separatorProps} className={cn('border-t border-smudge')} />
      )}
      <li {...itemProps}>
        {section.rendered && <span {...headingProps}>{section.rendered}</span>}
        <ul {...groupProps}>
          {Array.from(section.childNodes).map((node) => (
            <ListBox.Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
};

ListBox.Option = function ListBoxOption<T>({
  item,
  state,
}: {
  item: Node<T>;
  state: ListState<T>;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      isSelected,
    },
    state,
    ref,
  );

  // Determine whether we should show a keyboard
  // focus ring for accessibility
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      className={cn(
        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
        isSelected && 'bg-smudge',
        isFocusVisible && 'shadow-outline',
      )}
    >
      {item.rendered}
    </li>
  );
};
