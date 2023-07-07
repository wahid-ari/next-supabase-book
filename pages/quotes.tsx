import { ReactNode, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { PhotographIcon } from '@heroicons/react/outline';
import { useQuotesWithTagsData } from '@libs/swr';
import FrontLayout from '@components/front/FrontLayout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import InputDebounce from '@components/systems/InputDebounce';
import Button from '@components/systems/Button';

function Skeleton({ children }: { children: ReactNode }) {
  return (
    <div className='py-2'>
      <div className='flex items-center gap-4 pb-1'>
        <Shimer className='!h-14 !w-14 !rounded-full' />
        <div className='w-full'>{children}</div>
      </div>
      <Shimer className='!h-5 !w-[15%]' />
    </div>
  );
}

export default function Quotes() {
  const { data, error } = useQuotesWithTagsData();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const filtered =
    query === ''
      ? data
      : data.filter((item: any) =>
          item.author.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );
  let lastPage = page > filtered?.length / 18;
  const [isLoading, setLoading] = useState(true);
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  if (error) {
    return (
      <FrontLayout title='Quotes - MyBook' description='Browse Quotes - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout title='Quotes - MyBook' description='Browse Quotes - MyBook'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Title>Quotes</Title>
        <InputDebounce
          id='search'
          name='search'
          wrapperClassName='pt-2'
          placeholder='Search by Author'
          className='max-w-xs !py-2'
          debounce={500}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>

      <div className={clsx('mt-4', filtered && 'divide-y dark:divide-neutral-800')}>
        {filtered ? (
          filtered.slice(0, page * 18).map((item: any) => {
            return (
              <div key={item.id} className='py-4'>
                <p className='mb-1 text-justify text-base'>
                  <Link href={`/authors/${item?.author?.slug}`} className='rounded-full focus-visible:outline-none'>
                    <span className='relative float-left mr-4 h-14 w-14 overflow-hidden'>
                      {item.author.image ? (
                        <Image
                          alt={item.author.name}
                          src={item.author.image}
                          className={clsx(
                            'rounded-full object-cover brightness-90 group-hover:brightness-110',
                            'transform transition duration-500 ease-in-out will-change-auto',
                            isLoading ? 'blur-2xl' : 'blur-0'
                          )}
                          fill
                          sizes={sizes}
                          onLoadingComplete={() => setLoading(false)}
                          unoptimized
                        />
                      ) : (
                        <div className='flex h-full w-full items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800'>
                          <PhotographIcon className='h-16 w-16 text-neutral-500' />
                        </div>
                      )}
                    </span>
                  </Link>
                  &#8220;{item.quote}&#8221;
                </p>
                <Link
                  href={`/authors/${item?.author?.slug}`}
                  className={clsx(
                    'rounded text-[15px] font-medium italic transition-all duration-200',
                    'text-neutral-500 hover:text-orange-500 dark:text-neutral-300 dark:hover:text-orange-500',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                  )}
                >
                  - {item?.author?.name}
                </Link>
                <div className='mt-4 text-sm font-medium text-neutral-700 dark:text-neutral-200'>
                  Tags :{' '}
                  {item.tags.map((tag: any, i: number) => {
                    return (
                      <span key={tag.slug}>
                        <Link
                          href={`/tags/${tag.slug}`}
                          className='rounded text-sm font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                        >
                          {tag.name}
                        </Link>
                        {i < item.tags.length - 1 ? ', ' : ''}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <>
            <Skeleton>
              <Shimer className={`!h-12 !w-[50%]`} />
            </Skeleton>
            <Skeleton>
              <Shimer className={`!h-12 !w-[80%]`} />
            </Skeleton>
            <Skeleton>
              <Shimer className={`!h-12 !w-[40%]`} />
            </Skeleton>
            <Skeleton>
              <Shimer className={`!h-12 !w-[60%]`} />
            </Skeleton>
            <Skeleton>
              <Shimer className={`!h-12 !w-[90%]`} />
            </Skeleton>
          </>
        )}
      </div>

      {data && !lastPage && (
        <div className='mt-10 flex justify-center'>
          <Button onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
      )}

      {query !== '' && filtered?.length < 1 && (
        <p className='py-32 text-center'>There are no quotes with author name &quot;{query}&quot;</p>
      )}
    </FrontLayout>
  );
}
