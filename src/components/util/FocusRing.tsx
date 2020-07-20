import React, { PropsWithChildren, ReactElement } from 'react';
import { FocusRingProps, useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { cn } from '../../utils/cn';

function FocusRing({ children, ...props }: PropsWithChildren<FocusRingProps>) {
  const { isFocused, isFocusVisible, focusProps } = useFocusRing(props);
  const child = React.Children.only(children) as ReactElement<any>;

  return React.cloneElement(
    child,
    mergeProps(child.props, {
      ...focusProps,
      className: cn({
        'focus:outline-none focus:shadow-outline': isFocusVisible,
      }),
    }),
  );
}

export default FocusRing;
