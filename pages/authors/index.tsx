import { useState } from 'react';
import { useAuthorTotalBookQuoteData } from '@libs/swr';
import FrontLayout from '@components/front/FrontLayout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import InputDebounce from '@components/systems/InputDebounce';
import Button from '@components/systems/Button';
import AuthorItem from '@components/front/item/AuthorItem';

export default function Authors() {
  const { data, error } = useAuthorTotalBookQuoteData();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const filtered =
    query === ''
      ? data
      : data.filter((item: any) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );
  let lastPage = page > filtered?.length / 18;

  if (error) {
    return (
      <FrontLayout title='Authors - MyBook' description='Browse Authors - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout title='Authors - MyBook' description='Browse Authors - MyBook'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Title>Authors</Title>
        <InputDebounce
          id='search'
          name='search'
          wrapperClassName='pt-2'
          placeholder='Search Author'
          className='max-w-xs !py-2'
          debounce={500}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>

      <div className='mt-4 grid grid-cols-2 gap-x-4 gap-y-8 min-[520px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {filtered
          ? filtered.slice(0, page * 18).map((item: any) => {
              return (
                <AuthorItem
                  key={item.id}
                  href={`/authors/${item.slug}`}
                  name={item.name}
                  imageSrc={item.image}
                  book={item?.book_books?.length}
                  quote={item?.book_quotes?.length}
                />
              );
            })
          : [...Array(18).keys()].map((item) => (
              <div key={item} className='flex justify-center'>
                <Shimer className='!h-32 !w-32 !rounded-full' />
              </div>
            ))}
      </div>

      {data && !lastPage && (
        <div className='mt-10 flex justify-center'>
          <Button onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
      )}

      {query !== '' && filtered?.length < 1 && (
        <p className='py-32 text-center'>There are no authors with name &quot;{query}&quot;</p>
      )}
    </FrontLayout>
  );
}
