import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Heading from '@components/systems/Heading';
import { useCountsData } from '@libs/swr';
import Link from 'next/link';
import { AnnotationIcon, BookOpenIcon, CollectionIcon, ColorSwatchIcon, UserGroupIcon } from '@heroicons/react/outline';
import { ReactNode } from 'react';

function Card({ title, link, count, icon }: { title: string; link: string; count: number; icon?: ReactNode }) {
  return (
    <Link
      href={link}
      className='group flex items-center justify-between gap-2 rounded-md border p-4 dark:border-neutral-800 shadow'
    >
      <div>
        <p className='mb-2 !text-lg font-semibold text-neutral-600 transition-all group-hover:text-emerald-500 dark:text-neutral-300'>
          {title}
        </p>
        <p className='!text-xl font-extrabold text-neutral-600 dark:text-neutral-200'>{count}</p>
      </div>
      <div className='h-12 w-12 text-neutral-300 transition-all duration-500 group-hover:text-emerald-500 dark:text-neutral-700 dark:group-hover:text-emerald-600'>
        {icon}
      </div>
    </Link>
  );
}

export default function Home() {
  const { data, error } = useCountsData();

  if (error) {
    return (
      <Layout title='Dashboard - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Dashboard - MyBook'>
      <Title>Dashboard</Title>

      <div className='mt-8 grid grid-cols-1 gap-4 min-[350px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
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
      </div>
    </Layout>
  );
}
