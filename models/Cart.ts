import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
  userId: string;
  items: Array<{
    variantId: number;
    productName: string;
    poids: number;
    quantity: number;
    price: number;
    dateAjout: Date;
  }>;
  updatedAt: Date;
}

const ItemSchema = new Schema({
  variantId: Number,
  productName: String,
  poids: Number,
  quantity: Number,
  price: Number,
  dateAjout: Date,
});

const CartSchema = new Schema<ICart>({
  userId: { type: String, required: true },
  items: [ItemSchema],
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);
