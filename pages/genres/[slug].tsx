import { useState } from 'react';
import { useGenreData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import FrontLayout from '@components/front/FrontLayout';
import InputDebounce from '@components/systems/InputDebounce';
import BookItem from '@components/front/item/BookItem';
import Button from '@components/systems/Button';
import nookies from 'nookies';

export async function getServerSideProps(context: any) {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { slug } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre?slug=${slug}&seo=true`).then((res) =>
    res.json()
  );
  return {
    props: {
      slug: slug,
      seo: res,
      fallback: {
        [`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre?slug=${slug}&seo=true`]: res,
      },
    }, // will be passed to the page component as props
  };
}

export default function Genres({ slug, seo }) {
  const { data, error } = useGenreData(null, slug);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const filtered =
    query === ''
      ? data?.books_by_genres
      : data?.books_by_genres?.filter((item: any) =>
          item.title.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );
  let lastPage = page > filtered?.length / 18;

  if (error) {
    return (
      <Layout title='Genre Detail - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <FrontLayout title={`${seo?.name + ' Books - MyBook'}`} description={`Browse ${seo?.name + ' Books - MyBook'}`}>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Title>{seo.name} Books</Title>
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
        <p className='py-32 text-center'>There are no books with title &quot;{query}&quot;</p>
      )}
    </FrontLayout>
  );
}
