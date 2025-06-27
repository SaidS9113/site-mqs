// Define or import the CartItem type
export type CartItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
};

export async function saveCartToMongo(cart: CartItem[]) {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 'utilisateur-123', // à gérer plus tard via auth
      items: cart.map(item => ({
        variantId: item.id,          // tu peux garder id comme variantId
        productName: item.title,
        poids: 250,                 // fixe si tu n’as pas ce champ dans produit
        quantity: item.quantity,
        price: item.price,
        dateAjout: new Date(),
      })),
    }),
  });

  if (!res.ok) {
    throw new Error('Erreur lors de la sauvegarde du panier');
  }

  return res.json();
}
