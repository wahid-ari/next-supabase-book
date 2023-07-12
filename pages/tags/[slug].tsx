import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PhotographIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useTagData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import FrontLayout from '@components/front/FrontLayout';
import InputDebounce from '@components/systems/InputDebounce';
import Button from '@components/systems/Button';

export async function getServerSideProps(context: any) {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { slug } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/tag?slug=${slug}&seo=true`).then((res) =>
    res.json()
  );
  return {
    props: {
      slug: slug,
      seo: res,
      fallback: {
        [`${process.env.NEXT_PUBLIC_API_ROUTE}/api/tag?slug=${slug}&seo=true`]: res,
      },
    }, // will be passed to the page component as props
  };
}

export default function Tags({ slug, seo }) {
  const { data, error } = useTagData(null, slug);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const filtered =
    query === ''
      ? data?.quotes_by_tags
      : data?.quotes_by_tags?.filter((item: any) =>
          item.book_authors.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );
  let lastPage = page > filtered?.length / 18;
  const [isLoading, setLoading] = useState(true);
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  if (error) {
    return (
      <Layout title='Tag Detail - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <FrontLayout title={`${seo?.name + ' Quotes - MyBook'}`} description={`Browse ${seo?.name + ' Quotes - MyBook'}`}>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Title>{seo.name} Quotes</Title>
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
                  <Link
                    href={`/authors/${item?.book_authors?.slug}`}
                    className='rounded-full focus-visible:outline-none'
                  >
                    <span className='relative float-left mr-4 h-14 w-14 overflow-hidden'>
                      {item.book_authors.image ? (
                        <Image
                          alt={item.book_authors.name}
                          src={item.book_authors.image}
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
                  href={`/authors/${item?.book_authors?.slug}`}
                  className={clsx(
                    'rounded text-[15px] font-medium italic transition-all duration-200',
                    'text-neutral-500 hover:text-orange-500 dark:text-neutral-300 dark:hover:text-orange-500',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                  )}
                >
                  - {item?.book_authors?.name}
                </Link>
              </div>
            );
          })
        ) : (
          <>
            <div className='flex items-center gap-4 py-2'>
              <Shimer className='!h-14 !w-14 !rounded-full' />
              <div className='w-full'>
                <Shimer className='!h-12 !w-[50%]' />
              </div>
            </div>
            <div className='flex items-center gap-4 py-2'>
              <Shimer className='!h-14 !w-14 !rounded-full' />
              <div className='w-full'>
                <Shimer className='!h-12 !w-[60%]' />
              </div>
            </div>
            <div className='flex items-center gap-4 py-2'>
              <Shimer className='!h-14 !w-14 !rounded-full' />
              <div className='w-full'>
                <Shimer className='!h-12 !w-[70%]' />
              </div>
            </div>
            <div className='flex items-center gap-4 py-2'>
              <Shimer className='!h-14 !w-14 !rounded-full' />
              <div className='w-full'>
                <Shimer className='!h-12 !w-[80%]' />
              </div>
            </div>
            <div className='flex items-center gap-4 py-2'>
              <Shimer className='!h-14 !w-14 !rounded-full' />
              <div className='w-full'>
                <Shimer className='!h-12 !w-[100%]' />
              </div>
            </div>
            <div className='flex items-center gap-4 py-2'>
              <Shimer className='!h-14 !w-14 !rounded-full' />
              <div className='w-full'>
                <Shimer className='!h-12 !w-[50%]' />
              </div>
            </div>
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
