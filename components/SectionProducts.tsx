'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { useCart } from '@/context/CartContext';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    title: 'Miel',
    price: 149,
    image: 'https://images.unsplash.com/photo-1508780709619-79562169bc64',
  },
  {
    id: 2,
    title: 'Miel',
    price: 75,
    image: 'https://images.unsplash.com/photo-1508780709619-79562169bc64',
  },
  {
    id: 3,
    title: 'Miel',
    price: 70,
    image: 'https://images.unsplash.com/photo-1508780709619-79562169bc64',
  },
  {
    id: 4,
    title: 'Miel',
    price: 27,
    image: 'https://images.unsplash.com/photo-1508780709619-79562169bc64',
  },
  {
    id: 5,
    title: 'Miel',
    price: 99,
    image: 'https://images.unsplash.com/photo-1508780709619-79562169bc64',
  },
  {
    id: 6,
    title: 'Miel',
    price: 89,
    image: 'https://images.unsplash.com/photo-1508780709619-79562169bc64',
  },
  {
    id: 7,
    title: 'Miel',
    price: 55,
    image: 'https://images.unsplash.com/photo-1508780709619-79562169bc64',
  },
  {
    id: 8,
    title: 'Miel',
    price: 33,
    image: 'https://images.unsplash.com/photo-1508780709619-79562169bc64',
  },
];

export default function SectionProducts() {
  const topFourProducts = useMemo(() => {
    return [...products].sort((a, b) => b.price - a.price).slice(0, 4);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-center mb-8">
        <h2 className="text-black text-3xl font-bold tracking-tight">Nos meilleurs produits</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {topFourProducts.map((product) => (
          <div key={product.id} className="text-center">
            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow">
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-black mt-4 text-lg font-medium">{product.title}</h3>
            <p className="text-gray-400 text-sm mt-1">description...</p>
            <p className="text-black mt-1 font-semibold">${product.price}</p>
            <Link
              href={`/product/${product.id}`}
              className="inline-block mt-3 px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
            >
              Option
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

{/* <button
  onClick={() =>
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    })
  }
  className="mt-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
>
  Ajouter au panier
</button> */}
