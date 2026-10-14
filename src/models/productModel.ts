import {Schema, Document, model} from 'mongoose';


export interface Iproduct extends Document {
  name: string;
  price: number;
  image: string; 
  stock: number;
}

const productSchema = new Schema<Iproduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
});

const productModel = model<Iproduct>('Product', productSchema);

export default productModel;