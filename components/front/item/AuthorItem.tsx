import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@components/systems/Text';
import { PhotographIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

type Props = {
  href: string;
  imageSrc?: string;
  name: string;
  book?: number;
  [props: string]: any;
};

export default function AuthorItem({ href = '#', imageSrc, name, book, ...props }: Props) {
  const [isLoading, setLoading] = useState(true);
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link href={href} className='group rounded focus-visible:outline-none' {...props}>
      <div className='relative mx-auto h-32 w-32 max-w-[8rem] overflow-hidden'>
        {imageSrc ? (
          <Image
            alt={name}
            src={imageSrc}
            className={clsx(
              'rounded-full object-cover brightness-90 group-hover:brightness-110',
              'transform transition duration-500 ease-in-out will-change-auto',
              isLoading ? 'blur-2xl' : 'blur-0'
            )}
            fill
            sizes={sizes}
            onLoadingComplete={() => setLoading(false)}
            unoptimized
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800'>
            <PhotographIcon className='h-16 w-16 text-neutral-500' />
          </div>
        )}
      </div>
      <div className='px-2.5 pt-3'>
        <Text.medium
          className={clsx(
            'line-clamp-2 rounded px-1 py-0.5 text-center !text-[15px] transition-all duration-500',
            'group-hover:text-orange-500 group-focus-visible:ring-2 group-focus-visible:ring-orange-500'
          )}
        >
          {name}
        </Text.medium>
        <span className='line-clamp-1 px-1 text-center text-[14px] text-neutral-600 dark:text-neutral-400'>
          {book} Published Books
        </span>
      </div>
    </Link>
  );
}
