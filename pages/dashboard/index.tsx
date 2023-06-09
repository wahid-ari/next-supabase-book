import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  useBookByAuthorData,
  useBookByGenreData,
  useCountsData,
  useQuoteByAuthorData,
  useQuoteByTagData,
  useTotalAuthorsData,
  useTotalBooksData,
  useTotalGenresData,
  useTotalQuotesData,
  useTotalTagsData,
} from '@libs/swr';
import Layout from '@components/layout/Layout';
import Titles from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Text from '@components/systems/Text';
import Card from '@components/dashboard/Card';
import { AnnotationIcon, BookOpenIcon, CollectionIcon, ColorSwatchIcon, UserGroupIcon } from '@heroicons/react/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { populateData, options, optionsBarChart, optionsHorizontalBarChart } from '@utils/chartSetup';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Filler,
  Legend
);

Dashboard.auth = true;
export default function Dashboard() {
  // const { data, error } = useCountsData();
  const { data: totalAuthors, error: errorTotalAuthors } = useTotalAuthorsData();
  const { data: totalBooks, error: errorTotalBooks } = useTotalBooksData();
  const { data: totalGenres, error: errorTotalGenres } = useTotalGenresData();
  const { data: totalQuotes, error: errorTotalQuotes } = useTotalQuotesData();
  const { data: totalTags, error: errorTotalTags } = useTotalTagsData();
  const { theme } = useTheme();
  const { data: bookByGenre, error: errorBookByGenre } = useBookByGenreData();
  const { data: bookByAuthor, error: errorBookByAuthor } = useBookByAuthorData();
  const { data: quoteByAuthor, error: errorQuoteByAuthor } = useQuoteByAuthorData();
  const { data: quoteByTag, error: errorQuoteByTag } = useQuoteByTagData();

  const [dataBookByGenre, setDataBookByGenre] = useState(null);
  const [dataBookByAuthor, setDataBookByAuthor] = useState(null);
  const [dataQuoteByAuthor, setDataQuoteByAuthor] = useState(null);
  const [dataQuoteByTag, setDataQuoteByTag] = useState(null);

  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [windowWidth]);

  useEffect(() => {
    if (bookByGenre !== undefined) setDataBookByGenre(populateData(bookByGenre, 'book'));
    if (bookByAuthor !== undefined) setDataBookByAuthor(populateData(bookByAuthor, 'book'));
    if (quoteByAuthor !== undefined) setDataQuoteByAuthor(populateData(quoteByAuthor, 'quote'));
    if (quoteByTag !== undefined) setDataQuoteByTag(populateData(quoteByTag, 'quote'));
  }, [bookByGenre, bookByAuthor, quoteByAuthor, quoteByTag]);

  if (
    // error ||
    errorTotalAuthors ||
    errorTotalBooks ||
    errorTotalGenres ||
    errorTotalQuotes ||
    errorTotalTags ||
    errorBookByAuthor ||
    errorBookByGenre ||
    errorQuoteByAuthor ||
    errorQuoteByTag
  ) {
    return (
      <Layout title='Dashboard - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title='Dashboard - MyBook'
      prefetch={[
        '/api/dashboard/total-authors',
        '/api/dashboard/total-books',
        '/api/dashboard/total-genres',
        '/api/dashboard/total-quotes',
        '/api/dashboard/total-tags',
        '/api/statistics/book-by-author',
        '/api/statistics/book-by-genre',
        '/api/statistics/quote-by-author',
        '/api/statistics/quote-by-tag',
      ]}
    >
      <Titles>Dashboard</Titles>

      <div className='mt-8 grid grid-cols-1 gap-4 min-[350px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {totalAuthors ? (
          <Card
            title='Author'
            link='/author'
            count={totalAuthors.authors}
            icon={<UserGroupIcon />}
            data-testid='author-count'
          />
        ) : (
          <Shimer className='!h-24 w-full' />
        )}
        {totalBooks ? (
          <Card title='Book' link='/book' count={totalBooks.books} icon={<BookOpenIcon />} data-testid='book-count' />
        ) : (
          <Shimer className='!h-24 w-full' />
        )}
        {totalQuotes ? (
          <Card
            title='Quote'
            link='/quote'
            count={totalQuotes.quotes}
            icon={<AnnotationIcon />}
            data-testid='quote-count'
          />
        ) : (
          <Shimer className='!h-24 w-full' />
        )}
        {totalGenres ? (
          <Card
            title='Genre'
            link='/genre'
            count={totalGenres.genres}
            icon={<ColorSwatchIcon />}
            data-testid='genre-count'
          />
        ) : (
          <Shimer className='!h-24 w-full' />
        )}
        {totalTags ? (
          <Card title='Tag' link='/tag' count={totalTags.tags} icon={<CollectionIcon />} data-testid='tag-count' />
        ) : (
          <Shimer className='!h-24 w-full' />
        )}
      </div>
      {/* <div className='mt-8 grid grid-cols-1 gap-4 min-[350px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {data ? (
          <>
            <Card title='Author' link='/author' count={data.authors} icon={<UserGroupIcon />} />
            <Card title='Book' link='/book' count={data.books} icon={<BookOpenIcon />} />
            <Card title='Quote' link='/quote' count={data.quotes} icon={<AnnotationIcon />} />
            <Card title='Genre' link='/genre' count={data.genres} icon={<ColorSwatchIcon />} />
            <Card title='Tag' link='/tag' count={data.tags} icon={<CollectionIcon />} />
          </>
        ) : (
          <>
            <Shimer className='!h-24 w-full' />
            <Shimer className='!h-24 w-full' />
            <Shimer className='!h-24 w-full' />
            <Shimer className='!h-24 w-full' />
            <Shimer className='!h-24 w-full' />
          </>
        )}
      </div> */}

      <div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2'>
        {dataBookByGenre ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
              <Text.medium>Total Book by Genre</Text.medium>
            </div>
            <div className='m-auto w-72 py-3'>
              <Pie options={options} data={dataBookByGenre} />
            </div>
          </div>
        ) : (
          <Shimer className='!h-[350px] w-full' />
        )}

        {dataQuoteByTag ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
              <Text.medium>Total Quote by Tag</Text.medium>
            </div>
            <div className='m-auto w-72 py-3'>
              <Doughnut options={options} data={dataQuoteByTag} />
            </div>
          </div>
        ) : (
          <Shimer className='!h-[350px] w-full' />
        )}
      </div>

      <div className='mt-5'>
        {dataBookByAuthor ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
              <Text.medium>Total Book by Author</Text.medium>
            </div>
            <div className='p-3'>
              <Bar options={optionsBarChart(theme)} data={dataBookByAuthor} height={windowWidth > 500 ? 100 : 250} />
            </div>
          </div>
        ) : (
          <Shimer className='!h-96 w-full' />
        )}
      </div>

      <div className='mt-5'>
        {dataQuoteByAuthor ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
              <Text.medium>Total Quote by Author</Text.medium>
            </div>
            <div className='p-3'>
              <Bar
                // @ts-ignore
                options={optionsHorizontalBarChart(theme, windowWidth)}
                data={dataQuoteByAuthor}
                height={windowWidth > 500 ? 100 : 250}
              />
            </div>
          </div>
        ) : (
          <Shimer className='!h-96 w-full' />
        )}
      </div>
    </Layout>
  );
}
