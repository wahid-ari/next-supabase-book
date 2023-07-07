import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useTagTotalQuoteData } from '@libs/swr';
import FrontLayout from '@components/front/FrontLayout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import InputDebounce from '@components/systems/InputDebounce';

export default function Tags() {
  const { data, error } = useTagTotalQuoteData();
  const [query, setQuery] = useState('');
  const filtered =
    query === ''
      ? data
      : data.filter((item: any) =>
          item.label.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  if (error) {
    return (
      <FrontLayout title='Tags - MyBook' description='Browse Tags - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout title='Tags - MyBook' description='Browse Tags - MyBook'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Title>Tags</Title>
        <InputDebounce
          id='search'
          name='search'
          wrapperClassName='pt-2'
          placeholder='Search Tag'
          className='max-w-xs !py-2'
          debounce={500}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>

      <div className='mt-4 grid grid-cols-2 gap-4 min-[560px]:grid-cols-3 sm:gap-6 md:grid-cols-4 xl:grid-cols-6'>
        {filtered
          ? filtered.map((item: any) => {
              return (
                <Link
                  key={item.id}
                  href={`/tags/${item.slug}`}
                  className={clsx(
                    'flex items-center justify-between rounded border p-3 text-[15px] font-medium',
                    'text-neutral-600 shadow transition-all duration-300 hover:text-orange-500',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                    'dark:border-neutral-800 dark:bg-[#1a1919] dark:text-neutral-200 dark:hover:text-orange-500'
                  )}
                >
                  <span>{item.label}</span>
                  {item.total}
                </Link>
              );
            })
          : [...Array(12).keys()].map((item) => <Shimer key={item} className='!h-12' />)}
      </div>

      {query !== '' && filtered?.length < 1 && (
        <p className='py-32 text-center'>There are no tags with name &quot;{query}&quot;</p>
      )}
    </FrontLayout>
  );
}
