import React, { cloneElement, ReactNode, ReactElement } from 'react';
import useToggle from 'react-use/lib/useToggle';
import { cn } from '../../utils/cn';

export function BranchingButton({
  action,
  cancel,
  children,
}: {
  action: ReactElement;
  cancel: ReactElement;
  children: ReactNode;
}) {
  const [open, toggle] = useToggle(false);

  return (
    <div className={cn('flex flex-row items-center', 'space-x-2')}>
      {open ? (
        <>
          {children}
          {cloneElement(cancel, { onPress: toggle })}
        </>
      ) : (
        cloneElement(action, { onPress: toggle })
      )}
    </div>
  );
}
