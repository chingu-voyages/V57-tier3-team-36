'use client';

import { lazy, Suspense } from 'react';

const Footer = lazy(() => import('@/components/Footer/Footer'));

export default function LazyFooter() {
  return (
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  );
}
