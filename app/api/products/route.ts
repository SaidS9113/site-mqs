import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/api/products'

export const dynamic = 'force-dynamic' // Désactive le caching

export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error('[PRODUCTS_GET]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}