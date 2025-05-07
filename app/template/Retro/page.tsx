import { Suspense } from 'react';
import { Retro } from './retro';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Retro />
    </Suspense>
  );
}