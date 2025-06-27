'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/lib/cartContext';

interface ProductDetailClientProps {
  product: {
    id: number;
    name: string;
    description?: string | null;
    mainImage?: string | null;
    product_variants?: Array<{ 
      id: number;
      price: string;
      weight: string;
    }>;
    product_images?: Array<{ url: string; alt_text?: string; is_primary?: boolean }>;
  } | null;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const rawVariants = product?.product_variants || [];

  const formatWeight = (value: string): string => {
    const floatVal = parseFloat(value);
    if (isNaN(floatVal)) return 'Poids inconnu';
    if (floatVal >= 1) return `${floatVal}kg`;
    return `${floatVal * 1000}g`;
  };

  const weightOptions = rawVariants.map(variant => ({
    id: variant.id,
    label: formatWeight(variant.weight),
    price: parseFloat(variant.price),
  }));

  const defaultVariant = rawVariants?.[0];
  const defaultWeightOption = weightOptions.find(w => w.id === defaultVariant?.id) || weightOptions[0];

  const [selectedWeight, setSelectedWeight] = useState(defaultWeightOption);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const getProxyImageUrl = (imgBbUrl: string | null) => {
    if (!imgBbUrl) return null;
    if (imgBbUrl.includes('i.ibb.co')) {
      return `/api/image-proxy?url=${encodeURIComponent(imgBbUrl)}`;
    }
    const imageId = imgBbUrl.split('/').pop()?.split('.')[0];
    if (!imageId) return null;
    return `/api/image-proxy?url=${encodeURIComponent(`https://i.ibb.co/${imageId}.jpg`)}`;
  };

  if (!product) {
    return <div className="text-center text-red-500 font-bold">Produit introuvable.</div>;
  }

  const unitPrice = selectedWeight?.price || 0;
  const unitPriceTTC = unitPrice * 1.055;
  const tvaAmount = unitPrice * 0.055;
  const totalPriceTTC = (unitPriceTTC * quantity).toFixed(2);

  const primaryImage = product.product_images?.find(img => img.is_primary) ?? product.product_images?.[0];
  const imageUrl = primaryImage?.url || product.mainImage || null;
  const proxyUrl = getProxyImageUrl(imageUrl);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: `${product.name} - ${selectedWeight?.label}`,
      price: unitPrice, // prix HT, logique du panier
      image: proxyUrl || '',
      quantity,
      variant: selectedWeight?.label,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {proxyUrl ? (
            <Image
              src={proxyUrl}
              alt={primaryImage?.alt_text || product.name}
              width={600}
              height={400}
              className="object-cover rounded-lg"
              unoptimized
            />
          ) : (
            <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Pas d'image</span>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-black text-3xl font-bold mb-4">{product.name}</h1>
          {product.description && <p className="text-gray-700 mb-4">{product.description}</p>}

          <div className="mb-4">
            <p className="text-black font-medium mb-2">Choisir le poids :</p>
            <div className="flex gap-2 flex-wrap">
              {weightOptions.length === 0 && <p className="text-red-500">Aucun variant disponible.</p>}
              {weightOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setSelectedWeight(option)}
                  className={`px-4 py-2 rounded-full border text-sm transition ${
                    selectedWeight?.id === option.id
                      ? 'bg-yellow-500 text-white'
                      : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                  }`}
                  aria-pressed={selectedWeight?.id === option.id}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <div>
              <label htmlFor="quantity" className="text-black font-medium mb-2 block">
                Quantité :
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={e => {
                  const val = Math.max(1, parseInt(e.target.value) || 1);
                  setQuantity(val);
                }}
                min={1}
                className="text-black w-24 border-2 border-yellow-500 rounded-md p-2 text-center font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition whitespace-nowrap"
              type="button"
            >
              Ajouter au panier
            </button>
          </div>

          <div className="text-lg font-semibold text-black mb-2">
            Prix unitaire TTC : {unitPriceTTC.toFixed(2)} € / {selectedWeight?.label}
          </div>
          <p className="text-sm text-gray-500 mb-4">
            (Dont TVA 5.5% : {tvaAmount.toFixed(2)} €)
          </p>

          <div className="text-xl font-bold text-yellow-500">
            Total TTC : {totalPriceTTC} €
          </div>
        </div>
      </div>
    </div>
  );
}
