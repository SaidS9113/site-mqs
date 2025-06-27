import { prisma } from "../db/prisma";

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
  product_variants: {
    id: number;
    price: number;
    weight: string;
  }[];
};


export async function getProductById(id: number): Promise<ProductDetails | null> {
  if (!id) return null;

  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      product_images: {
        select: {
          url: true,
          alt_text: true,
          position: true,
        },
        orderBy: { position: 'asc' },
      },
      product_variants: {
        select: {
          id: true,
          price: true,
          weight: true,
        },
      },
    },
  });

  if (!product) return null;

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    mainImage: product.image || product.product_images[0]?.url || null,
    price: product.product_variants[0]?.price?.toNumber?.() || 0,
    gallery: product.product_images.map(img => ({
      url: img.url,
      altText: img.alt_text,
    })),
    product_variants: product.product_variants.map(variant => ({
      id: variant.id,
      price: variant.price.toNumber(),
      weight: variant.weight ? variant.weight.toString() : "",
    })),
  };
}
