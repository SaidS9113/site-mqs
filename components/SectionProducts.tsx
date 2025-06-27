'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  description: string | null;
  mainImage: string | null; // `price` supprimé
};

export default function SectionProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const getProxyImageUrl = (imgBbUrl: string | null) => {
    if (!imgBbUrl) return null;

    const directUrl = imgBbUrl.includes('i.ibb.co')
      ? imgBbUrl
      : (() => {
          const imageId = imgBbUrl.split('/').pop();
          return imageId ? `https://i.ibb.co/${imageId}.jpg` : null;
        })();

    return directUrl ? `/api/image-proxy?url=${encodeURIComponent(directUrl)}` : null;
  };

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <h2 className="text-black text-3xl font-bold tracking-tight">Nos meilleurs produits</h2>
        </div>
        <p className="text-center text-gray-500">Chargement des produits...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <h2 className="text-black text-3xl font-bold tracking-tight">Nos meilleurs produits</h2>
        </div>
        <p className="text-center text-red-600">Erreur: {error}</p>
      </main>
    );
  }

  const topFourProducts = products.slice(0, 4); // Prend simplement les 4 premiers produits

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex justify-center mb-8">
        <h2 className="text-black text-3xl font-bold tracking-tight">Nos meilleurs produits</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {topFourProducts.map((product) => {
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
                      console.error(`❌ Erreur de chargement de l’image pour le produit ${product.id}`, e.nativeEvent);
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Pas d'image</span>
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {product.description || 'Produit de qualité'}
                </p>
                <Link
                  href={`/product/${product.id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full text-sm transition-colors inline-block"
                >
                  Option
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
