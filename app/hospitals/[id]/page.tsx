import { Metadata } from 'next';
import HospitalDetailClient from './HospitalDetailClient';

export const metadata: Metadata = {
  title: '医院详情 - CareVoyage',
  description: '了解合作医院详细信息',
};

export function generateStaticParams() {
  return [
    { id: 'huaxi-tianfu' },
    { id: 'cy-fuyi' },
    { id: 'cy-fuer' },
    { id: 'sc-tcm' },
    { id: 'cq-tcm' },
  ];
}

export default function HospitalPage({ params }: { params: { id: string } }) {
  return <HospitalDetailClient id={params.id} />;
}
