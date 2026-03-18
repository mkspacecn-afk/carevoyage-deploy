'use client';

import { Suspense } from 'react';
import OrderPageContent from './OrderPageContent';

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-[#F0FDFA] to-white"></div>}>
      <OrderPageContent />
    </Suspense>
  );
}
