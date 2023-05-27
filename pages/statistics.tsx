import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Layout from '@components/layout/Layout';
import Shimer from '@components/systems/Shimer';
import Text from '@components/systems/Text';
import Titles from '@components/systems/Title';
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
import { useBookByAuthorData, useBookByGenreData, useQuoteByAuthorData, useQuoteByTagData } from '@libs/swr';

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

export default function Home() {
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

  if (errorBookByAuthor || errorBookByGenre || errorQuoteByAuthor || errorQuoteByTag) {
    return (
      <Layout title='Statistics'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Statistics - MyMusic'>
      <Titles>Statistics</Titles>

      <div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2'>
        {dataBookByGenre ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Book by Genre</Text.medium>
            </div>
            <div className='m-auto w-72 py-3'>
              <Pie options={options} data={dataBookByGenre} />
            </div>
          </div>
        ) : (
          <Shimer className='!h-[350px] w-full' />
        )}

        {dataQuoteByTag ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Quote by Tag</Text.medium>
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
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Book by Author</Text.medium>
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
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Quote by Author</Text.medium>
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
