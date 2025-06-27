import { NextResponse } from "next/server";
import { getProductById } from "@/lib/api/product";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "ID invalide ou manquant" }, { status: 400 });
  }

  try {
    const product = await getProductById(Number(id));

    if (!product) {
      return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
