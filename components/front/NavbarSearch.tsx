import { useRef } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { SearchIcon } from '@heroicons/react/outline';

export default function NavbarSearch({ ...props }: { [props: string]: any }) {
  const query = useRef('');
  const router = useRouter();

  function handleSubmit(e: any) {
    e.preventDefault();
    if (query.current !== '') {
      router.push(`/browse?q=${query.current}`);
    } else {
      router.push(`/browse`);
    }
  }

  return (
    <form onSubmit={handleSubmit} {...props}>
      <label htmlFor='search' className='sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        Search
      </label>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2'>
          <SearchIcon className='h-5 w-5 text-gray-500 dark:text-gray-400' />
        </div>
        <input
          onChange={(e) => (query.current = e.target.value)}
          type='search'
          id='search'
          className={clsx(
            'block w-full rounded border border-neutral-200 p-2.5 pl-10 text-sm text-gray-900',
            'bg-gray-50 focus:border-orange-500 focus:ring-orange-500 dark:border-neutral-800 dark:bg-neutral-800',
            'dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-500 dark:focus:ring-orange-500',
            '!pr-20'
          )}
          placeholder='Search Title, Author, ISBN'
          required
        />
        <button
          type='submit'
          value='Submit'
          className={clsx(
            'absolute bottom-[5px] right-1 bg-orange-500 text-white hover:bg-orange-600',
            'rounded px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400',
            'dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-400'
          )}
        >
          Search
        </button>
      </div>
    </form>
  );
}
