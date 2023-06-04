import { useState } from 'react';
import Image from 'next/image';
import { useAuthorData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import nookies from 'nookies';
import { ExternalLinkIcon, PhotographIcon } from '@heroicons/react/outline';

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  // const cookies = nookies.get(context);
  // if (!cookies.token) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //     },
  //   };
  // }
  return {
    props: {
      id: id,
    }, // will be passed to the page component as props
  };
}

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
              <div className='flex h-64 w-full items-center justify-center rounded-t bg-neutral-200 dark:bg-neutral-800'>
                <PhotographIcon className='h-16 w-16 text-neutral-500' />
              </div>
            </div>
          )}
          <div className='mt-6 w-full sm:mt-0 sm:w-3/4'>
            <div>
              <table className='text-[15px]'>
                <tr>
                  <td className='flex pb-2 pr-4 font-semibold'>Born</td>
                  <td className='pb-2'>{data?.born ? data.born : '-'}</td>
                </tr>
                <tr>
                  <td className='flex pb-2 pr-4 font-semibold'>Website</td>
                  <td className='pb-2'>
                    {data?.web ? (
                      <a
                        href={data?.web}
                        className='rounded text-[15px] font-medium text-emerald-500 transition-all duration-200 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
                        target='_blank'
                        rel='noreferrer'
                      >
                        {data?.web}
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
                        className='flex w-16 items-center rounded text-[15px] font-medium text-emerald-500 transition-all duration-200 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
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
              </table>
              <p className='mt-4 text-[15px] leading-6 text-neutral-700 dark:text-neutral-200'>{data?.bio}</p>
            </div>
          </div>
          {/* TODO Add Book Section */}
          {/* TODO Add Quote Section */}
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