import { useState } from 'react';
import { useLogsData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import TableSimple from '@components/systems/TableSimple';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import InputDebounce from '@components/systems/InputDebounce';
import nookies from 'nookies';
import Badge from '@components/systems/Badge';

export async function getServerSideProps(context: any) {
  // const cookies = nookies.get(context);
  // if (!cookies.token) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //     },
  //   };
  // }
  return {
    props: {},
  };
}

export default function Log() {
  const { data, error } = useLogsData();
  const [inputDebounceValue, setInputDebounceValue] = useState('');

  const filteredData =
    inputDebounceValue === ''
      ? data
      : data.filter((item: any) =>
          item.book_users.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(inputDebounceValue.toLowerCase().replace(/\s+/g, ''))
        );

  if (error) {
    return (
      <Layout title='Logs - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Logs - MyBook' prefetch={['/api/tag']}>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Logs</Title>
      </div>

      <InputDebounce
        label='Search'
        id='inputdebounce'
        name='inputdebounce'
        placeholder='Search'
        value={inputDebounceValue}
        onChange={(value) => setInputDebounceValue(value)}
      />

      {filteredData ? (
        <TableSimple
          head={
            <>
              <TableSimple.td small>No</TableSimple.td>
              <TableSimple.td>User</TableSimple.td>
              <TableSimple.td>Action</TableSimple.td>
              <TableSimple.td>Table</TableSimple.td>
              <TableSimple.td>Description</TableSimple.td>
              <TableSimple.td>Date</TableSimple.td>
              <TableSimple.td>Time</TableSimple.td>
            </>
          }
        >
          {filteredData.map((item: any, index: number) => {
            let date = new Date(item.created_at);
            return (
              <TableSimple.tr key={index}>
                <TableSimple.td small>{index + 1}</TableSimple.td>
                <TableSimple.td>{item.book_users.name}</TableSimple.td>
                <TableSimple.td>
                  {item.action == 'create' ? (
                    <Badge.green>CREATE</Badge.green>
                  ) : item.action == 'update' ? (
                    <Badge>UPDATE</Badge>
                  ) : (
                    <Badge.red>DELETE</Badge.red>
                  )}
                </TableSimple.td>
                <TableSimple.td>{item.table.replace('book_', '')}</TableSimple.td>
                <TableSimple.td>{item.description}</TableSimple.td>
                <TableSimple.td>{item.created_at.split('T')[0]}</TableSimple.td>
                <TableSimple.td>{date.toLocaleTimeString('en-US')}</TableSimple.td>
              </TableSimple.tr>
            );
          })}
        </TableSimple>
      ) : (
        <Shimer className='!h-60' />
      )}
    </Layout>
  );
}
