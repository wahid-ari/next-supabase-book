import Link from 'next/link';
import Layout from '@components/layout/Layout';
import Wrapper from '@components/systems/Wrapper';
import Title from '@components/systems/Title';
import { TemplateIcon } from '@heroicons/react/outline';
import Breadcrumb from '@components/systems/Breadcrumb';
import NavAccordion from '@components/systems/NavAccordion';
import NavLink from '@components/systems/NavLink';

export default function Example() {
  return (
    <Layout title='Design System - MyBook'>
      <Title>Layout</Title>

      <Wrapper id='tableofcontent' name='Table of Content' noChildren noClassName noProps>
        <div className='columns-2 text-emerald-600 dark:text-emerald-500 sm:columns-3'>
          <span className='mb-3 block underline'>
            <Link href='#breadcrumb'>Breadcrumb</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#nav-accordion'>NavAccordion</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#nav-link'>NavLink</Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper id='breadcrumb' name='Breadcrumb' noChildren noClassName>
        <Breadcrumb data-testid='breadcrumb' />
      </Wrapper>

      <Wrapper id='nav-accordion' name='NavAccordion' props={['title', 'routeName', 'icon']} noClassName>
        <NavAccordion
          data-testid='nav-accordion'
          title='Design'
          routeName='design'
          icon={<TemplateIcon className='h-4 w-4' />}
        >
          <NavLink data-testid='nav-accordion-link' href='/design' icon={<TemplateIcon className='h-4 w-4' />}>
            Example
          </NavLink>
        </NavAccordion>
      </Wrapper>

      <Wrapper id='nav-link' name='NavLink' props={['href', 'icon', 'isHome']}>
        <NavLink data-testid='nav-link' href='/design' icon={<TemplateIcon className='h-4 w-4' />}>
          Example
        </NavLink>
      </Wrapper>
    </Layout>
  );
}
