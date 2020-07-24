import React, { ElementType, forwardRef, Ref, HTMLAttributes } from 'react';
import { mergeProps } from '@react-aria/utils';

export default function makeBasicElement<
  TElementType extends HTMLElement,
  TProps extends HTMLAttributes<TElementType> = HTMLAttributes<TElementType>
>(baseAs: ElementType<any>, className?: string, defaultProps: HTMLAttributes<TElementType> = {}) {
  type ElementProps = TProps & { as?: ElementType<any> };
  function Element({ as: newAs, ...extra }: ElementProps, ref: Ref<TElementType>) {
    const As = newAs || baseAs;
    return <As ref={ref} {...mergeProps(defaultProps, extra, { className })} />;
  }

  Element.displayName = `Paint(${baseAs.toString()})`;

  return forwardRef<TElementType, ElementProps>(Element as any);
}
