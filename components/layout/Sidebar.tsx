import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GlobalContext } from '@utils/GlobalContext';
import {
  XIcon,
  LogoutIcon,
  ViewGridIcon,
  CogIcon,
  TemplateIcon,
  CollectionIcon,
  UserGroupIcon,
  ColorSwatchIcon,
  BookmarkIcon,
  SearchIcon,
  LoginIcon,
  ExternalLinkIcon,
  BookOpenIcon,
  AnnotationIcon,
} from '@heroicons/react/outline';
import NavLink from '@components/systems/NavLink';
import NavAccordion from '@components/systems/NavAccordion';
import Modal from '@components/systems/Modal';
import clsx from 'clsx';
import ThemeChanger from './ThemeChanger';
import nookies from 'nookies';

export default function Sidebar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { showNav, setShowNav } = useContext(GlobalContext);
  const admin = nookies.get(null, 'type');
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, [admin]);

  const hideMenu = () => {
    setShowNav(false);
  };

  useEffect(() => {
    setShowNav(false);
  }, [router.pathname, setShowNav]);

  // https://stackoverflow.com/questions/54989513/react-prevent-scroll-when-modal-is-open
  useEffect(() => {
    if (showNav) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [showNav]);

  async function handleLogout() {
    setOpenModal(false);
    hideMenu();
    router.push('/logout');
  }

  return (
    <>
      <div
        className={clsx(
          'z-50 flex h-screen max-h-screen w-screen flex-col flex-nowrap border-r bg-white dark:border-neutral-800 dark:bg-neutral-900 lg:w-60',
          showNav ? 'fixed lg:relative' : 'top-0 hidden lg:sticky lg:flex'
        )}
      >
        <div className='flex items-center justify-between gap-2 px-5'>
          <button
            className='rounded focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 lg:hidden'
            onClick={hideMenu}
            id='closemenu'
            aria-label='Close Menu'
          >
            <XIcon className='h-5 w-5 text-gray-500 transition-all hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200' />
          </button>
          <p className='py-2.5 text-left text-base font-semibold tracking-wide text-neutral-800 dark:text-neutral-100'>
            MyBook
          </p>
          <div className='cursor-pointer pt-1'>
            <ThemeChanger />
          </div>
        </div>

        <div
          className={clsx(
            'flex flex-col flex-nowrap gap-1 overflow-auto border-t px-4 pt-4 dark:border-neutral-800 sm:flex-grow',
            'scrollbar scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800'
          )}
        >
          <NavLink isHome href='/' icon={<ViewGridIcon className='h-4 w-4' />}>
            Dashboard
          </NavLink>

          <NavLink href='/search' icon={<SearchIcon className='h-4 w-4' />} className='mt-1'>
            Search
          </NavLink>

          <NavLink href='/author' icon={<UserGroupIcon className='h-4 w-4' />} className='mt-1'>
            Author
          </NavLink>

          <NavLink href='/book' icon={<BookOpenIcon className='h-4 w-4' />} className='mt-1'>
            Book
          </NavLink>

          <NavLink href='/quote' icon={<AnnotationIcon className='h-4 w-4' />} className='mt-1'>
            Quote
          </NavLink>

          <NavLink href='/genre' icon={<ColorSwatchIcon className='h-4 w-4' />} className='mt-1'>
            Genre
          </NavLink>

          <NavLink href='/tag' icon={<CollectionIcon className='h-4 w-4' />} className='mt-1'>
            Tag
          </NavLink>

          <NavLink href='/settings' icon={<CogIcon className='h-4 w-4' />} className='mt-1'>
            Settings
          </NavLink>

          <a
            href='https://my-book-docs.vercel.app'
            className={clsx(
              'my-1 flex w-full items-center justify-start gap-2 px-3 py-2 transition-all',
              'rounded text-sm font-medium text-gray-600 hover:text-emerald-600 dark:text-neutral-300',
              'hover:bg-gray-100 dark:hover:bg-neutral-800 dark:hover:text-emerald-500',
              'focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500'
            )}
            target='_blank'
            rel='noopener noreferrer'
          >
            <ExternalLinkIcon className='h-4 w-4' />
            Docs
          </a>

          <NavAccordion title='Design' routeName='design' icon={<TemplateIcon className='h-4 w-4' />}>
            <NavLink href='/design' icon={<TemplateIcon className='h-4 w-4' />}>
              Example
            </NavLink>
          </NavAccordion>
        </div>

        <hr className='mt-2 dark:border-neutral-800' />
        <div className='px-3 py-2'>
          {mounted && admin.name ? (
            <button
              onClick={() => setOpenModal(true)}
              className={clsx(
                'flex w-full items-center justify-start gap-2 px-4 py-2 text-sm font-semibold transition-all',
                'rounded text-red-600 hover:bg-red-100 dark:hover:bg-neutral-800',
                'focus-visible:outline-none focus-visible:ring focus-visible:ring-red-500'
              )}
            >
              <LogoutIcon className='h-4 w-4' />
              Logout
            </button>
          ) : (
            <Link
              href='/login'
              className={clsx(
                'flex w-full items-center justify-start gap-2 px-4 py-2 text-sm font-semibold transition-all',
                'rounded text-emerald-600 hover:bg-red-100 dark:hover:bg-neutral-800',
                'focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500'
              )}
            >
              <LoginIcon className='h-4 w-4' />
              Login
            </Link>
          )}
        </div>
      </div>
      <Modal
        title='Logout'
        open={openModal}
        showIcon
        isDanger
        onClose={() => setOpenModal(false)}
        onConfirm={handleLogout}
        confirmText='Logout'
      >
        Are you sure want to logout?
      </Modal>
    </>
  );
}
