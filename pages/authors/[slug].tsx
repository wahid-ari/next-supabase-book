import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLinkIcon, PhotographIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useAuthorData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Heading from '@components/systems/Heading';
import FrontLayout from '@components/front/FrontLayout';
import nookies from 'nookies';
import AuthorBookItem from '@components/front/item/AuthorBookItem';

export async function getServerSideProps(context: any) {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { slug } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author?slug=${slug}&seo=true`).then((res) =>
    res.json()
  );
  return {
    props: {
      slug: slug,
      seo: res,
      fallback: {
        [`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author?slug=${slug}&seo=true`]: res,
      },
    }, // will be passed to the page component as props
  };
}

export default function Authors({ slug, seo }) {
  const { data, error } = useAuthorData(null, slug);
  const [isLoading, setLoading] = useState(true);

  if (error) {
    return (
      <Layout title='Author Detail - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <FrontLayout title={`${seo?.name + ' - MyBook'}`} description={`${seo?.description + ' - MyBook'}`}>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>{seo?.name}</Title>
      </div>

      {data ? (
        <div className='gap-6 sm:flex'>
          {data?.image ? (
            <div className='mx-auto w-3/5 overflow-hidden sm:mx-0 sm:w-1/4 lg:w-1/5'>
              <Image
                alt={data?.name}
                src={data?.image}
                width={250}
                height={250}
                className={`mx-auto w-52 rounded ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                onLoadingComplete={() => setLoading(false)}
                unoptimized
              />
            </div>
          ) : (
            <div className='mx-auto w-3/5 overflow-hidden sm:mx-0 sm:w-1/4 lg:w-1/5'>
              <div className='flex h-64 w-full items-center justify-center rounded bg-neutral-200 dark:bg-neutral-800'>
                <PhotographIcon className='h-16 w-16 text-neutral-500' />
              </div>
            </div>
          )}
          <div className='mt-6 w-full sm:mt-0 sm:w-3/4'>
            <div>
              <table className='text-[15px]'>
                <tbody>
                  <tr>
                    <td className='flex pb-2 pr-4 font-semibold'>Born</td>
                    <td className='w-full pb-2'>{data?.born ? data.born : '-'}</td>
                  </tr>
                  <tr>
                    <td className='flex pb-2 pr-4 font-semibold'>Website</td>
                    <td className='w-10 pb-2'>
                      {data?.web ? (
                        <a
                          href={data?.web}
                          className='flex w-16 items-center rounded text-[15px] font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Open
                          <ExternalLinkIcon className='ml-1 h-4 w-4' />
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className='flex pb-2 pr-4 font-semibold'>Goodreads</td>
                    <td className='pb-2'>
                      {data?.link ? (
                        <a
                          href={data?.link}
                          className='flex w-16 items-center rounded text-[15px] font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Open
                          <ExternalLinkIcon className='ml-1 h-4 w-4' />
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className='mt-4 text-[15px] leading-6 text-neutral-700 dark:text-neutral-200'>{data?.bio}</p>
            </div>

            {data?.books?.length > 0 && <hr className='my-8 h-px border-0 bg-neutral-300 dark:bg-neutral-700' />}

            {data?.books?.length > 0 ? (
              <div className='mt-5'>
                <Heading h3 className='mb-6'>
                  {data?.name} Books
                </Heading>
                {data?.books?.map((item: any) => {
                  return (
                    <AuthorBookItem
                      key={item.id}
                      href={`/books/${item.slug}`}
                      title={item.title}
                      imageSrc={item.image_small?.replace('SX50', 'SX150').replace('SY75', 'SX150')}
                      published={item.published}
                      language={item.language}
                    />
                  );
                })}
              </div>
            ) : null}

            {data?.quotes?.length > 0 && <hr className='mt-10 h-px border-0 bg-neutral-300 dark:bg-neutral-700' />}

            {data?.quotes?.length > 0 ? (
              <div className='mt-8'>
                <Heading h3 className='mb-6'>
                  {data?.name} Quotes
                </Heading>
                {data?.quotes.map((item: any, index: number) => {
                  return (
                    <div
                      key={item.id}
                      className={clsx(
                        'mb-4 pb-4',
                        index != data?.quotes?.length - 1 && 'border-b dark:border-b-neutral-700'
                      )}
                    >
                      <p className='text-[15px] font-medium text-neutral-900 dark:text-neutral-100'>
                        &#8220;{item.quote}&#8221;
                      </p>
                      <p className='mt-1 text-sm italic text-neutral-700 dark:text-neutral-300'>- {data?.name}</p>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className='gap-6 sm:flex'>
          <div className='mx-auto w-2/4 overflow-hidden sm:mx-0 sm:w-1/4 lg:w-1/5'>
            <Shimer className='!h-60' />
          </div>
          <div className='mt-6 w-full sm:mt-0 sm:w-3/4'>
            <Shimer className='!h-60' />
          </div>
        </div>
      )}
    </FrontLayout>
  );
}
