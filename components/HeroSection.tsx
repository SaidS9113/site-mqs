'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] border border-red mb-[-40px]">
      {/* Image d’arrière-plan en full */}
      <Image
        src="/assets/img/banniereMiel.jpg"
        alt="Bannière Miel Quality S"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay foncé */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Contenu */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
        <h1
          className={`text-5xl md:text-6xl font-bold text-center mb-8 transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          MIELS D&apos;EXCEPTIONS ET 100% NATUREL
        </h1>

        <Link
          href="/produits"
          className={`px-8 py-3 bg-white text-black rounded-full text-lg font-medium hover:bg-amber-100 transition-all duration-300 transform ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          Découvrir
        </Link>
      </div>
    </div>
  );
}
