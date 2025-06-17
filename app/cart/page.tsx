'use client';

import NotificationBar from '@/components/BarPub';
import Header from '@/components/Header';
import { useCart } from '@/lib/cartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            {cart.map((item) => (
              <li
                 key={`${item.id}-${item.variant}`}
                className="flex items-center gap-6 border-b pb-6"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={80}
                  className="rounded-md object-cover"
                />
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
                  onClick={() => removeFromCart(item.id, item.variant)}
                  className="text-black text-sm text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t pt-6 text-right">
            <p className="text-black text-xl font-bold">Total : ${total.toFixed(2)}</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={clearCart}
                className="text-black px-4 py-2 border border-gray-400 rounded-full hover:bg-gray-100 transition"
              >
                Vider
              </button>
              <Link
                href="/checkout"
                className="text-black px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
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
