import NotificationBar from "@/components/BarPub";
import ProductDetailClient from "./ProductDetailClient";
import Header from '@/components/Header';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
    <NotificationBar />
      <Header />
      <ProductDetailClient productId={params.id} />
    </>
  );
}
