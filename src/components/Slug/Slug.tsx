import React, { HTMLAttributes } from 'react';
import { SlugText } from '../Text/Text';

export function Slug({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <SlugText {...rest}>/{children}</SlugText>;
}
