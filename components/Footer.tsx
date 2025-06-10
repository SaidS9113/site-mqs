// components/Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <>
      {/* Partie haut du pied de page */}
      <div className="bg-gray-100 p-5 mt-10 grid grid-cols-1 md:grid-cols-3 text-black text-center gap-8">
        {/* Colonne 1 */}
        <div>
          <h3 className="font-bold text-base font-montserrat">INFORMATIONS</h3>
          <div className="flex flex-col mt-5 space-y-2 text-base font-normal font-montserrat">
            <a href="#" className="hover:underline">Conditions générales de vente</a>
            <a href="#" className="hover:underline">Politique de confidentialité</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>

        {/* Colonne 2 */}
        <div>
          <h3 className="font-bold text-base font-montserrat">RÉSEAUX SOCIAUX</h3>
          <p className="mt-5 text-base font-normal font-montserrat">
            Retrouvez-nous sur les réseaux sociaux pour suivre l’actualité !
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            {[...Array(4)].map((_, idx) => (
              <img
                key={idx}
                src={`https://via.placeholder.com/40`}
                alt="social-icon"
                className="w-10 h-10 rounded-full border border-gray-500 p-1"
              />
            ))}
          </div>
        </div>

        {/* Colonne 3 */}
        <div>
          <h3 className="font-bold text-base font-montserrat mt-5 md:mt-0">CONTACT</h3>
          <p className="mt-5 text-base font-normal font-montserrat">
            Contactez-nous en cas de problème !
          </p>
          <form className="flex flex-col items-start mt-5 px-4 md:px-0">
            <input
              type="email"
              placeholder="Votre adresse mail"
              className="w-full md:w-[250px] h-[37px] border border-gray-300 rounded-md px-3 placeholder:text-base placeholder:font-montserrat"
            />
            <textarea
              placeholder="Votre message"
              className="w-full md:w-[250px] h-[100px] border border-gray-300 rounded-md px-3 mt-4 placeholder:text-base placeholder:font-montserrat"
            />
            <input
              type="submit"
              value="ENVOYER"
              className="w-[150px] h-[40px] bg-black text-white font-bold font-montserrat text-base rounded-full mt-5 cursor-pointer"
            />
          </form>
        </div>
      </div>

      {/* Partie bas du pied de page */}
      <footer className="bg-white border-t border-black py-5 text-center text-black">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col md:flex-row gap-2 text-sm font-montserrat">
            <a href="#" className="hover:underline">Conditions générales de vente</a>
            <a href="#" className="hover:underline">Politique de confidentialité</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
          <p className="text-sm text-gray-600">
            Copyright 2025 © MielQualityS | Réalisé par Monsieur.SAID.S
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
