import { Suspense } from 'react';
import { Retro } from './retro';
import Loading from '@/components/loading';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Retro />
    </Suspense>
  );
}