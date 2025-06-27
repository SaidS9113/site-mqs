import { prisma } from '../db/prisma';

export type ProductDetails = {
  id: number;
  name: string;
  description: string | null;
  mainImage: string | null;
  price: number;
  gallery: {
    url: string;
    altText: string | null;
  }[];
};

export async function getProducts(): Promise<ProductDetails[]> {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      product_images: {
        select: {
          url: true,
          alt_text: true,
        },
        orderBy: { position: 'asc' },
      },
      product_variants: {
        select: { price: true },
        take: 1, // prend le premier prix (par défaut)
      },
    },
    orderBy: { created_at: 'desc' },
  });

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    mainImage: product.image || product.product_images[0]?.url || null,
    price: product.product_variants[0]?.price.toNumber?.() || 0, // toNumber() si Decimal
    gallery: product.product_images.map((img) => ({
      url: img.url,
      altText: img.alt_text,
    })),
  }));
}
