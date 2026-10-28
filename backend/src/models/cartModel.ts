import {Schema, model, Document, type ObjectId} from "mongoose";
import type { Iproduct } from "./productModel.js";

export interface ICartItem {
  product: Iproduct;
  unitPrice: number;
  quantity: number;
}

export interface ICart extends Document {
    userId : ObjectId | string;
    items: ICartItem[];
    totalPrice: number;
    status: "active" | "completed";
    totalAmount: number;
}

const cartItemSchema = new Schema<ICartItem>({
  product: { type: Object, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
  totalAmount: {type: Number, default: 0},
  status: { type: String, enum: ["active", "completed"], default: "active" },
});

export const cartModel = model<ICart>("Cart", cartSchema);

