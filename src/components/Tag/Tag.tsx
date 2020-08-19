import React, { forwardRef, useRef, useState } from 'react';
import { WithClassName } from '../../utils/WithClassName';
import { AriaButtonProps } from '@react-types/button';
import useMergedRef from '@react-hook/merged-ref';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { useFocusable } from '@react-aria/focus';
import FocusRing from '../util/FocusRing';
import { cn } from '../../utils/cn';
import { filterComponentProps } from '../../utils/filterComponentProps';
import { mergeProps } from '@react-aria/utils';

interface TagProps extends AriaButtonProps, WithClassName {
  active?: boolean;
}

interface TagState {
  disabled?: boolean;
  pressed: boolean;
  focused: boolean;
  hovered: boolean;
}

const tagStyles = ({
  disabled = false,
  pressed = false,
  focused = false,
  hovered = false,
}: TagState) =>
  cn(
    'transition-all duration-150',
    'px-2 py-1 space-x-1',
    'focus:outline-none whitespace-no-wrap',
    disabled ? 'bg-transparent' : 'bg-gesso',
    'rounded border',
    disabled && 'text-concrete',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    disabled
      ? 'border-transparent'
      : pressed
      ? 'border-smudge'
      : focused
      ? 'border-bruise'
      : 'border-transparent',
    !disabled && !pressed && (hovered || focused) && 'shadow-elevated',
    'flex flex-row justify-center items-center',
  );

export const Tag = forwardRef<HTMLButtonElement, TagProps>(function Tag(props, outerRef) {
  const innerRef = useRef<HTMLElement>(null);
  const ref = useMergedRef(outerRef, innerRef);
  const { elementType: ElementType = 'button' } = props;

  const { isPressed, buttonProps } = useButton(props, ref);
  const { hoverProps, isHovered } = useHover(props);

  const [isFocused, setIsFocused] = useState(false);
  const { focusableProps } = useFocusable({ ...props, onFocusChange: setIsFocused }, ref);

  return (
    <FocusRing autoFocus={props.autoFocus}>
      <ElementType
        ref={ref}
        {...mergeProps(buttonProps, hoverProps, focusableProps, filterComponentProps(props), {
          className: tagStyles({
            disabled: props.isDisabled,
            pressed: isPressed,
            focused: props.active || isFocused,
            hovered: isHovered,
          }),
        })}
      />
    </FocusRing>
  );
});
