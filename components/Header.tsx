import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, User } from 'lucide-react';

export default function Header({ isLoggedIn = false, user = {}, cartQuantity = 0 }) {
  // const isLoggedIn = true; // Exemple de simulation
  // const user = { prenom: "Anthony", nom: "Dupont", idRole: "10" }; // Exemple utilisateur
  // const cartQuantity = 3; // Exemple de quantité dans le panier

  return (
    <>

      {/* Première section : Logo centré */}
      <div className="w-full bg-white py-4 flex justify-center items-center">
        <h1 className="text-center">
          <Link href="/">
            <Image
          src="/assets/img/logoHorizontaleHeader.png"
          alt="Logo MielQualityS"
          width={400}
          height={100}
          priority // Priorise le chargement (utile pour un logo en haut de page)
        />
          </Link>
        </h1>
      </div>

      {/* Deuxième section : User à gauche, nav au centre, icônes à droite */}
      <header className="w-full py-4 bg-white border-t border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Partie gauche : user info + déconnexion */}
          <div className="flex flex-col text-black text-sm">
            {/* {isLoggedIn && (
              <>
                <span>Bienvenue, {user.prenom} {user.nom?.toUpperCase()}</span>
                <Link href="/logout" className="flex items-center text-[#F47B20]">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#F47B20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 17L21 12L16 7" stroke="#F47B20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 12H9" stroke="#F47B20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Déconnexion
                </Link>
              </>
            )} */}
          </div>

          {/* Centre : Navigation */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6 text-black">
            {/* {!(isLoggedIn && user.idRole === '10') && (
              <>
                <Link href="/">Accueil</Link>
                <Link href="/produits">Nos Miels</Link>
              </>
            )}

            {isLoggedIn && user.idRole === '10' && (
              <>
                <Link href="/produits">Produits</Link>
                <Link href="/commande">Commandes</Link>
                <Link href="/utilisateurs">Utilisateurs</Link>
              </>
            )} */}
            <Link href="/">Accueil</Link>
            <Link href="/produits">Produits</Link>
          </nav>

          {/* Droite : icônes user + panier */}
          <div className="flex items-center space-x-4">
            <Link href="/account" className="text-black">
              <User className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="text-black relative">
              <ShoppingBag className="h-6 w-6" />
              {/* {cartQuantity > 0 && ( */}
              <span className="absolute -top-2 -right-2 bg-[#F47B20] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartQuantity}
              </span>
              {/* )} */}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
