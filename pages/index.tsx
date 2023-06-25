import Image from 'next/image';
import Link from 'next/link';
import {
  useBooksData,
  useQuotesData,
  useTagTotalQuoteData,
  useGenreTotalBookData,
  useAuthorTotalBookQuoteData,
} from '@libs/swr';
import clsx from 'clsx';
import FrontLayout from '@components/front/FrontLayout';
import Shimer from '@components/systems/Shimer';
import { ArrowCircleDownIcon, ArrowDownIcon, ArrowSmRightIcon } from '@heroicons/react/outline';
import BookItem from '@components/front/item/BookItem';
import AuthorItem from '@components/front/item/AuthorItem';

export default function Home() {
  const { data: books, error: errorBooks } = useBooksData();
  const { data: authors, error: errorAuthors } = useAuthorTotalBookQuoteData();
  const { data: quotes, error: errorQuotes } = useQuotesData();
  const { data: genres, error: errorGenres } = useGenreTotalBookData();
  const { data: tags, error: errorTags } = useTagTotalQuoteData();
  // const movieWithBackdrop = data?.filter((item) => item.backdrop_url != null && item.backdrop_url != '');
  // const fiveMovieWithBackdrop = movieWithBackdrop?.slice(0, 5);
  // const shuffledBooks = books?.sort(() => 0.5 - Math.random());
  // const shuffledAuthors = authors?.sort(() => 0.5 - Math.random());
  // const shuffledQuotes = quotes?.sort(() => 0.5 - Math.random());
  const spliceBooks = books?.slice(0, 12);
  const spliceAuthors = authors?.slice(0, 12);
  const spliceQuotes = quotes?.slice(0, 6);

  if (errorBooks || errorAuthors || errorQuotes || errorGenres || errorTags) {
    return (
      <FrontLayout
        title='Home - MyBook'
        description="Find books you'll love, and keep track of the books you want to read. Be part of the largest community
          of book lovers on MyBook"
      >
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout
      title='Home - MyBook'
      description="Find books you'll love, and keep track of the books you want to read. Be part of the largest community
        of book lovers on MyBook"
    >
      <header className='mb-16 py-10 sm:mb-12 md:py-24'>
        <div className='flex flex-col items-center  md:flex-row '>
          <div className='mb-12 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-8 md:text-left lg:flex-grow lg:pr-16 xl:pr-24'>
            <h1 className='mb-4 text-3xl font-medium text-neutral-900 dark:text-white md:text-4xl'>
              Knowledge is power, <br className='hidden lg:inline-block' />
              and power is best shared among readers.
            </h1>
            <p className='mb-8 leading-relaxed dark:text-neutral-300 md:text-lg'>
              The site for readers and book recommendations. Find books you love, and keep track of the books you want
              to read. <span className='hidden sm:inline'>Be part of the community of book lovers on MyBook.</span>
            </p>
            <Link
              href='#section-books'
              className={clsx(
                'group inline-flex items-center gap-2 rounded border border-orange-500 px-6 py-2 font-semibold transition-all',
                'hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
              )}
            >
              Explore Now
              <ArrowCircleDownIcon className='h-5 w-5 animate-bounce text-orange-500' />
            </Link>
          </div>
          <div className='min-[520px]:w-5/6 md:w-1/2 lg:w-full lg:max-w-lg xl:max-w-xl'>
            <Image
              className='mx-auto rounded object-cover object-center'
              alt='hero'
              src='/header.png'
              width={700}
              height={700}
              priority
              unoptimized
            />
          </div>
        </div>
      </header>

      {/* Books Start*/}
      <section id='section-books' className='scroll-mt-20'>
        <div className='mt-4 flex items-center justify-between p-1'>
          <div>
            <div className='mb-1 h-1 w-5 rounded bg-orange-500' />
            <Link
              href={`/books`}
              className={clsx(
                'group flex items-center rounded text-xl font-medium',
                'text-neutral-700 hover:text-orange-500 dark:text-neutral-200 dark:hover:text-orange-500',
                'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
              )}
            >
              Books
              <ArrowSmRightIcon
                className={clsx(
                  'ml-1 h-6 w-6 text-neutral-600 transition-all duration-100',
                  'group-hover:translate-x-0.5 group-hover:text-orange-500 dark:text-neutral-300'
                )}
              />
            </Link>
          </div>
        </div>
        <div className='mt-4 grid grid-cols-2 gap-6 min-[520px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {spliceBooks
            ? spliceBooks.map((item: any) => {
                return (
                  <BookItem
                    key={item.id}
                    href={`/books/${item.id}`}
                    title={item.title}
                    imageSrc={item.image}
                    author={item?.book_authors?.name}
                  />
                );
              })
            : [...Array(6).keys()].map((item) => <Shimer key={item} className='h-64 sm:!h-72' />)}
        </div>
      </section>
      {/* Books End*/}

      {/* Genres Start */}
      <section className='mt-24'>
        <div className='mt-4 flex items-center justify-between p-1'>
          <div>
            <div className='mb-1 h-1 w-5 rounded bg-orange-500' />
            <Link
              href={`/genres`}
              className={clsx(
                'group flex items-center rounded text-xl font-medium',
                'text-neutral-700 hover:text-orange-500 dark:text-neutral-200 dark:hover:text-orange-500',
                'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
              )}
            >
              Genres
              <ArrowSmRightIcon
                className={clsx(
                  'ml-1 h-6 w-6 text-neutral-600 transition-all duration-100',
                  'group-hover:translate-x-0.5 group-hover:text-orange-500 dark:text-neutral-300'
                )}
              />
            </Link>
          </div>
        </div>
        <div className='mt-4 grid grid-cols-2 gap-4 min-[560px]:grid-cols-3 sm:gap-6 md:grid-cols-4 xl:grid-cols-6'>
          {genres
            ? genres.slice(0, 12).map((item: any) => (
                <Link
                  key={item.id}
                  href={`/genres/${item.id}`}
                  className={clsx(
                    'flex flex-wrap items-center justify-between rounded border p-4 text-[15px] font-medium',
                    'transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-600',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-neutral-800',
                    'text-neutral-600 hover:text-white dark:text-neutral-200 dark:hover:text-white'
                  )}
                >
                  <span>{item.label}</span>
                  {item.total}
                </Link>
              ))
            : [...Array(6).keys()].map((item) => <Shimer key={item} className='!h-12' />)}
        </div>
      </section>
      {/* Genres End */}

      {/* Authors Start*/}
      <section className='mt-24'>
        <div className='mt-4 flex items-center justify-between p-1'>
          <div>
            <div className='mb-1 h-1 w-5 rounded bg-orange-500' />
            <Link
              href={`/books`}
              className={clsx(
                'group flex items-center rounded text-xl font-medium',
                'text-neutral-700 hover:text-orange-500 dark:text-neutral-200 dark:hover:text-orange-500',
                'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
              )}
            >
              Authors
              <ArrowSmRightIcon
                className={clsx(
                  'ml-1 h-6 w-6 text-neutral-600 transition-all duration-100',
                  'group-hover:translate-x-0.5 group-hover:text-orange-500 dark:text-neutral-300'
                )}
              />
            </Link>
          </div>
        </div>
        <div className='mt-4 grid grid-cols-2 gap-x-4 gap-y-6 min-[520px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {spliceAuthors
            ? spliceAuthors.map((item: any) => {
                return (
                  <AuthorItem
                    key={item.id}
                    href={`/authors/${item.id}`}
                    name={item.name}
                    imageSrc={item.image}
                    book={item?.book_books?.length}
                  />
                );
              })
            : [...Array(6).keys()].map((item) => (
                <div key={item} className='flex justify-center'>
                  <Shimer className='!h-32 !w-32 !rounded-full' />
                </div>
              ))}
        </div>
      </section>
      {/* Authors End*/}

      {/* Quotes Start */}
      <section className='mt-24'>
        <div className='mt-4 flex items-center justify-between p-1'>
          <div>
            <div className='mb-1 h-1 w-5 rounded bg-orange-500' />
            <Link
              href={`/quotes`}
              className={clsx(
                'group flex items-center rounded text-xl font-medium',
                'text-neutral-700 hover:text-orange-500 dark:text-neutral-200 dark:hover:text-orange-500',
                'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
              )}
            >
              Quotes
              <ArrowSmRightIcon
                className={clsx(
                  'ml-1 h-6 w-6 text-neutral-600 transition-all duration-100',
                  'group-hover:translate-x-0.5 group-hover:text-orange-500 dark:text-neutral-300'
                )}
              />
            </Link>
          </div>
        </div>
        <div className='mt-4'>
          {spliceQuotes
            ? spliceQuotes.map((item: any) => (
                <div key={item.id} className='mb-4 border-b pb-2 dark:border-b-neutral-800'>
                  <p className='mb-1 text-base'>&#8220;{item.quote}&#8221;</p>
                  <Link
                    href={`author/${item?.book_authors?.id}`}
                    className={clsx(
                      'rounded text-[15px] font-medium italic transition-all duration-200',
                      'text-neutral-500 hover:text-orange-500 dark:text-neutral-300 dark:hover:text-orange-500',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                    )}
                  >
                    - {item?.book_authors?.name}
                  </Link>
                </div>
              ))
            : [...Array(6).keys()].map((item) => <Shimer key={item} className='!h-12' />)}
        </div>
      </section>
      {/* Quotes End */}

      {/* Tags Start */}
      <section className='mt-24'>
        <div className='mt-4 flex items-center justify-between p-1'>
          <div>
            <div className='mb-1 h-1 w-5 rounded bg-orange-500' />
            <Link
              href={`/tags`}
              className={clsx(
                'group flex items-center rounded text-xl font-medium',
                'text-neutral-700 hover:text-orange-500 dark:text-neutral-200 dark:hover:text-orange-500',
                'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
              )}
            >
              Tags
              <ArrowSmRightIcon
                className={clsx(
                  'ml-1 h-6 w-6 text-neutral-600 transition-all duration-100',
                  'group-hover:translate-x-0.5 group-hover:text-orange-500 dark:text-neutral-300'
                )}
              />
            </Link>
          </div>
        </div>
        <div className='mt-4 grid grid-cols-2 gap-4 min-[560px]:grid-cols-3 sm:gap-6 md:grid-cols-4 xl:grid-cols-6'>
          {tags
            ? tags.slice(0, 12).map((item: any) => (
                <Link
                  key={item.id}
                  href={`/tags/${item.id}`}
                  className={clsx(
                    'flex items-center justify-between rounded border p-3 text-[15px] font-medium',
                    'text-neutral-600 shadow transition-all duration-300 hover:text-orange-500',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                    'dark:border-neutral-800 dark:bg-[#1a1919] dark:text-neutral-200 dark:hover:text-orange-500'
                  )}
                >
                  <span>{item.label}</span>
                  {item.total}
                </Link>
              ))
            : [...Array(6).keys()].map((item) => <Shimer key={item} className='!h-12' />)}
        </div>
      </section>
      {/* Tags End */}
    </FrontLayout>
  );
}
