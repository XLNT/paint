import React, { forwardRef, useRef, useState } from 'react';
import { AriaButtonProps } from '@react-types/button';
import { useButton } from '@react-aria/button';
import FocusRing from '../util/FocusRing';
import mergeRefs from 'react-merge-refs';
import { WithClassName } from '../../utils/WithClassName';
import { useFocusable } from '@react-aria/focus';
import { mergeProps } from '../../utils/mergeProps';
import { filterComponentProps } from '../../utils/filterComponentProps';
import { cn } from '../../utils/cn';
import { useHover } from '@react-aria/interactions';

interface ButtonProps extends AriaButtonProps, WithClassName {
  secondary?: boolean;
  tertiary?: boolean;
  active?: boolean;
  icon?: boolean;
  danger?: boolean;
  // TODO: remove when AriaButtonProps supports rel attribute
  // https://github.com/adobe/react-spectrum/issues/833
  rel?: string;
}

interface ButtonState {
  disabled?: boolean;
  pressed: boolean;
  focused: boolean;
  hovered: boolean;
}

const transitionStyles = cn('transition-all duration-150');
const childStyles = cn('flex flex-row justify-center items-center');
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
    icon ? 'p-1' : 'py-1 px-4 space-x-2',
    'text-base',
    disabled ? 'text-concrete' : danger ? 'text-gesso' : 'text-bruise',
    'rounded border',
    disabled ? 'border-concrete' : danger ? 'border-gesso' : 'border-smudge',
    disabled
      ? 'bg-transparent'
      : danger
      ? 'bg-tomato'
      : hovered || pressed
      ? 'bg-gesso'
      : 'bg-transparent',
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
      : (hovered || pressed || focused) && !disabled && 'bg-gesso',
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
  const { elementType: ElementType = 'button' } = props;
  const { isPressed, buttonProps } = useButton(props, ref);

  const [isHovered, setIsHovered] = useState(false);
  const { hoverProps } = useHover({ ...props, onHoverChange: setIsHovered });

  const [isFocused, setIsFocused] = useState(false);
  const { focusableProps } = useFocusable({ ...props, onFocusChange: setIsFocused }, ref);

  return (
    <FocusRing autoFocus={props.autoFocus}>
      <ElementType
        ref={ref}
        {...mergeProps(
          buttonProps,
          hoverProps,
          focusableProps,
          // TODO: remove when useButton supports rel passthrough
          { rel: props.elementType === 'a' ? props.rel : undefined },
          filterComponentProps(props),
          {
            className: buttonStyles({
              secondary: props.secondary,
              tertiary: props.tertiary,
              icon: props.icon,
              danger: props.danger,
              disabled: props.isDisabled,
              pressed: isPressed,
              focused: props.active || isFocused,
              hovered: isHovered,
            }),
          },
        )}
      />
    </FocusRing>
  );
});
