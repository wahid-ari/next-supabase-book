import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

type Props = {
  className?: string;
  href: string;
  icon?: ReactNode;
  isHome?: boolean;
  children: ReactNode;
  [props: string]: any;
};

export default function NavLink({ className, href, icon, isHome, children, ...props }: Props) {
  const router = useRouter();
  // const hrefSplit = href.split('/');
  // const lastHref = hrefSplit[hrefSplit.length - 1];
  // const pathnameSplit = router.pathname.split('/');
  // const lastPathname = pathnameSplit[pathnameSplit.length - 1];
  // console.log("href", href)
  // console.log("hrefSplit", hrefSplit)
  // console.log("lastHref", lastHref)
  // console.log('pathnameSplit',  pathnameSplit);
  // console.log('lastPathname',  lastPathname);
  // console.log('------------------------------------');

  // this is for activate navlink component when in '/dashboard' pathname
  if (router.pathname.split('/')[1] == 'dashboard') {
    return (
      <Link
        passHref
        {...props}
        href={href}
        className={clsx(
          className,
          'flex w-full items-center justify-start gap-2 rounded px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-orange-500',
          isHome && 'bg-gray-100 font-medium text-orange-600 dark:bg-neutral-800 dark:text-orange-500',
          !isHome &&
            'text-gray-700 hover:bg-gray-100 hover:text-orange-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-orange-500'
        )}
      >
        {icon}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <Link
      passHref
      {...props}
      href={href}
      className={clsx(
        className,
        'flex w-full items-center justify-start gap-2 rounded px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-orange-500',
        router.pathname.includes(href) && !isHome
          ? // current route that not home
            'bg-gray-100 font-medium text-orange-600 dark:bg-neutral-800 dark:text-orange-500'
          : router.pathname === href && isHome
          ? // current route that home
            'bg-gray-100 font-medium text-orange-600 dark:bg-neutral-800 dark:text-orange-500 dark:hover:text-orange-500'
          : // not current route
            'text-gray-700 hover:bg-gray-100 hover:text-orange-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-orange-500'
      )}
      // className={`${
      //   className ? className : ''
      // } flex w-full items-center justify-start gap-2 rounded px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-orange-500
      //  ${
      //    router.pathname.includes(href) && !isHome
      //      ? // current route that not home
      //        'bg-gray-100 font-medium text-orange-600 dark:bg-neutral-800 dark:text-orange-500'
      //      : router.pathname === href && isHome
      //      ? // current route that home
      //        'bg-gray-100 font-medium text-orange-600 dark:bg-neutral-800 dark:text-orange-500 dark:hover:text-orange-500'
      //      : // not current route
      //        'text-gray-700 hover:bg-gray-100 hover:text-orange-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-orange-500'
      //  }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

type Logout = {
  className?: string;
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  [props: string]: any;
};

NavLink.logout = ({ href, icon, className, children, ...props }: Logout) => {
  return (
    <Link
      {...props}
      passHref
      href={href}
      className={clsx(
        className,
        'flex w-full items-center justify-start px-4 py-2 transition-all',
        'gap-2 rounded text-sm font-medium hover:bg-red-100 dark:hover:bg-neutral-800',
        'text-red-500 hover:text-red-600 dark:text-red-600 dark:hover:text-red-500'
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};
