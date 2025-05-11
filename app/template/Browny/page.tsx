import { Suspense } from 'react';
import Loading from '@/components/loading';
import Browny from '@/components/portfolios/free/browny';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Browny/>
    </Suspense>
  );
}