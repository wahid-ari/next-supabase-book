import { useQuoteData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import nookies from 'nookies';
import Link from 'next/link';

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

export default function Quote({ id }) {
  const { data, error } = useQuoteData(id);

  if (error) {
    return (
      <Layout title='Quote Detail - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`${data ? 'Quote by ' + data?.book_authors?.name + ' - MyBook' : 'Quote Detail - MyBook'}`}>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>Quote by {data?.book_authors?.name}</Title> : <Title>Quote Detail</Title>}
      </div>

      {data ? (
        <div>
          <p className='mb-1 text-base'>&#8220;{data.quote}&#8221;</p>
          <Link
            href={`author/detail/${data?.book_authors?.id}`}
            className='rounded text-base font-medium italic transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
          >
            - {data?.book_authors?.name}
          </Link>
          <div className='mt-4'>
            <p className='font-medium text-neutral-700 dark:text-neutral-200'>
              Tags :{' '}
              {data?.tags_array.map((item: any, index: number) => {
                return (
                  <>
                    <Link
                      key={index + 1}
                      href={`/tag/detail/${item.id}`}
                      className='rounded text-[15px] font-medium text-emerald-500 transition-all duration-200 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
                    >
                      {item.name}
                    </Link>
                    {index < data.tags_array.length - 1 ? ', ' : ''}
                  </>
                );
              })}
            </p>
          </div>
        </div>
      ) : (
        <Shimer className='!h-60' />
      )}
    </Layout>
  );
}
