import React, { forwardRef, useRef, useState, cloneElement, ReactElement } from 'react';
import { AriaButtonProps } from '@react-types/button';
import { useButton } from '@react-aria/button';
import FocusRing from '../util/FocusRing';
import mergeRefs from 'react-merge-refs';
import { WithClassName } from '../../utils/WithClassName';
import { useFocusable } from '@react-aria/focus';
import { filterComponentProps } from '../../utils/filterComponentProps';
import { cn } from '../../utils/cn';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { Text } from '../Text/Text';

interface InlineButtonProps extends AriaButtonProps, WithClassName {
  icon?: ReactElement;
}

interface ButtonState {
  disabled?: boolean;
  pressed: boolean;
  focused: boolean;
  hovered: boolean;
}

const childStyles = cn(
  'flex-shrink-0',
  'flex flex-row justify-between items-center min-w-0 space-x-1',
);
const focusStyles = cn('focus:outline-none');
const textStyles = cn('whitespace-no-wrap select-none font-sans tracking-button truncate');

const inlineButtonStyles = ({
  disabled,
  hovered,
  pressed,
  focused,
}: InlineButtonProps & ButtonState) =>
  cn(
    focusStyles,
    textStyles,
    childStyles,
    'p-2',
    disabled ? 'text-concrete' : undefined,
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    hovered || pressed || focused ? 'bg-drywall' : 'bg-gesso',
  );

export const SimpleInlineButton = forwardRef<HTMLElement, InlineButtonProps>(
  function SimpleInlineButton(props, outerRef) {
    const innerRef = useRef<HTMLElement>(null);
    const ref = mergeRefs([outerRef, innerRef]);
    const { elementType: ElementType = 'button', isDisabled, children, icon } = props;

    const { hoverProps, isHovered } = useHover(props);
    const [isFocused, setIsFocused] = useState(false);
    const { focusableProps } = useFocusable({ ...props, onFocusChange: setIsFocused }, ref);

    return (
      <ElementType
        ref={ref}
        {...mergeProps(hoverProps, focusableProps, filterComponentProps(props), {
          className: inlineButtonStyles({
            disabled: isDisabled,
            pressed: false,
            focused: isFocused,
            hovered: isHovered,
          }),
        })}
      >
        {children && (
          <Text as="span" className={cn('flex-1', 'truncate')}>
            {children}
          </Text>
        )}
        {icon && cloneElement(icon, mergeProps(icon.props, { className: cn('flex-none') }))}
      </ElementType>
    );
  },
);

export const InlineButton = forwardRef<HTMLElement, InlineButtonProps>(function InlineButton(
  props,
  outerRef,
) {
  const innerRef = useRef<HTMLElement>(null);
  const ref = mergeRefs([outerRef, innerRef]);
  const { elementType: ElementType = 'button', isDisabled, children, icon } = props;

  const { isPressed, buttonProps } = useButton(props, ref);
  const { hoverProps, isHovered } = useHover(props);
  const [isFocused, setIsFocused] = useState(false);
  const { focusableProps } = useFocusable({ ...props, onFocusChange: setIsFocused }, ref);

  return (
    <FocusRing autoFocus={props.autoFocus}>
      <ElementType
        ref={ref}
        {...mergeProps(buttonProps, hoverProps, focusableProps, filterComponentProps(props), {
          className: inlineButtonStyles({
            disabled: isDisabled,
            pressed: isPressed,
            focused: isFocused,
            hovered: isHovered,
          }),
        })}
      >
        {children && (
          <Text as="span" className={cn('flex-1', 'truncate')}>
            {children}
          </Text>
        )}
        {icon && cloneElement(icon, mergeProps(icon.props, { className: cn('flex-none') }))}
      </ElementType>
    </FocusRing>
  );
});
