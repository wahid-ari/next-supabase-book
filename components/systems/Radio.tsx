import clsx from 'clsx';

type Props = {
  id?: string;
  label?: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
  [props: string]: any;
};

export default function Radio({ id, label, name, value, onChange, defaultChecked, ...props }: Props) {
  return (
    <div className='group mb-3 flex items-center'>
      <input
        {...props}
        id={id}
        type='radio'
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        className={clsx(
          'h-4 w-4 border-neutral-300 focus:ring-2 focus:ring-emerald-500 group-hover:cursor-pointer',
          'text-emerald-600 dark:bg-neutral-900 dark:text-emerald-600 dark:checked:bg-emerald-600',
          'dark:border-neutral-700 dark:ring-offset-neutral-900 dark:focus:ring-emerald-600'
        )}
      />
      <label htmlFor={id} className='ml-2 text-sm text-neutral-800 group-hover:cursor-pointer dark:text-neutral-300'>
        {label}
      </label>
    </div>
  );
}

type DisabledProps = {
  label?: string;
  name: string;
  defaultChecked?: boolean;
  [props: string]: any;
};

Radio.disabled = ({ label, name, defaultChecked, ...props }: DisabledProps) => {
  return (
    <div className='group mb-3 flex items-center'>
      <input
        {...props}
        disabled
        id={name}
        name={name}
        defaultChecked={defaultChecked}
        type='radio'
        className={clsx(
          defaultChecked ? 'dark:bg-emerald-600' : 'dark:bg-transparent',
          'h-4 w-4 border-neutral-300 text-emerald-600 group-hover:cursor-not-allowed dark:border-neutral-700'
        )}
      />
      <label
        htmlFor={name}
        className='ml-2 text-sm text-neutral-800 group-hover:cursor-not-allowed dark:text-neutral-300'
      >
        {label}
      </label>
    </div>
  );
};
