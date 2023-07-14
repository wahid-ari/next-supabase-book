import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@components/systems/Text';
import { PhotographIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

type Props = {
  href: string;
  imageSrc?: string;
  title: string;
  author?: string;
  [props: string]: any;
};

export default function BookItem({ href = '#', imageSrc, title, author, ...props }: Props) {
  const [isLoading, setLoading] = useState(true);
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link href={href} className='group rounded focus-visible:outline-none' {...props}>
      <div className='h-[316px] rounded border shadow dark:border-neutral-800 sm:h-[354px]'>
        <div className='relative h-56 w-full overflow-hidden sm:h-64'>
          {imageSrc ? (
            <Image
              title={title}
              alt={title}
              src={imageSrc}
              className={clsx(
                'rounded-t brightness-90 group-hover:brightness-110',
                'transform transition duration-500 ease-in-out will-change-auto',
                isLoading ? 'blur-2xl' : 'blur-0'
              )}
              fill
              sizes={sizes}
              onLoadingComplete={() => setLoading(false)}
              unoptimized
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center rounded-t bg-neutral-200 dark:bg-neutral-800'>
              <PhotographIcon className='h-16 w-16 text-neutral-500' />
            </div>
          )}
        </div>
        <div className='px-2.5 py-3'>
          <Text.medium
            className={clsx(
              'line-clamp-2 rounded px-1 py-0.5 !text-[15px] transition-all duration-500',
              'group-hover:text-orange-500 group-focus-visible:ring-2 group-focus-visible:ring-orange-500'
            )}
          >
            {title}
          </Text.medium>
          <span className='line-clamp-1 px-1 text-[14px] text-neutral-600 dark:text-neutral-400'>{author}</span>
        </div>
      </div>
    </Link>
  );
}
