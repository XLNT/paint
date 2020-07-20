import React, { ElementType, forwardRef, Ref, HTMLProps } from 'react';
import { mergeProps } from '../../utils/mergeProps';

export default function makeBasicElement<
  TElementType extends HTMLElement,
  TProps extends HTMLProps<TElementType> = HTMLProps<TElementType>
>(baseAs: ElementType<any>, className?: string, defaultProps: HTMLProps<TElementType> = {}) {
  function Element(
    { as: newAs, ...extra }: TProps & { as?: ElementType<any> },
    ref: Ref<TElementType>,
  ) {
    const As = newAs || baseAs;
    return <As ref={ref} {...mergeProps(defaultProps, extra, { className })} />;
  }

  Element.displayName = `Paint(${baseAs.toString()})`;

  return forwardRef<TElementType, TProps>(Element as any);
}
