import { useState } from 'react';
import { mutate } from 'swr';
import { useTagsData } from '@libs/swr';
import axios from 'axios';
import useToast from '@utils/useToast';
import { PlusSmIcon } from '@heroicons/react/outline';
import Layout from '@components/layout/Layout';
import TableSimple from '@components/systems/TableSimple';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Dialog from '@components/systems/Dialog';
import Button from '@components/systems/Button';
import LabeledInput from '@components/systems/LabeledInput';
import Text from '@components/systems/Text';
import nookies from 'nookies';

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

export default function Tags() {
  const { data, error } = useTagsData();
  const { updateToast, pushToast } = useToast();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [name, setName] = useState('');
  const [editItem, setEditItem] = useState({ id: null, name: '' });
  const [deleteItem, setDeleteItem] = useState({ id: null, name: '' });

  async function handleCreate() {
    const toastId = pushToast({
      message: `Creating ${name} tag...`,
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/tag`, { name: name });
      if (res.status == 200) {
        setOpenCreateDialog(false);
        setName('');
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/tag`);
    }
  }

  async function handleEdit() {
    const toastId = pushToast({
      message: 'Updating tag...',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/tag`, editItem);
      if (res.status == 201) {
        setOpenEditDialog(false);
        setEditItem({ id: null, name: '' });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/tag`);
    }
  }

  async function handleDelete() {
    const toastId = pushToast({
      message: `Deleting ${deleteItem.name} tag...`,
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/tag?id=${deleteItem.id}`);
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({ id: null, name: '' });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/tag`);
    }
  }

  function handleShowEditModal(id: any, name: any) {
    setEditItem({ id: id, name: name });
    setOpenEditDialog(true);
  }

  function handleShowDeleteModal(id: any, name: any) {
    setDeleteItem({ id: id, name: name });
    setOpenDeleteDialog(true);
  }

  if (error) {
    return (
      <Layout title='Genre - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Tags - MyBook'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Tags</Title>
        <Button.success onClick={() => setOpenCreateDialog(true)} className='flex items-center gap-2'>
          <PlusSmIcon className='h-5 w-5' />
          Add New Tag
        </Button.success>
      </div>

      <Dialog
        title='Create Tag'
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onConfirm={handleCreate}
        confirmText='Save'
      >
        <div className='mt-5'>
          <LabeledInput
            label='Name'
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Life'
          />
        </div>
      </Dialog>

      <Dialog
        title='Edit Tag'
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onConfirm={handleEdit}
        confirmText='Update'
        isEdit
      >
        <div className='mt-5'>
          <LabeledInput
            label='Name'
            type='text'
            name='name'
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
        </div>
      </Dialog>

      <Dialog
        title='Delete Tag'
        open={openDeleteDialog}
        isDanger
        setOpen={setOpenDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
      >
        <div className='mt-5 text-center sm:text-left'>
          Are you sure want to delete <span className='font-semibold'>{deleteItem.name}</span> ?
        </div>
      </Dialog>

      {data ? (
        <TableSimple
          head={
            <>
              <TableSimple.td small>No</TableSimple.td>
              <TableSimple.td>Name</TableSimple.td>
              <TableSimple.td small>Action</TableSimple.td>
            </>
          }
        >
          {data.map((item: any, index: number) => {
            return (
              <TableSimple.tr key={index}>
                <TableSimple.td small>{index + 1}</TableSimple.td>
                <TableSimple.td>
                  <Text>{item.name}</Text>
                </TableSimple.td>
                <TableSimple.td>
                  <Button className='mr-2 !px-[6px] !py-[2px]' onClick={() => handleShowEditModal(item.id, item.name)}>
                    Edit
                  </Button>
                  <Button.danger
                    className='!px-[6px] !py-[2px]'
                    onClick={() => handleShowDeleteModal(item.id, item.name)}
                  >
                    Delete
                  </Button.danger>
                </TableSimple.td>
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