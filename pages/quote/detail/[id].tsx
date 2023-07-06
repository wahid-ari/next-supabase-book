import Link from 'next/link';
import { useQuoteData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import nookies from 'nookies';

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
          <blockquote className='relative'>
            <svg
              className='absolute left-0 top-0 h-16 w-16 -translate-x-2 -translate-y-6 transform text-neutral-200 dark:text-neutral-700'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
            >
              <path
                d='M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z'
                fill='currentColor'
              />
            </svg>

            <div className='relative z-10'>
              <p className='max-w-xl pb-2 pl-4 pt-2 text-base text-neutral-700 dark:text-neutral-200 sm:text-lg'>
                &#8220;{data.quote}&#8221;
              </p>
            </div>
          </blockquote>
          <Link
            href={`/author/detail/${data?.book_authors?.id}`}
            className='rounded pl-4 text-base font-semibold italic text-neutral-700 transition-all duration-200 hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-neutral-100'
          >
            - {data?.book_authors?.name}
          </Link>
          <div className='mt-4'>
            <p className='pl-4 font-medium text-neutral-700 dark:text-neutral-200'>
              Tags :{' '}
              {data?.tags_array.map((item: any, index: number) => {
                return (
                  <span key={index + 1}>
                    <Link
                      href={`/tag/detail/${item.id}`}
                      className='rounded text-[15px] font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                    >
                      {item.name}
                    </Link>
                    {index < data.tags_array.length - 1 ? ', ' : ''}
                  </span>
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
