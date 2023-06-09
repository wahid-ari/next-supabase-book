import { useEffect } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import LoadingDots from '@components/systems/LoadingDots';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function postLogout() {
      try {
        const session: any = await getSession();
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/logout`, {
          user_id: session?.id,
          token: session?.token,
        });
        if (res.status == 200) {
          const data = await signOut({ redirect: false, callbackUrl: '/' });
          router.push(data.url);
          nookies.destroy(null, '__Secure-next-auth.session-token');
          nookies.destroy(null, 'next-auth.session-token');
        }
      } catch (error) {
        console.error(error);
        router.push('/');
      }
    }

    postLogout();
  }, [router]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <LoadingDots medium />
    </div>
  );
}
