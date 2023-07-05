import { NextApiRequest } from 'next';
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const wrapperClassName = {
  fontSize: 60,
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'relative' as 'relative',
};

export default async function handler(req: NextApiRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has('title');
    const titleLength = hasTitle ? searchParams.get('title')?.slice(0, 70) : 'MyBook';
    let title = titleLength.length == 70 ? titleLength + '...' : titleLength;
    title = title || 'MyBook';

    return new ImageResponse(
      (
        <div style={wrapperClassName}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt='bg'
            width='100%'
            height='100%'
            // FIX OG Image
            src={`${process.env.NEXT_PUBLIC_API_ROUTE}/ogs.png`}
            style={{
              position: 'absolute',
            }}
          />

          <div tw='flex items-center text-white absolute left-20'>
            <svg
              height='40'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='3'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
              />
            </svg>
            <p
              className='font-extrabold'
              tw='text-3xl font-extrabold ml-2'
              style={{
                fontWeight: 700,
              }}
            >
              MyBook
            </p>
          </div>

          <h1
            tw='mx-20 my-auto relative pr-4'
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              textShadow: '0 2px 30px #000',
              letterSpacing: -4,
              // backgroundImage: 'linear-gradient(90deg, #fff 40%, #aaa)',
              // backgroundClip: 'text',
              // WebkitBackgroundClip: 'text',
              color: 'white',
            }}
          >
            {title}
          </h1>

          <p
            style={{
              position: 'absolute',
              bottom: 70,
              left: 80,
              margin: 0,
              fontSize: 26,
              letterSpacing: -1,
              color: '#fff',
            }}
          >
            With MyBook, its easy to find books you love, and keep track of the books you want to read.
          </p>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
