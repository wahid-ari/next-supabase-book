import { useState } from 'react';
import { useBooksData } from '@libs/swr';
import FrontLayout from '@components/front/FrontLayout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import InputDebounce from '@components/systems/InputDebounce';
import Button from '@components/systems/Button';
import BookItem from '@components/front/item/BookItem';

export default function Books() {
  const { data, error } = useBooksData();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const filtered =
    query === ''
      ? data
      : data.filter((item: any) =>
          item.title.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );
  let lastPage = page > filtered?.length / 18;

  if (error) {
    return (
      <FrontLayout title='Books - MyBook' description='Browse Books - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout title='Books - MyBook' description='Browse Books - MyBook'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Title>Books</Title>
        <InputDebounce
          id='search'
          name='search'
          wrapperClassName='pt-2'
          placeholder='Search Book'
          className='max-w-xs !py-2'
          debounce={500}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>

      <div className='mt-4 grid grid-cols-2 gap-6 min-[520px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {filtered
          ? filtered.slice(0, page * 18).map((item: any) => {
              return (
                <BookItem
                  key={item.id}
                  href={`/books/${item.slug}`}
                  title={item.title}
                  imageSrc={item.image.replace('SY75_', '').replace('jpg', '_SX200_.jpg')}
                  author={item?.book_authors?.name}
                />
              );
            })
          : [...Array(12).keys()].map((item) => <Shimer key={item} className='h-64 sm:!h-72' />)}
      </div>

      {data && !lastPage && (
        <div className='mt-10 flex justify-center'>
          <Button onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
      )}

      {query !== '' && filtered?.length < 1 && (
        <p className='py-32 text-center'>There are no books with name &quot;{query}&quot;</p>
      )}
    </FrontLayout>
  );
}
