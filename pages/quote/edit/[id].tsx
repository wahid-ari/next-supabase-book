import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { useQuoteData, useAuthorsData, useTagsData } from '@libs/swr';
import axios from 'axios';
import useToast from '@hooks/useToast';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Button from '@components/systems/Button';
import TextArea from '@components/systems/TextArea';
import Shimer from '@components/systems/Shimer';
import Label from '@components/systems/Label';
import Select from 'react-select';
import SearchBox from '@components/systems/SearchBox';

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  return {
    props: {
      id: id,
    }, // will be passed to the page component as props
  };
}

Quote.auth = true;
export default function Quote({ id }) {
  const { data, error, mutate: mutateQuote } = useQuoteData(id);
  const { data: authors, error: errorAuthors } = useAuthorsData();
  const { data: tags, error: errorTags } = useTagsData();
  const { mutate } = useSWRConfig();
  const { updateToast, pushToast } = useToast();
  const [editItem, setEditItem] = useState({
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

  // Set current data to edit
  useEffect(() => {
    if (data) {
      setEditItem({
        quote: data.quote,
        author_id: data.book_authors?.id,
      });
      setSelectedAuthor({ id: data.book_authors?.id, name: data.book_authors?.name });
    }
  }, [data]);

  // if user selecting author, set author id
  useEffect(() => {
    if (selectedAuthor) setEditItem((editItem) => ({ ...editItem, author_id: selectedAuthor.id }));
  }, [selectedAuthor]);

  // convert tags data from db (id, name) to match with react-select requirement (value, label)
  // set current quote tags
  useEffect(() => {
    // list of all tags
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
    // list current quote tags
    if (data && tags) {
      let quoteCurrentTags = [];
      for (const quoteTag of data?.tags_array) {
        for (const item of tags) {
          if (item.id == quoteTag.id) {
            quoteCurrentTags.push({
              value: item.id,
              label: item.name,
            });
          }
        }
      }
      // @ts-ignore
      setSelectedTags(quoteCurrentTags);
    }
  }, [data, tags]);

  // if user selecting tags, set tags
  useEffect(() => {
    // use if here to fix data missing when reopening edit page
    if (selectedTags) {
      // @ts-ignore
      setEditItem({ ...editItem, tags: selectedTags });
    }
  }, [selectedTags]);

  async function handleSave() {
    const toastId = pushToast({
      message: 'Updating quote',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/quote`, { id: id, ...editItem });
      if (res.status == 201) {
        updateToast({ toastId, message: res?.data?.message, isError: false });
        router.push('/quote');
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/quote`);
      mutateQuote();
    }
  }

  if (error || errorAuthors || errorTags) {
    return (
      <Layout title='Edit Quote - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Edit Quote - MyBook'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Edit Quote</Title>
      </div>

      {data ? (
        <div className='max-w-lg'>
          <TextArea
            label='Quote'
            name='quote'
            value={editItem.quote}
            onChange={(e) => setEditItem({ ...editItem, quote: e.target.value })}
            placeholder='Be yourself, everyone else is already taken.'
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
                    primary: `#f97316`,
                    primary25: `#f97316`,
                    primary50: `#f97316`,
                    neutral40: `#EF4444`,
                  },
                })}
              />
            </>
          ) : (
            <Shimer className='h-8' />
          )}

          <Button onClick={handleSave} className='w-full'>
            Update
          </Button>
        </div>
      ) : (
        <Shimer className='!h-60' />
      )}
    </Layout>
  );
}
