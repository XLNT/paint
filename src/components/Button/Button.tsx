import React, { forwardRef, useRef, useState } from 'react';
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

interface ButtonProps extends AriaButtonProps, WithClassName {
  secondary?: boolean;
  tertiary?: boolean;
  active?: boolean;
  icon?: boolean;
  danger?: boolean;
}

interface ButtonState {
  disabled?: boolean;
  pressed: boolean;
  focused: boolean;
  hovered: boolean;
}

const transitionStyles = cn('transition-all duration-150');
const childStyles = cn('flex flex-row justify-center items-center min-w-0');
const focusStyles = cn('focus:outline-none');
const textStyles = cn('whitespace-no-wrap select-none font-sans tracking-button');

const primaryButtonStyles = ({
  disabled = false,
  pressed = false,
  focused = false,
  hovered = false,
  icon = false,
  danger = false,
}: Pick<ButtonProps, 'icon' | 'danger'> & ButtonState) =>
  cn(
    transitionStyles,
    focusStyles,
    textStyles,
    childStyles,
    icon && 'h-8 w-8',
    icon ? 'p-1' : 'px-2 space-x-2',
    'text-base',
    disabled ? 'text-concrete' : danger ? 'text-gesso' : 'text-bruise',
    'rounded border',
    disabled ? 'border-concrete' : danger ? 'border-gesso' : 'border-smudge',
    disabled ? 'bg-drywall' : danger ? 'bg-tomato' : hovered || pressed ? 'bg-gesso' : 'bg-gesso',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    !disabled && !pressed && (hovered || focused) && 'shadow-elevated',
  );

const secondaryButtonStyles = ({
  disabled = false,
  pressed = false,
  focused = false,
  hovered = false,
  icon = false,
  danger = false,
}: Pick<ButtonProps, 'icon' | 'danger'> & ButtonState) =>
  cn(
    transitionStyles,
    focusStyles,
    textStyles,
    childStyles,
    icon && 'h-6 w-6',
    !icon && 'px-2 space-x-2',
    'font-bold',
    disabled ? 'text-concrete' : danger ? 'text-gesso' : 'text-bruise',
    'rounded border',
    icon
      ? 'border-transparent'
      : disabled
      ? 'border-concrete'
      : pressed
      ? 'border-smudge'
      : focused
      ? danger
        ? 'border-gesso'
        : 'border-bruise'
      : 'border-transparent',
    danger && !disabled
      ? 'bg-tomato' //
      : (hovered || pressed || focused) && !disabled
      ? 'bg-gesso'
      : 'bg-gesso',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    !disabled && !pressed && (hovered || focused) && 'shadow-elevated',
  );

const tertiaryButtonStyles = ({
  disabled = false,
  pressed = false,
  hovered = false,
  danger = false,
}: Pick<ButtonProps, 'icon' | 'danger'> & ButtonState) =>
  cn(
    transitionStyles,
    focusStyles,
    textStyles,
    childStyles,
    'px-2',
    disabled ? 'text-concrete' : danger ? 'text-tomato' : undefined,
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    !disabled && (hovered || pressed) && 'underline',
  );

const buttonStyles = ({
  secondary = false,
  tertiary = false,
  ...rest
}: ButtonProps & ButtonState) => {
  const primary = !secondary && !tertiary;
  if (primary) {
    return primaryButtonStyles(rest);
  }

  if (secondary) {
    return secondaryButtonStyles(rest);
  }

  if (tertiary) {
    return tertiaryButtonStyles(rest);
  }

  throw new Error('nope');
};

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(props, outerRef) {
  const innerRef = useRef<HTMLElement>(null);
  const ref = mergeRefs([outerRef, innerRef]);
  const {
    elementType: ElementType = 'button',
    isDisabled,
    secondary,
    tertiary,
    icon,
    danger,
    active,
  } = props;

  const { isPressed, buttonProps } = useButton(props, ref);
  const { hoverProps, isHovered } = useHover(props);
  const [isFocused, setIsFocused] = useState(false);
  const { focusableProps } = useFocusable({ ...props, onFocusChange: setIsFocused }, ref);

  return (
    <FocusRing autoFocus={props.autoFocus}>
      <ElementType
        ref={ref}
        {...mergeProps(buttonProps, hoverProps, focusableProps, filterComponentProps(props), {
          className: buttonStyles({
            secondary,
            tertiary,
            icon,
            danger,
            disabled: isDisabled,
            pressed: isPressed,
            focused: active || isFocused,
            hovered: isHovered,
          }),
        })}
      />
    </FocusRing>
  );
});
