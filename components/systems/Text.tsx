import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
  [props: string]: any;
};

export default function Text({ className, children, ...props }: Props) {
  return (
    <p {...props} className={clsx('text-sm text-neutral-700 dark:text-neutral-200', className)}>
      {children}
    </p>
  );
}

Text.light = ({ className, children, ...props }: Props) => {
  return (
    <p
      {...props}
      className={clsx('font-light text-sm text-neutral-700 dark:text-neutral-200', className)}
    >
      {children}
    </p>
  );
};

Text.medium = ({ className, children, ...props }: Props) => {
  return (
    <p
      {...props}
      className={clsx('font-medium text-sm text-neutral-700 dark:text-neutral-200', className)}
    >
      {children}
    </p>
  );
};

Text.semibold = ({ className, children, ...props }: Props) => {
  return (
    <p
      {...props}
      className={clsx('font-semibold text-sm text-neutral-700 dark:text-neutral-200', className)}
    >
      {children}
    </p>
  );
};

Text.bold = ({ className, children, ...props }: Props) => {
  return (
    <p
      {...props}
      className={clsx('font-bold text-sm text-neutral-700 dark:text-neutral-200', className)}
    >
      {children}
    </p>
  );
};

Text.extrabold = ({ className, children, ...props }: Props) => {
  return (
    <p
      {...props}
      className={clsx('font-extrabold text-sm text-neutral-700 dark:text-neutral-200', className)}
    >
      {children}
    </p>
  );
};
