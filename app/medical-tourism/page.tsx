'use client';

import { Suspense } from 'react';
import MedicalTourismContent from './MedicalTourismContent';

export default function MedicalTourismPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-[#F0FDFA] to-white"></div>}>
      <MedicalTourismContent />
    </Suspense>
  );
}
