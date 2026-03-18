import { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';

export const metadata: Metadata = {
  title: '产品详情 - CareVoyage',
  description: '查看医疗旅游产品详情并预订',
};

export function generateStaticParams() {
  return Array.from({ length: 12 }, (_, i) => ({ id: String(i + 1) }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetailClient id={params.id} />;
}
