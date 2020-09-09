import React, { ReactElement, cloneElement } from 'react';
import { cn } from '../../utils/cn';
import { WithClassName } from '../../utils/WithClassName';
import { mergeProps } from '@react-aria/utils';

interface ExplorerProps extends WithClassName {
  start: ReactElement;
  middle: ReactElement;
  end: ReactElement;
  top?: ReactElement;
  topPopunder?: ReactElement;
  bottom?: ReactElement;
  bottomPopunder?: ReactElement;
  children?: any;
}

export enum BorderState {
  None,
  Selected,
  Unselected,
}

export const buttonBorderForState = (state: BorderState) =>
  cn('border border-transparent', {
    'border-l-bruise border-t-bruise border-r-bruise border-b-transparent':
      state === BorderState.Selected,
    'border-b-bruise': state === BorderState.Unselected,
  });

const popunderStyle = cn(
  'absolute top-full left-0 right-0 max-h-popunder',
  'bg-gesso',
  'border-l border-r border-b border-bruise',
  'overflow-y-scroll touch-action-pan-y overscroll-contain',
);

export function Explorer({
  className,
  start,
  middle,
  end,
  top,
  topPopunder,
  bottom,
  bottomPopunder,
  children,
}: ExplorerProps) {
  return (
    <div className={cn(className, 'bg-gesso', 'flex flex-col min-w-0 min-h-0')}>
      {cloneElement(
        top ?? <div />,
        mergeProps(top?.props, {
          className: cn('relative', 'flex flex-row items-stretch min-w-0 min-h-0'),
        }),
        [
          cloneElement(
            start,
            mergeProps(start.props, { key: 'start', className: cn('flex-none') }),
          ),
          cloneElement(
            middle,
            mergeProps(middle.props, { key: 'middle', className: cn('flex-1', 'p-1') }),
          ),
          cloneElement(end, mergeProps(end.props, { key: 'end', className: cn('flex-none') })),
          topPopunder &&
            cloneElement(
              topPopunder,
              mergeProps(topPopunder.props, {
                key: 'popunder',
                className: cn(popunderStyle, 'z-20'),
              }),
            ),
        ],
      )}
      {children &&
        cloneElement(
          bottom ?? <div />,
          mergeProps(bottom?.props, {
            className: cn(
              'relative',
              'flex flex-row items-stretch min-w-0 min-h-0',
              'border-t border-smudge',
            ),
          }),
          [
            children &&
              React.Children.map(
                children,
                (child: ReactElement, i) =>
                  child &&
                  cloneElement(
                    child as ReactElement,
                    mergeProps(child.props, {
                      className: cn('flex-1', i > 0 && 'border-l border-l-smudge'),
                    }),
                  ),
              ),
            bottomPopunder &&
              cloneElement(
                bottomPopunder,
                mergeProps(bottomPopunder.props, {
                  key: 'popunder',
                  className: cn(popunderStyle, 'z-10'),
                }),
              ),
          ],
        )}
    </div>
  );
}
