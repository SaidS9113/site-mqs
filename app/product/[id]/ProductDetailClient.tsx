'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/lib/cartContext';

const products = [
  {
    id: 1,
    name: "Miel Bio d'Éthiopie",
    description:
      "Ce miel bio d'Éthiopie est un produit d'exception, récolté à la main selon des méthodes traditionnelles. Riche en antioxydants et aux vertus énergisantes, il est parfait pour sucrer vos boissons ou accompagner vos plats naturels. Idéal pour toute la famille.",
    features: [
      "100% naturel et non transformé",
      "Origine : Éthiopie",
      "Riche en antioxydants",
      "Sans additifs ni conservateurs",
      "Récolté de manière artisanale",
      "Certifié bio",
    ],
    price: 12.5, // Prix pour 250g
    imageUrl:
      "https://images.pexels.com/photos/9732366/pexels-photo-9732366.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const weightOptions = [
  { label: "250g", multiplier: 1 },
  { label: "500g", multiplier: 1.8 },
  { label: "1kg", multiplier: 3.4 },
];

export default function ProductDetailClient({ productId }: { productId: string }) {
  const product = products.find((p) => p.id === parseInt(productId));
  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // ✅

  if (!product) return notFound();

  const unitPrice = product.price * selectedWeight.multiplier;
  const totalPrice = (unitPrice * quantity).toFixed(2);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: `${product.name} - ${selectedWeight.label}`,
      price: unitPrice,
      image: product.imageUrl,
      quantity,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-xl object-cover w-full"
          />
        </div>

        <div>
          <h1 className="text-black text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-4">
            {product.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          {/* Sélecteur de poids */}
          <div className="mb-4">
            <p className="text-black font-medium mb-2">Choisir le poids :</p>
            <div className="flex gap-2 flex-wrap">
              {weightOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => setSelectedWeight(option)}
                  className={`px-4 py-2 rounded-full border text-sm transition ${
                    selectedWeight.label === option.label
                      ? "bg-yellow-500 text-white"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantité + Bouton */}
          <div className="mb-4 flex items-center gap-4">
            <div>
              <p className="text-black font-medium mb-2">Quantité :</p>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                min={1}
                className="text-black w-24 border-2 border-yellow-500 rounded-md p-2 text-center font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition whitespace-nowrap"
            >
              Ajouter au panier
            </button>
          </div>

          {/* Prix */}
          <div className="text-lg font-semibold text-black mb-4">
            Prix unitaire : {unitPrice.toFixed(2)} € / {selectedWeight.label}
          </div>
          <div className="text-xl font-bold text-yellow-500">
            Total : {totalPrice} €
          </div>
        </div>
      </div>
    </div>
  );
}
