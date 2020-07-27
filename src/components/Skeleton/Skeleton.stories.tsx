import React from 'react';
import Skeleton from './Skeleton';
import { cn } from '../../utils/cn';
import AspectRatio from '../AspectRatio/AspectRatio';

export default {
  title: 'Skeleton',
};

export const Text = () => <Skeleton className={cn('h-4 w-48')} />;

export const Block = () => (
  <AspectRatio aspectRatio={1}>
    <Skeleton className={cn('h-full w-full')} />
  </AspectRatio>
);
