import Link from 'next/link';
import { useBooksData } from '@libs/swr';
import clsx from 'clsx';
import FrontLayout from '@components/front/FrontLayout';
import Shimer from '@components/systems/Shimer';
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import BookItem from '@components/front/item/BookItem';
import Image from 'next/image';

export default function Home() {
  const { data: books, error: errorBooks } = useBooksData();
  // const movieWithBackdrop = data?.filter((item) => item.backdrop_url != null && item.backdrop_url != '');
  // const fiveMovieWithBackdrop = movieWithBackdrop?.slice(0, 5);
  // const shuffledBooks = books?.sort(() => 0.5 - Math.random());
  const spliceBooks = books?.slice(0, 12);

  if (errorBooks) {
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
      <header className='mb-16 sm:mb-12'>
        <div className='mx-auto flex flex-col items-center py-10 sm:px-4 md:flex-row md:py-24 lg:px-8'>
          <div className='mb-12 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-8 md:text-left lg:flex-grow lg:pr-16 xl:pr-24'>
            <h1 className='mb-4 text-3xl font-medium text-neutral-900 dark:text-white sm:text-4xl'>
              Knowledge is power, <br className='hidden lg:inline-block' />
              and power is best shared among readers.
            </h1>
            <p className='mb-8 leading-relaxed dark:text-neutral-300'>
              The site for readers and book recommendations. Find books you love, and keep track of the books you want
              to read. <span className='hidden sm:inline'>Be part of the community of book lovers on MyBook.</span>
            </p>
            <Link
              href='#section-books'
              className='inline-flex rounded border-0 bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 focus:outline-none'
            >
              Explore
            </Link>
          </div>
          <div className='min-[520px]:w-5/6 md:w-1/2 lg:w-full lg:max-w-lg xl:max-w-xl'>
            <Image
              className='mx-auto rounded object-cover object-center'
              alt='hero'
              src='/header.png'
              width={700}
              height={700}
              unoptimized
            />
          </div>
        </div>
      </header>

      {/* Books Start*/}
      <section id='section-books' className='scroll-mt-20'>
        <div className='mt-4 flex items-center justify-between p-1'>
          <div>
            <div className='mb-0.5 h-1 w-5 rounded bg-orange-500' />
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
        <div className='mt-4 grid grid-cols-2 gap-4 min-[520px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {spliceBooks ? (
            spliceBooks.map((item: any) => {
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
          ) : (
            <div className='flex gap-5 px-1'>
              <Shimer className='!h-64 !w-[190px]' />
              <Shimer className='!h-64 !w-[190px]' />
              <Shimer className='!h-64 !w-[190px]' />
              <Shimer className='!h-64 !w-[190px]' />
              <Shimer className='!h-64 !w-[190px]' />
              <Shimer className='!h-64 !w-[190px]' />
            </div>
          )}
        </div>
      </section>
      {/* Books End*/}
    </FrontLayout>
  );
}
