import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Design() {
  const router = useRouter();

  useEffect(() => {
    router.push('/design/component');
  });

  return null;
}
