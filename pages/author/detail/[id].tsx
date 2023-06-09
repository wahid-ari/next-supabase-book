import { useState } from 'react';
import Image from 'next/image';
import { useAuthorData } from '@libs/swr';
import { ExternalLinkIcon, PhotographIcon } from '@heroicons/react/outline';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Heading from '@components/systems/Heading';
import Link from 'next/link';
import clsx from 'clsx';

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  return {
    props: {
      id: id,
    }, // will be passed to the page component as props
  };
}

Author.auth = true;
export default function Author({ id }) {
  const { data, error } = useAuthorData(id);
  const [isLoading, setLoading] = useState(true);

  if (error) {
    return (
      <Layout title='Author Detail - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`${data ? data?.name + ' - MyBook' : 'Author Detail - MyBook'}`}>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name}</Title> : <Title>Author Detail</Title>}
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
                {data?.books.map((item: any) => {
                  return (
                    <Link
                      key={item.id}
                      href={`/book/detail/${item.id}`}
                      className='group mb-5 flex gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                    >
                      {item.image_small ? (
                        <Image
                          alt={item.title}
                          src={item.image_small?.replace('SX50', 'SX150').replace('SY75', 'SX150')}
                          width={50}
                          height={70}
                          className={`w-14 rounded object-cover brightness-90 group-hover:brightness-100 ${
                            isLoading ? 'blur-2xl' : 'blur-0'
                          }`}
                          onLoadingComplete={() => setLoading(false)}
                          unoptimized
                        />
                      ) : (
                        <div className='flex h-[72px] w-12 items-center justify-center rounded bg-neutral-200 dark:bg-neutral-800'>
                          <PhotographIcon className='h-8 w-8 text-neutral-500' />
                        </div>
                      )}
                      <div>
                        <p className='text-[15px] font-medium text-neutral-700 transition-all duration-200 group-hover:text-orange-500 dark:text-neutral-100 '>
                          {item.title}
                        </p>
                        <p className='text-sm text-neutral-600 dark:text-neutral-200'>
                          {item.published ? item.published.split('-')[0] : '-'}
                        </p>
                      </div>
                    </Link>
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
    </Layout>
  );
}
