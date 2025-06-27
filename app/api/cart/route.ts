import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongoose';
import Cart from '@/models/Cart';

export async function GET() {
  try {
    await connectToDatabase();
    const carts = await Cart.find().limit(5);
    return NextResponse.json(carts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    data.updatedAt = new Date();

    const cart = new Cart(data);
    await cart.save();

    return NextResponse.json({ message: 'Cart saved', cart }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}
