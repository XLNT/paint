import { HTMLProps, PropsWithChildren } from 'react';
import { WithClassName } from '..';

interface AllowedComponentProps
  extends PropsWithChildren<{}>,
    WithClassName,
    Pick<HTMLProps<HTMLElement>, 'onKeyDown' | 'onClick'> {}

export function filterComponentProps(props: Record<string, any>): AllowedComponentProps {
  return {
    className: props.className,
    children: props.children,
    onKeyDown: props.onKeyDown,
    onClick: props.onClick,
  };
}
