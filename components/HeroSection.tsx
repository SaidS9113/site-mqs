'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div 
      className="relative w-full h-[500px] overflow-hidden bg-amber-900"
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/2233399/pexels-photo-2233399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 
          className={`text-5xl md:text-6xl font-bold text-center mb-8 transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        >
          MIELS D&apos;EXCEPTIONS ET 100% NATUREL
        </h1>
        
        <Link 
          href="/produits"
          className={`px-8 py-3 bg-white text-black rounded-full text-lg font-medium hover:bg-amber-100 transition-all duration-300 transform ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          Découvrir
        </Link>
      </div>
    </div>
  );
}
