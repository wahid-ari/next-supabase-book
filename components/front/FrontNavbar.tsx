import { useState, Fragment, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon, MenuIcon, XIcon, SearchIcon } from '@heroicons/react/outline';
import ActiveLink from '@components/front/ActiveLink';
import clsx from 'clsx';
import FrontThemeChanger from './FrontThemeChanger';
import NavbarSearch from './NavbarSearch';
import { useSession } from 'next-auth/react';
import { useMounted } from '@hooks/useMounted';

function CustomActiveLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <ActiveLink
      href={href}
      activeClassName='!text-orange-500 dark:!text-orange-500'
      className={clsx(
        'px-1 text-[15px] font-medium text-gray-700 transition-all duration-200',
        'rounded hover:text-orange-500 dark:text-neutral-200 dark:hover:text-orange-500',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
      )}
    >
      {children}
    </ActiveLink>
  );
}

const activeCn = clsx(
  'block rounded px-3 py-1.5 text-[15px] font-medium',
  'text-gray-600 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
);

export default function FrontNavbar({ className, ...props }: { className?: string; [props: string]: any }) {
  const { data: session, status }: { data: any; status: any } = useSession();
  const mounted = useMounted();
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <Popover
      {...props}
      as='nav'
      className={clsx('sticky top-0 z-10 border-b border-b-neutral-200/70 dark:border-b-neutral-800', className)}
    >
      <>
        <div className='mx-auto max-w-7xl px-4 py-3'>
          <div className='flex items-center justify-between'>
            {/* web logo  */}
            <Link
              href='/'
              passHref
              className='rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
            >
              <div className='flex items-center justify-center font-medium text-gray-900 md:justify-start'>
                <Image alt='Logo' src='/icon.png' width={30} height={30} className='mr-2 rounded-lg' unoptimized />
                <span className='text-xl font-semibold text-neutral-800 dark:text-neutral-100'>MyBook</span>
              </div>
            </Link>
            {/* web logo  */}

            {/* Nav Link  */}
            <div className='hidden md:block'>
              <div className='flex items-center md:space-x-2 min-[800px]:space-x-4 min-[900px]:space-x-6 lg:space-x-8'>
                <CustomActiveLink href='/'>Home</CustomActiveLink>
                <CustomActiveLink href='/books'>Book</CustomActiveLink>
                <CustomActiveLink href='/authors'>Author</CustomActiveLink>
                <CustomActiveLink href='/quotes'>Quote</CustomActiveLink>

                <Popover
                  className='relative'
                  onMouseEnter={() => setIsShowMore(true)}
                  onMouseLeave={() => setIsShowMore(false)}
                >
                  <Popover.Button
                    className={clsx(
                      'group flex items-center space-x-2 rounded px-1 text-[15px] font-medium transition-all duration-200',
                      ' text-gray-700 hover:text-orange-500 dark:text-neutral-200 dark:hover:text-orange-500',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                    )}
                  >
                    <span>More</span>
                    <ChevronDownIcon
                      className={`${
                        isShowMore
                          ? 'rotate-180 transform transition-transform duration-300'
                          : 'transition-transform duration-300'
                      } h-4 w-4`}
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    show={isShowMore}
                    enter='duration-200 ease-out'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='duration-100 ease-in'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                  >
                    <Popover.Panel className='absolute top-8 z-[11] flex w-40 flex-col space-y-2.5 rounded bg-white px-4 py-4 shadow dark:border dark:border-neutral-800 dark:bg-[#1a1a1a]'>
                      <CustomActiveLink href='/genres'>Genre</CustomActiveLink>
                      <CustomActiveLink href='/tags'>Tag</CustomActiveLink>
                    </Popover.Panel>
                  </Transition>
                </Popover>

                <CustomActiveLink href='/browse'>Browse</CustomActiveLink>

                <Popover className=''>
                  {({ open }) => (
                    <>
                      <Popover.Button
                        aria-label='Search'
                        className={clsx(
                          'group flex items-center space-x-2 rounded p-0.5 text-[15px] font-medium transition-all duration-200',
                          ' text-gray-700 hover:text-orange-500 dark:text-neutral-200 dark:hover:text-orange-500',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                        )}
                      >
                        <SearchIcon className='h-5 w-5' />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter='duration-200 ease-out'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='duration-100 ease-in'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                      >
                        <Popover.Panel className='absolute left-1/2 top-16 z-10 w-96 -translate-x-1/2 space-y-2.5 rounded border border-transparent bg-white p-2 shadow dark:border-neutral-800 dark:bg-[#1a1a1a]'>
                          <NavbarSearch />
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
            </div>
            {/* End Nav Link  */}

            <div className='hidden items-center gap-3 md:flex'>
              <FrontThemeChanger />
              {mounted && status != 'loading' ? (
                session?.name ? (
                  <Link
                    href='/dashboard'
                    className={clsx(
                      'px-1 text-[15px] font-medium text-gray-700 transition-all duration-200',
                      'rounded hover:text-orange-500 dark:text-neutral-200 dark:hover:text-orange-500',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                    )}
                    passHref
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href='/login'
                    className={clsx(
                      'bg-orange-500 px-3 py-1 text-[15px] font-medium transition-all duration-200',
                      'rounded text-white hover:bg-orange-600 dark:text-white',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 dark:focus-visible:ring-orange-400'
                    )}
                    passHref
                  >
                    Login
                  </Link>
                )
              ) : (
                <span className='text-[15px] font-medium text-neutral-700 dark:text-neutral-200'>Loading</span>
              )}
            </div>

            {/* Mobile menu button */}
            <div className='flex md:hidden'>
              <Popover.Button
                className={clsx(
                  'inline-flex items-center justify-center rounded transition-all',
                  'text-gray-500 hover:text-gray-600 dark:text-neutral-300 dark:hover:text-neutral-100',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                )}
              >
                <span className='sr-only'>Open main menu</span>
                <MenuIcon className='h-6 w-6' aria-hidden='true' />
              </Popover.Button>
            </div>
            {/* End Mobile menu button */}
          </div>
        </div>

        {/* Mobile menu panel */}
        <Transition
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='absolute inset-x-0 top-0 z-10 origin-top-right transform p-3 transition md:hidden'
          >
            <div className='overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 dark:bg-[#1a1a1a]'>
              <div className='flex items-center justify-between border-b py-3 dark:border-b-neutral-800'>
                <div className='ml-5'>
                  <Link
                    href='/'
                    passHref
                    className='flex w-full items-center rounded focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                  >
                    <span className='text-xl font-semibold dark:text-white'>MyBook</span>
                  </Link>
                </div>
                {/* CLose Mobile Menu Button  */}
                <div className='mr-3 flex items-center gap-2'>
                  <FrontThemeChanger />
                  <Popover.Button
                    className={clsx(
                      'rounded p-1 text-gray-700 transition-all dark:text-neutral-300',
                      'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
                      'focus:outline-none focus:ring-2 focus:ring-orange-500'
                    )}
                  >
                    <span className='sr-only'>Close main menu</span>
                    <XIcon className='h-5 w-5' aria-hidden='true' />
                  </Popover.Button>
                </div>
                {/* EndCLose Mobile Menu Button  */}
              </div>
              <div className='my-4 flex flex-col space-y-1 px-4'>
                <ActiveLink href='/' activeClassName='!text-orange-500 dark:text-orange-500' className={activeCn}>
                  Home
                </ActiveLink>
                <ActiveLink href='/books' activeClassName='!text-orange-500 dark:text-orange-500' className={activeCn}>
                  Book
                </ActiveLink>
                <ActiveLink
                  href='/authors'
                  activeClassName='!text-orange-500 dark:text-orange-500'
                  className={activeCn}
                >
                  Author
                </ActiveLink>
                <ActiveLink href='/quotes' activeClassName='!text-orange-500 dark:text-orange-500' className={activeCn}>
                  Quote
                </ActiveLink>
                <Menu>
                  {({ open }) => (
                    <>
                      <Menu.Button className='w-full rounded px-3 py-1.5 text-[15px] font-medium text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-neutral-200 dark:hover:bg-neutral-800'>
                        <div className='flex items-center justify-between'>
                          <span>More</span>
                          <ChevronRightIcon
                            className={`${
                              open
                                ? 'rotate-90 transform transition-transform duration-200'
                                : 'transition-transform duration-200'
                            } h-5 w-5`}
                          />
                        </div>
                      </Menu.Button>
                      <Menu.Items className='space-y-1 px-3'>
                        <Menu.Item>
                          <ActiveLink
                            activeClassName='!text-orange-500 dark:text-orange-500'
                            href='/genres'
                            className={activeCn}
                          >
                            Genre
                          </ActiveLink>
                        </Menu.Item>
                        <Menu.Item>
                          <ActiveLink
                            activeClassName='!text-orange-500 dark:text-orange-500'
                            href='/tags'
                            className={activeCn}
                          >
                            Tag
                          </ActiveLink>
                        </Menu.Item>
                      </Menu.Items>
                    </>
                  )}
                </Menu>
                <ActiveLink href='/browse' activeClassName='!text-orange-500 dark:text-orange-500' className={activeCn}>
                  Browse
                </ActiveLink>
                {mounted && (
                  <Link
                    href={`${session?.name ? '/dashboard' : '/login'}`}
                    className={clsx(
                      'block rounded px-3 py-1.5 text-[15px] font-medium text-gray-600 hover:bg-gray-100',
                      'hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                      'dark:text-neutral-200 dark:hover:bg-neutral-800'
                    )}
                  >
                    {session?.name ? 'Dashboard' : 'Login'}
                  </Link>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
        {/* End Mobile menu panel */}
      </>
    </Popover>
  );
}
