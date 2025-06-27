'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import NotificationBar from '@/components/BarPub';

type Product = {
  id: number;
  name: string;
  description: string | null;
  mainImage: string | null;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('🔄 Fetching products from /api/products...');
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        console.log('✅ Produits récupérés :', data);
        setProducts(data);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erreur inconnue';
        console.error('❌ Erreur lors de la récupération des produits :', errorMsg);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Génère l'URL proxy pour l'image, ou null si impossible
  const getProxyImageUrl = (imgBbUrl: string | null) => {
    if (!imgBbUrl) {
      console.warn('⚠️ Aucune URL d’image fournie');
      return null;
    }

    // Si l'URL est déjà sur i.ibb.co, on la garde telle quelle
    if (imgBbUrl.includes('i.ibb.co')) {
      return `/api/image-proxy?url=${encodeURIComponent(imgBbUrl)}`;
    }

    // Sinon, essaie d'extraire un ID et construire l'URL i.ibb.co
    const imageId = imgBbUrl.split('/').pop()?.split('.')[0];
    if (!imageId) {
      console.warn('⚠️ Impossible d’extraire l’ID d’image de :', imgBbUrl);
      return null;
    }

    const directUrl = `https://i.ibb.co/${imageId}.jpg`;
    console.log('🔁 URL convertie en URL directe :', directUrl);
    return `/api/image-proxy?url=${encodeURIComponent(directUrl)}`;
  };

  if (loading) {
    return (
      <>
        <NotificationBar />
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-center mb-8">
            <h1 className="text-black text-4xl font-bold tracking-tight">Boutique</h1>
          </div>
          <p className="text-center text-gray-500">Chargement des produits...</p>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NotificationBar />
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-center mb-8">
            <h1 className="text-black text-4xl font-bold tracking-tight">Boutique</h1>
          </div>
          <p className="text-center text-red-600">Erreur: {error}</p>
        </main>
      </>
    );
  }

  return (
    <>
      <NotificationBar />
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <h1 className="text-black text-4xl font-bold tracking-tight">Boutique</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const proxyUrl = getProxyImageUrl(product.mainImage);

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] relative">
                  {proxyUrl ? (
                    <Image
                      src={proxyUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      unoptimized
                      onError={(e) => {
                        console.error(
                          `❌ Erreur de chargement de l’image pour le produit ${product.id}`,
                          e.nativeEvent,
                        );
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">Pas d'image</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col items-center text-center">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h2>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {product.description || 'Produit de qualité'}
                  </p>
                  <div>
                    <Link
                      href={`/product/${product.id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full text-sm transition-colors inline-block"
                    >
                      Option
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
