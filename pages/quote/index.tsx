import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { mutate } from 'swr';
import { useQuotesData } from '@libs/swr';
import axios from 'axios';
import useToast from '@hooks/useToast';
import { PlusSmIcon } from '@heroicons/react/outline';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Dialog from '@components/systems/Dialog';
import Button from '@components/systems/Button';
import ReactTable from '@components/systems/ReactTable';
import LinkButton from '@components/systems/LinkButton';
import InputDebounce from '@components/systems/InputDebounce';
import * as HoverCard from '@radix-ui/react-hover-card';
import clsx from 'clsx';

Quote.auth = true;
export default function Quote() {
  const { data, error } = useQuotesData();
  const { updateToast, pushToast } = useToast();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ id: null, name: '' });
  const [inputDebounceValue, setInputDebounceValue] = useState('');

  async function handleDelete() {
    const toastId = pushToast({
      message: 'Deleting quote',
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/quote?id=${deleteItem.id}`);
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({ id: null, name: '' });
        updateToast({ toastId, message: res?.data?.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/quote`);
    }
  }

  function handleShowDeleteModal(id: any, name: any) {
    setDeleteItem({ id: id, name: name });
    setOpenDeleteDialog(true);
  }

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
          let text = length > 50 ? values.quote.slice(0, 45) + ' ...' : values.quote;
          return (
            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <Link
                  href={`quote/detail/${values.id}`}
                  className='rounded text-sm font-medium transition-all duration-200 hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
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
          if (!original?.book_authors?.name) {
            return '-';
          } else {
            return (
              <Link
                href={`/author/detail/${original?.book_authors?.id}`}
                className='rounded text-sm font-medium transition-all duration-200 hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
              >
                {original?.book_authors?.name || '-'}
              </Link>
            );
          }
        },
      },
      {
        Header: 'Action',
        disableSortBy: true,
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          // console.log(`${values.id} - ${values.name} - ${original.cover} - ${original.artists.id} - ${original.artists.name}`)
          return (
            <div>
              <Link
                href={`quote/edit/${values.id}`}
                className='mr-2 rounded bg-sky-600 px-[6px] py-[3px] text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400'
              >
                Edit
              </Link>
              <Button.danger
                className='!px-[6px] !py-[2px]'
                onClick={() => handleShowDeleteModal(values.id, values.name)}
              >
                Delete
              </Button.danger>
              {/* <button onClick={() => alert(`${row.cell.row.values.id} - ${row.cell.row.values.name}`)}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                Edit
              </button>
              <button onClick={() => showDeleteModal(row.cell.row.values.id, row.cell.row.values.name)}
                className="text-red-500 hover:text-red-700 text-sm font-medium">
                Delete
              </button> */}
            </div>
          );
        },
      },
    ],
    []
  );

  const tableInstance = useRef(null);

  if (error) {
    return (
      <Layout title='Quote - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Quote - MyBook' prefetch={['/api/quote']}>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Quote</Title>
        <LinkButton href='quote/add' className='flex items-center gap-2'>
          <PlusSmIcon className='h-5 w-5' />
          Add New Quote
        </LinkButton>
      </div>

      <InputDebounce
        label='Search'
        name='search'
        id='search'
        placeholder='Search'
        value={inputDebounceValue}
        onChange={(value) => {
          setInputDebounceValue(value);
          tableInstance?.current?.setGlobalFilter(value);
        }}
      />

      {data ? (
        <ReactTable columns={column} data={data} ref={tableInstance} page_size={20} itemPerPage={[10, 20, 50, 100]} />
      ) : (
        <Shimer className='!h-60' />
      )}

      <Dialog
        title='Delete Quote'
        open={openDeleteDialog}
        isDanger
        setOpen={setOpenDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
      >
        <div className='mt-5 text-center sm:text-left'>
          Are you sure want to delete this quote <span className='font-semibold'>{deleteItem.name}</span> ?
        </div>
      </Dialog>
    </Layout>
  );
}
