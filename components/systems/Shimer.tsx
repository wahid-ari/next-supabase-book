import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

export default function Shimer({ className, dataTestId }: { className?: string; dataTestId?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return theme == 'dark' ? (
    <Skeleton
      containerTestId={dataTestId}
      className={clsx(className, 'mb-2 h-10')}
      baseColor='#262626'
      highlightColor='#404040'
    />
  ) : (
    <Skeleton containerTestId={dataTestId} className={clsx(className, 'mb-2 h-10')} />
  );
}
