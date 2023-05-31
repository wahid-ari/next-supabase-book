import { useRef, useMemo } from 'react';
import Link from 'next/link';
import { useGenreData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import ReactTable from '@components/systems/ReactTable';
import LabeledInput from '@components/systems/LabeledInput';
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

export default function Genre({ id }) {
  const { data, error } = useGenreData(id);

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
        Header: 'Title',
        accessor: 'title',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`/book/detail/${original.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
            >
              {values.title}
            </Link>
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
      <Layout title='Genre Detail - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`${data ? data?.name + ' - MyBook' : 'Genre Detail - MyBook'}`}>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name}</Title> : <Title>Genre Detail</Title>}
      </div>

      {data ? (
        data?.books_by_genres?.length > 0 ? (
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

            <ReactTable columns={column} data={data.books_by_genres} ref={tableInstance} page_size={20} />
          </>
        ) : (
          <div className='rounded border border-red-500 p-3'>
            <p className='text-red-500'>No Book in Genre {data?.name} </p>
          </div>
        )
      ) : (
        <Shimer className='!h-60' />
      )}
    </Layout>
  );
}
