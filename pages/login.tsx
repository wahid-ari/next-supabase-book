import { useState, useEffect } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import axios from 'axios';
import useToast from '@hooks/useToast';
import Button from '@components/systems/Button';
import Heading from '@components/systems/Heading';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import HeadSeo from '@components/layout/HeadSeo';
import LoadingDots from '@components/systems/LoadingDots';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateToast, pushToast, dismissToast } = useToast();
  const { status } = useSession();

  useEffect(() => {
    Router.prefetch('/dashboard');
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleLogin(e: any) {
    e.preventDefault();
    setLoading(true);
    let isError = false;
    if (!form.username) {
      isError = true;
      pushToast({ message: "Username can't be empty", isError: true });
    }
    if (!form.password) {
      isError = true;
      pushToast({ message: "Password can't be empty", isError: true });
    }

    // jika tidak ada error save data
    if (!isError) {
      const toastId = pushToast({
        message: 'Login...',
        isLoading: true,
      });
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/login`, form);
        if (res.status == 200) {
          const { id, username, name, type, token } = res.data;
          signIn('credentials', {
            id,
            username,
            name,
            type,
            token,
            callbackUrl: '/dashboard',
          });
          updateToast({
            toastId,
            message: 'Success Login',
            isError: false,
          });
        }
      } catch (error) {
        updateToast({ toastId, message: error?.response?.data?.error, isError: true });
        console.error(error);
      }
    }
    setLoading(false);
  }

  if (status === 'loading') {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center dark:bg-white'>
        <LoadingDots medium />
      </div>
    );
  }

  if (status === 'authenticated') {
    Router.push('/dashboard');
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <HeadSeo title='Login - MyBook' description='Login - MyBook' />

        <div className='min-h-screen w-screen text-sm font-medium dark:bg-white sm:grid sm:grid-cols-2'>
          <div className='banner flex flex-col justify-between gap-2 p-8 sm:hidden'>
            <div>
              <h1 className='text-4xl font-bold text-white'>MyBook</h1>
            </div>
            <p className='text-base font-normal text-white'>
              Find books you&apos;ll love, and keep track of the books you want to read. Be part of the largest
              community of book lovers on MyBook
            </p>
            <p className='font-semibold text-white'>© MyBook - 2023</p>
          </div>

          <div className='banner hidden flex-col justify-between gap-2 px-8 py-12 sm:flex'>
            <div>
              <h1 className='font-bold text-white sm:text-4xl md:text-5xl'>MyBook</h1>
              <br />
              <p className='text-base font-normal text-white'>
                Find books you&apos;ll love, and keep track of the books you want to read. Be part of the largest
                community of book lovers on MyBook
              </p>
            </div>
            <p className='font-semibold text-white'>© MyBook - 2023</p>
          </div>

          <div className='flex w-full items-center justify-center px-8 py-16 md:px-16 md:py-0'>
            <div className='w-full sm:max-w-md'>
              <Image
                alt='Logo'
                src='/icon.png'
                width={100}
                height={100}
                className='mx-auto mb-16 hidden sm:block'
                unoptimized
              />

              <Heading h1 className='mb-6 font-semibold !text-neutral-800'>
                Login
              </Heading>

              <div className='mb-5'>
                <label className='block text-sm text-gray-800' htmlFor='username'>
                  Username
                </label>
                <input
                  type='text'
                  name='username'
                  placeholder='Username'
                  value={form.username}
                  onChange={handleChange}
                  className='mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-[0.6rem] text-sm font-medium outline-none ring-gray-300 transition-all focus:border-orange-600 focus:ring-1 focus:ring-orange-600 dark:bg-white dark:text-neutral-800'
                  autoComplete='off'
                  required
                />
              </div>

              <div className='mb-5'>
                <label className='block text-sm text-gray-800' htmlFor='password'>
                  Password
                </label>
                <div className='relative mb-4 flex items-center'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    placeholder='Password'
                    value={form.password}
                    onChange={handleChange}
                    className='mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-[0.6rem] text-sm font-medium outline-none ring-gray-300 transition-all focus:border-orange-600 focus:ring-1 focus:ring-orange-600 dark:bg-white dark:text-neutral-800'
                    autoComplete='off'
                    required
                  />
                  <button
                    aria-label='show password'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-0 z-10 mr-0.5 mt-2 rounded-md border-gray-300 p-1.5 outline-none ring-gray-300 backdrop-blur-lg focus:border-orange-600 focus:ring-1 focus:ring-orange-600'
                  >
                    {showPassword ? (
                      <EyeIcon className='h-5 w-5 text-gray-600' />
                    ) : (
                      <EyeOffIcon className='h-5 w-5 text-gray-600' />
                    )}
                  </button>
                </div>
              </div>

              <Button onClick={handleLogin} className='w-full !text-base'>
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              {/* <p className='mt-4 text-center font-normal dark:text-neutral-800'>
              Dont have an account?{' '}
              <Link
                href='/register'
                className='rounded font-medium text-orange-600 transition-all duration-300 hover:text-orange-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
              >
                Register Now
              </Link>
            </p> */}

              <p className='mt-4 text-center font-normal dark:text-neutral-800'>
                Back to{' '}
                <Link
                  href='/'
                  className='rounded font-medium text-orange-600 transition-all duration-300 hover:text-orange-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                >
                  Home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
