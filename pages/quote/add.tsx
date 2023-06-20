import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { useAuthorsData, useTagsData } from '@libs/swr';
import axios from 'axios';
import useToast from '@utils/useToast';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Button from '@components/systems/Button';
import TextArea from '@components/systems/TextArea';
import Shimer from '@components/systems/Shimer';
import Label from '@components/systems/Label';
import Select from 'react-select';
import SearchBox from '@components/systems/SearchBox';
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
    props: {}, // will be passed to the page component as props
  };
}

export default function Quote() {
  const { data: authors, error: errorAuthors } = useAuthorsData();
  const { data: tags, error: errorTags } = useTagsData();
  const { updateToast, pushToast } = useToast();
  const [createItem, setCreateItem] = useState({
    quote: '',
    author_id: null,
  });
  const router = useRouter();
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [queryAuthor, setQueryAuthor] = useState('');
  const [selectedTags, setSelectedTags] = useState();
  const [listOfTags, setListOfTags] = useState();
  const filteredAuthor =
    queryAuthor === ''
      ? authors
      : authors.filter((item: any) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(queryAuthor.toLowerCase().replace(/\s+/g, ''))
        );

  // if user selecting author, set author id
  useEffect(() => {
    if (selectedAuthor) setCreateItem((createItem) => ({ ...createItem, author_id: selectedAuthor.id }));
  }, [selectedAuthor]);

  // convert tags data from db (id, name) to match with react-select requirement (value, label)
  useEffect(() => {
    if (tags) {
      let listTags = [];
      tags?.forEach((item: any) => {
        listTags.push({
          value: item.id,
          label: item.name,
        });
      });
      // @ts-ignore
      setListOfTags(listTags);
    }
  }, [tags]);

  // if user selecting tags, set tags
  useEffect(() => {
    // @ts-ignore
    setCreateItem({ ...createItem, tags: selectedTags });
  }, [selectedTags]);

  async function handleSave() {
    const toastId = pushToast({
      message: 'Creating quote',
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/quote`, createItem);
      if (res.status == 200) {
        updateToast({ toastId, message: res?.data?.message, isError: false });
        router.push('/quote');
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/quote`);
    }
  }

  if (errorAuthors || errorTags) {
    return (
      <Layout title='Add Quote - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Create Quote - MyBook'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Create Quote</Title>
      </div>

      <div className='max-w-lg'>
        <TextArea
          label='Quote'
          name='quote'
          value={createItem.quote}
          onChange={(e) => setCreateItem({ ...createItem, quote: e.target.value })}
          placeholder='Be yourself; everyone else is already taken.'
        />

        {filteredAuthor ? (
          <SearchBox
            label='Author'
            value={selectedAuthor}
            placeholder='Search and Select Author'
            onChange={setSelectedAuthor}
            onChangeQuery={(e) => setQueryAuthor(e.target.value)}
            afterLeave={() => setQueryAuthor('')}
            filtered={filteredAuthor}
            query={queryAuthor}
          />
        ) : (
          <Shimer className='h-8' />
        )}

        {listOfTags ? (
          <>
            <Label htmlFor='tags' className='my-2'>
              Tags
            </Label>
            <Select
              options={listOfTags}
              isMulti
              noOptionsMessage={() => 'Not Found'}
              value={selectedTags}
              // @ts-ignore
              onChange={setSelectedTags}
              placeholder='Search and Select Tags'
              name='tags'
              className='mb-4 rounded'
              classNamePrefix='react-select'
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: `#10b981`,
                  primary25: `#10b981`,
                  primary50: `#10b981`,
                  neutral40: `#EF4444`,
                },
              })}
            />
          </>
        ) : (
          <Shimer className='h-8' />
        )}

        <Button.success onClick={handleSave} className='w-full'>
          Save
        </Button.success>
      </div>
    </Layout>
  );
}
