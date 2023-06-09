import { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

export default function BackToTop({ className, ...props }: { className?: string; [props: string]: any }) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    });
  }

  return (
    showBackToTop && (
      <div
        {...props}
        className={clsx(
          'fixed bottom-4 left-1/2 z-40 -translate-x-1/2 transform rounded-full',
          'bg-neutral-100 bg-opacity-20 backdrop-blur backdrop-filter dark:bg-opacity-40',
          'border dark:border-neutral-800 dark:bg-neutral-800'
        )}
      >
        {/* // <div className='fixed bottom-4 right-4 z-40 rounded-full bg-gray-100 bg-opacity-20 backdrop-blur backdrop-filter dark:bg-neutral-800 dark:bg-opacity-40'> */}
        <button
          onClick={scrollToTop}
          className={clsx(
            'flex items-center gap-1 rounded-full bg-transparent p-1 pl-1.5 text-[13px] text-neutral-700',
            'transition-all duration-300 ease-in hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
          )}
        >
          <ChevronUpIcon className='h-5 w-5' />
          <span className='pr-1'>Back to Top</span>
        </button>
      </div>
    )
  );
}
