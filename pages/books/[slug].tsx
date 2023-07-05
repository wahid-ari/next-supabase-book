import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLinkIcon, PhotographIcon } from '@heroicons/react/outline';
import { useBookData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Heading from '@components/systems/Heading';
import ShowMore from '@components/systems/ShowMore';
import FrontLayout from '@components/front/FrontLayout';
import nookies from 'nookies';

export async function getServerSideProps(context: any) {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { slug } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/book?slug=${slug}&seo=true`).then((res) =>
    res.json()
  );
  return {
    props: {
      slug: slug,
      seo: res,
      fallback: {
        [`${process.env.NEXT_PUBLIC_API_ROUTE}/api/book?slug=${slug}&seo=true`]: res,
      },
    }, // will be passed to the page component as props
  };
}

export default function Book({ slug, seo }) {
  const { data, error } = useBookData(null, slug);
  const [isLoading, setLoading] = useState(true);

  if (error) {
    return (
      <Layout title='Book Detail - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <FrontLayout title={`${seo?.title + ' - MyBook'}`} description={`${seo?.description + ' - MyBook'}`}>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>{seo?.title}</Title>
      </div>

      {data ? (
        <div className='gap-8 sm:flex'>
          {data?.image ? (
            <div className='top-16 mx-auto w-3/5 self-start overflow-hidden sm:sticky sm:mx-0 sm:w-1/4 lg:w-1/5'>
              <Image
                alt={data?.title}
                src={data?.image.replace('SY75_', '')}
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
                    <td className='flex pb-2 pr-4 font-semibold'>ISBN</td>
                    <td className='pb-2'>{data?.isbn ? data.isbn : '-'}</td>
                  </tr>
                  <tr>
                    <td className='flex pb-2 pr-4 font-semibold'>Language</td>
                    <td className='pb-2'>{data?.language ? data.language : '-'}</td>
                  </tr>
                  <tr>
                    <td className='flex pb-2 pr-4 font-semibold'>Pages</td>
                    <td className='pb-2'>{data?.pages ? data.pages : '-'}</td>
                  </tr>
                  <tr>
                    <td className='flex pb-2 pr-4 font-semibold'>Published</td>
                    <td className='pb-2'>{data?.published ? data.published : '-'}</td>
                  </tr>
                  <tr>
                    <td className='flex pb-2 pr-4 font-semibold'>Genre</td>
                    <td className='pb-2'>
                      <p className='font-medium text-neutral-700 dark:text-neutral-200'>
                        {data?.genre_array.map((item: any, index: number) => {
                          return (
                            <span key={index + 1}>
                              <Link
                                href={`/genres/${item.slug}`}
                                className='rounded text-[15px] font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                              >
                                {item.name}
                              </Link>
                              {index < data.genre_array.length - 1 ? ', ' : ''}
                            </span>
                          );
                        })}
                        {data.genre_array?.length < 1 && '-'}
                      </p>
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
              <p className='mt-4 text-[15px] leading-6 text-neutral-700 dark:text-neutral-200'>{data?.description}</p>

              <hr className='my-8 h-px border-0 bg-neutral-300 dark:bg-neutral-700' />
              <Heading h2>About the author</Heading>
              <div className='flex items-center gap-3'>
                {data?.book_authors?.image ? (
                  <Link
                    href={`/authors/${data?.book_authors?.slug}`}
                    className='rounded text-base font-medium text-neutral-900 transition-all duration-200 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-neutral-100'
                  >
                    <Image
                      alt={data?.book_authors?.name}
                      src={data?.book_authors?.image}
                      width={50}
                      height={50}
                      className={`h-20 w-20 rounded-full object-cover brightness-90 transition-all duration-300 hover:brightness-100 ${
                        isLoading ? 'blur-2xl' : 'blur-0'
                      }`}
                      onLoadingComplete={() => setLoading(false)}
                      unoptimized
                    />
                  </Link>
                ) : (
                  <div className='flex h-20 w-20 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800'>
                    <PhotographIcon className='h-8 w-8 text-neutral-500' />
                  </div>
                )}
                <div>
                  <Link
                    href={`/authors/${data?.book_authors?.slug}`}
                    className='rounded text-base font-medium text-neutral-900 transition-all duration-200 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-neutral-100 dark:hover:text-orange-500'
                  >
                    {data?.book_authors?.name}
                  </Link>
                  {data?.book_authors?.web ? (
                    <a
                      href={data?.book_authors?.web}
                      className='mt-1 flex w-16 items-center rounded text-[15px] font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Web
                      <ExternalLinkIcon className='ml-1 h-4 w-4' />
                    </a>
                  ) : null}
                </div>
              </div>
              {data?.book_authors?.bio ? (
                <ShowMore count={400} className='mt-4 text-[15px] leading-6 text-neutral-700 dark:text-neutral-200'>
                  {data?.book_authors?.bio}
                </ShowMore>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className='gap-8 sm:flex'>
          <div className='mx-auto w-2/4 overflow-hidden sm:mx-0 sm:w-1/4 lg:w-1/5'>
            <Shimer className='!h-72' />
          </div>
          <div className='mt-6 w-full sm:mt-0 sm:w-3/4'>
            <Shimer className='!h-72' />
          </div>
        </div>
      )}
    </FrontLayout>
  );
}
