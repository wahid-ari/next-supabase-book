import Link from 'next/link';
import Layout from '@components/layout/Layout';
import Menu from '@components/layout/Menu';
import Wrapper from '@components/systems/Wrapper';
import Title from '@components/systems/Title';
import { LogoutIcon, TemplateIcon, ViewBoardsIcon, ViewGridAddIcon } from '@heroicons/react/outline';
import Breadcrumb from '@components/layout/Breadcrumb';
import NavAccordion from '@components/layout/NavAccordion';
import NavLink from '@components/layout/NavLink';
import ThemeChanger from '@components/layout/ThemeChanger';
import { useTheme } from 'next-themes';
import Text from '@components/systems/Text';
import Navbar from '@components/layout/Navbar';
import Sidebar from '@components/layout/Sidebar';
import { useMounted } from '@hooks/useMounted';

export default function Example() {
  const { theme } = useTheme();
  const mounted = useMounted();

  return (
    <Layout title='Design System - MyBook'>
      <Title>Layout</Title>

      <Wrapper id='tableofcontent' name='Table of Content' noChildren noClassName noProps>
        <div className='columns-2 text-orange-500 dark:text-orange-500 sm:columns-3'>
          <span className='mb-3 block underline'>
            <Link href='#breadcrumb'>Breadcrumb</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#nav-accordion'>NavAccordion</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#nav-link'>NavLink</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#nav-link-logout'>NavLink.logout</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#menu'>Menu</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#theme-changer'>ThemeChanger</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#navbar'>Navbar</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#layout'>Layout</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#sidebar'>Sidebar</Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper id='breadcrumb' name='Breadcrumb' noChildren noClassName>
        <Breadcrumb data-testid='breadcrumb' />
      </Wrapper>

      <Wrapper id='nav-accordion' name='NavAccordion' props={['title', 'routeName', 'icon']} noClassName>
        <div className='w-64'>
          <NavAccordion
            data-testid='nav-accordion'
            title='Design'
            routeName='design'
            icon={<TemplateIcon className='h-4 w-4' />}
          >
            <NavLink
              data-testid='nav-accordion-link'
              href='/design/component'
              icon={<ViewGridAddIcon className='h-4 w-4' />}
            >
              Component
            </NavLink>
            <NavLink href='/design/layout' className='mt-1.5' icon={<ViewBoardsIcon className='h-4 w-4' />}>
              Layout
            </NavLink>
          </NavAccordion>
        </div>
      </Wrapper>

      <Wrapper id='nav-link' name='NavLink' props={['href', 'icon', 'isHome']}>
        <div className='w-64'>
          <NavLink
            data-testid='nav-link'
            href='/design/layout'
            className='mt-1.5'
            icon={<ViewBoardsIcon className='h-4 w-4' />}
          >
            Layout
          </NavLink>
        </div>
      </Wrapper>

      <Wrapper id='nav-link-logout' name='NavLink.logout' props={['href', 'icon']}>
        <div className='w-64'>
          <NavLink.logout data-testid='nav-link-logout' href='/logout' icon={<LogoutIcon className='h-4 w-4' />}>
            Logout
          </NavLink.logout>
        </div>
      </Wrapper>

      <Wrapper id='theme-changer' name='ThemeChanger' noChildren noClassName>
        <ThemeChanger data-testid='theme-changer' />
        {mounted ? <Text data-testid='theme-changer-value'>{theme}</Text> : null}
      </Wrapper>

      <Wrapper id='menu' name='Menu' noChildren>
        <div className='ml-16 flex'>
          <Menu data-testid='menu' />
        </div>
      </Wrapper>

      <Wrapper id='navbar' name='Navbar' noChildren>
        <Navbar data-testid='navbar' className='lg:!flex' />
        <Text className='mt-4 !text-red-600'>Navbar should visible only in small to medium screen</Text>
        <Text className='!text-red-600'>
          we pass classname={"'"}flex{"'"} to Navbar here only for test purpose
        </Text>
      </Wrapper>

      <Wrapper id='layout' name='Layout' noClassName props={['title', 'description', 'prefetch']}>
        <Layout data-testid='layout' title='Design System - MyBook'>
          <Title>Content</Title>
        </Layout>
      </Wrapper>

      <Wrapper id='sidebar' name='Sidebar' noChildren>
        <div className='overflow-hidden'>
          <Sidebar data-testid='sidebar' className='!z-0 !flex w-64' />
        </div>
      </Wrapper>
    </Layout>
  );
}
