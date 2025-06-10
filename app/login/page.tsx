'use client';

import NotificationBar from '@/components/BarPub';
import Header from '@/components/Header';
import { useState } from 'react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Connexion avec :', form.email, form.password);
      // 🔐 Tu connectes ici à ton backend ou API
    } else {
      console.log('Inscription avec :', form.name, form.email, form.password);
      // 🔐 Tu envoies ces infos à ton système d’inscription
    }
  };

  return (
    <>
    <NotificationBar />
          <Header />
    <main className="mt-[60px] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-black">
          {isLogin ? 'Connexion' : 'Inscription'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={form.name}
              onChange={handleChange}
              required
              className="text-gray-800 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="text-gray-800 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
            className="text-gray-800 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            {isLogin ? 'Se connecter' : 'S’inscrire'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-600 hover:underline"
          >
            {isLogin ? 'Créer un compte' : 'Se connecter'}
          </button>
        </p>
      </div>
    </main>
    </>
  );
}
