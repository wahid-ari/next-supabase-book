import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PhotographIcon } from '@heroicons/react/outline';

type Props = {
  href: string;
  imageSrc?: string;
  title: string;
  published?: string;
  language?: string;
  [props: string]: any;
};

export default function AuthorBookItem({ href = '#', imageSrc, title, published, language, ...props }: Props) {
  const [isLoading, setLoading] = useState(true);
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link
      {...props}
      href={href}
      className='group mb-6 flex gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
    >
      {imageSrc ? (
        <Image
          alt={title}
          src={imageSrc?.replace('SX50', 'SX150').replace('SY75', 'SX150')}
          width={50}
          height={70}
          sizes={sizes}
          className={`w-20 rounded object-cover brightness-90 group-hover:brightness-100 ${
            isLoading ? 'blur-2xl' : 'blur-0'
          }`}
          onLoadingComplete={() => setLoading(false)}
          unoptimized
        />
      ) : (
        <div className='flex h-32 w-20 items-center justify-center rounded bg-neutral-200 dark:bg-neutral-800'>
          <PhotographIcon className='h-8 w-8 text-neutral-500' />
        </div>
      )}
      <div>
        <p className='mb-1 text-base font-medium text-neutral-700 transition-all duration-200 group-hover:text-orange-500 dark:text-neutral-100 '>
          {title}
        </p>
        <p className='mb-1 text-sm text-neutral-600 dark:text-neutral-200'>
          {published ? published.split('-')[0] : '-'}
        </p>
        <p className='text-sm text-neutral-600 dark:text-neutral-200'>{language}</p>
      </div>
    </Link>
  );
}
