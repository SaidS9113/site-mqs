'use client';

import NotificationBar from '@/components/BarPub';
import Header from '@/components/Header';
import { useCart } from '@/lib/cartContext';
import { saveCartToMongo } from '@/lib/api/cart';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tva = total * 0.055; // 5.5% de TVA
  const totalTTC = total + tva;

  const getProxyImageUrl = (imgBbUrl: string | null) => {
    if (!imgBbUrl) return null;
    if (imgBbUrl.includes('i.ibb.co')) {
      return `/api/image-proxy?url=${encodeURIComponent(imgBbUrl)}`;
    }
    const imageId = imgBbUrl.split('/').pop()?.split('.')[0];
    if (!imageId) return null;
    return `/api/image-proxy?url=${encodeURIComponent(`https://i.ibb.co/${imageId}.jpg`)}`;
  };

  const handleSaveCart = async () => {
    try {
      setLoading(true);
      const res = await saveCartToMongo(
        cart.map(item => ({
          ...item,
          id: String(item.id),
        }))
      );
      console.log('Panier sauvegardé :', res);
      alert('Panier sauvegardé avec succès !');
    } catch (err) {
      console.error('Erreur sauvegarde panier :', err);
      alert('Erreur lors de la sauvegarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NotificationBar />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-black text-3xl font-bold mb-8 text-center">Votre panier</h1>

        {cart.length === 0 ? (
          <p className="text-gray-700 text-500 text-center">Votre panier est vide.</p>
        ) : (
          <>
            <ul className="space-y-6">
              {cart.map((item) => {
                const proxyImage = getProxyImageUrl(item.image);
                return (
                  <li
                    key={`${item.id}-${item.variant}`}
                    className="flex items-center gap-6 border-b pb-6"
                  >
                    {proxyImage ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={100}
                        height={80}
                        className="rounded-md object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-[100px] h-[80px] bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-sm">
                        Pas d'image
                      </div>
                    )}

                    <div className="flex-1">
                      <h2 className="text-black text-lg font-semibold">{item.title}</h2>
                      <p className="text-black text-sm text-gray-500">
                        Quantité : {item.quantity}
                      </p>
                      <p className="text-black text-sm text-gray-500">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, String(item.variant))}
                      className="text-black text-sm text-red-500 hover:underline"
                    >
                      Supprimer
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 border-t pt-6 text-right space-y-2">
              <p className="text-black text-lg">Sous-total HT : ${total.toFixed(2)}</p>
              <p className="text-black text-lg">TVA (5.5%) : ${tva.toFixed(2)}</p>
              <p className="text-black text-xl font-bold">Total TTC : ${totalTTC.toFixed(2)}</p>

              <div className="mt-4 flex flex-wrap justify-end gap-4">
                <button
                  onClick={clearCart}
                  className="text-black px-4 py-2 border border-gray-400 rounded-full hover:bg-gray-100 transition"
                >
                  Vider
                </button>
                <button
                  onClick={handleSaveCart}
                  disabled={loading}
                  className="text-black px-6 py-2 border border-green-500 rounded-full hover:bg-green-100 transition"
                >
                  {loading ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
                <Link
                  href="/checkout"
                  className="text-white px-6 py-2 bg-yellow-500 rounded-full hover:bg-yellow-600 transition"
                >
                  Payer
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
