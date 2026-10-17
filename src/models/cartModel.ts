import {Schema, model, Document, type ObjectId} from "mongoose";
import type { Iproduct } from "./productModel.js";

export interface ICartItem extends Document {
  product: Iproduct;
  uintPrice: number;
  quantity: number;
}

export interface ICart extends Document {
    userId : ObjectId | string;
    items: ICartItem[];
    toatalPrice: number;
    status: "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
  product: { type: Object, required: true },
  uintPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
  toatalPrice: { type: Number, required: true },
  status: { type: String, enum: ["active", "completed"], default: "active" },
});

export const Cart = model<ICart>("Cart", cartSchema);

