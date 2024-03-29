import { useState, useEffect } from 'react';
import clsx from 'clsx';

type Props = {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: any) => void;
  type?: string;
  className?: string;
  wrapperClassName?: string;
  debounce?: number;
  [props: string]: any;
};

export default function InputDebounce({
  name,
  label,
  placeholder,
  value: initialValue,
  onChange,
  type,
  className,
  wrapperClassName,
  debounce = 300,
  ...props
}: Props) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      <label className='block text-sm text-neutral-800 dark:text-neutral-300' htmlFor={name}>
        {label}
      </label>
      <input
        {...props}
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={clsx(
          className,
          'mt-2 w-full rounded-md border border-neutral-300 bg-white px-4 py-[0.6rem] text-sm',
          'font-medium outline-none ring-neutral-300 transition-all',
          'focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:border-neutral-600',
          'dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-600 dark:focus:border-orange-500',
          'dark:focus:ring-orange-500'
        )}
      />
    </div>
  );
}
