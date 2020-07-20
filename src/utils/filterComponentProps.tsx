import { ReactNode } from 'react';

interface AllowedComponentProps {
  className?: string;
  children?: ReactNode;
}

export function filterComponentProps(props: Record<string, any>): AllowedComponentProps {
  return {
    className: props.className,
    children: props.children,
  };
}
