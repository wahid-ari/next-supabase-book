import { useRef, useMemo } from 'react';
import Link from 'next/link';
import { useTagData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import ReactTable from '@components/systems/ReactTable';
import LabeledInput from '@components/systems/LabeledInput';
import * as HoverCard from '@radix-ui/react-hover-card';
import clsx from 'clsx';
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

export default function Tag({ id }) {
  const { data, error } = useTagData(id);

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'id',
        width: 300,
        Cell: (row: any) => {
          // console.log(row.cell.row.index)
          return row.cell.row.index + 1;
        },
      },
      {
        Header: 'Quote',
        accessor: 'quote',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          let length = values.quote.length;
          let text = length > 50 ? values.quote.slice(0, 65) + ' ...' : values.quote;
          return (
            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <Link
                  href={`/quote/detail/${values.id}`}
                  className='rounded text-sm font-medium transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
                >
                  {`"${text}"`}
                </Link>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content
                  side='top'
                  className={clsx(
                    'z-50 max-h-40 max-w-sm overflow-auto rounded-md border shadow-md',
                    'bg-white p-2.5 !text-[15px] font-medium leading-5 text-neutral-700',
                    'scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:scrollbar-thumb-neutral-700'
                  )}
                >
                  {`"${values.quote}"`}
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
          );
        },
      },
      {
        Header: 'Author',
        accessor: 'book_authors.name',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`/author/detail/${original.book_authors?.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
            >
              {original.book_authors?.name}
            </Link>
          );
        },
      },
    ],
    []
  );

  const tableInstance = useRef(null);

  if (error) {
    return (
      <Layout title='Tag Detail - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`${data ? data?.name + ' Quotes - MyBook' : 'Tag Detail - MyBook'}`}>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name} Quotes</Title> : <Title>Tag Detail</Title>}
      </div>

      {data ? (
        data?.quotes_by_tags?.length > 0 ? (
          <>
            <LabeledInput
              label='Search Data'
              id='caridata'
              name='caridata'
              placeholder='Keyword'
              className='max-w-xs !py-2'
              onChange={(e) => {
                tableInstance.current.setGlobalFilter(e.target.value);
              }}
            />

            <ReactTable columns={column} data={data.quotes_by_tags} ref={tableInstance} page_size={20} />
          </>
        ) : (
          <div className='rounded border border-red-500 p-3'>
            <p className='text-red-500'>No Quote in Tag {data?.name} </p>
          </div>
        )
      ) : (
        <Shimer className='!h-60' />
      )}
    </Layout>
  );
}
