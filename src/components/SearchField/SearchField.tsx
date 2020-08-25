import React, { useRef } from 'react';
import { useSearchFieldState } from '@react-stately/searchfield';
import { useSearchField } from '@react-aria/searchfield';
import { AriaSearchFieldProps } from '@react-types/searchfield';
import { WithClassName } from '../..';

interface SearchFieldProps extends AriaSearchFieldProps, WithClassName {}

export function SearchField(props: SearchFieldProps) {
  const state = useSearchFieldState(props);
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useSearchField(props, state, ref as any);

  return <input ref={ref} {...inputProps} className={props.className} />;
}
