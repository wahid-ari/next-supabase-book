import clsx from 'clsx';

type Props = {
  className?: string;
  percent: number;
};

export default function Progress({ className, percent }: Props) {
  return (
    <div className={clsx(className, 'h-1 w-full rounded-full bg-gray-200 dark:bg-neutral-800')}>
      <div className='h-1 rounded-full bg-emerald-600 dark:bg-emerald-500' style={{ width: `${percent}%` }}></div>
    </div>
  );
}

Progress.percentage = ({ className, percent }: Props) => {
  return (
    <div className='w-full rounded-full bg-gray-200 dark:bg-neutral-800'>
      {percent > 0 ? (
        <div
          className={clsx(
            'rounded-full bg-emerald-600 p-0.5 text-center text-xs font-medium leading-none text-emerald-100',
            className
          )}
          style={{ width: percent + '%' }}
        >
          {percent} %
        </div>
      ) : (
        <div
          className='rounded-full p-0.5 text-center text-xs font-medium leading-none text-gray-800 dark:text-neutral-200'
          style={{ width: percent + '%' }}
        >
          0%
        </div>
      )}
    </div>
  );
};
