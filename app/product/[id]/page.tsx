import NotificationBar from '@/components/BarPub';
import ProductDetailClient from './ProductDetailClient';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  // await params avant d’accéder à ses propriétés
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL n’est pas défini dans .env');
  }

  const res = await fetch(`${baseUrl}/api/product/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return notFound();
  }

  const product = await res.json();

  return (
    <>
      <NotificationBar />
      <Header />
      <ProductDetailClient product={product} />
    </>
  );
}
