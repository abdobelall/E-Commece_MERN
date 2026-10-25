import { cartModel, ICartItem } from "../models/cartModel.js";
import orderModel, { IOrderItem } from "../models/orderModel.js";
import productModel from "../models/productModel.js";

const calculateCartTotalItems = ({
  cartItems,
}: {
  cartItems: ICartItem[];
}) => {
  return cartItems.reduce((sum, product) => {
    return sum + product.quantity * product.unitPrice;
  }, 0);
};

interface CreateCartForUser {
  userId: string;
}

export const createCartforUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({
    userId,
    totalAmount: 0,
    status: "active",
  });

  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({
    userId,
    status: "active",
  });

  if (!cart) {
    cart = await createCartforUser({ userId });
  }

  return cart;
};

interface AddItemToCart {
  userId: string;
  productId: any;
  quantity: number;
}

const addItemToCart = async ({ userId, productId, quantity }: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  // تحويل product إلى string للمقارنة السليمة مع productId
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId.toString()
  );

  if (existsInCart) {
    return { data: "Product already exists in cart", status: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found", status: 404 };
  }

  if (product.stock < quantity) {
    return { data: "No enough stock", status: 400 };
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity,
  });

  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();

  return { data: updatedCart, status: 200 };
};

interface UpdateCartItem {
  userId: string;
  productId: any;
  quantity: number;
}

const updateCartItem = async ({ userId, productId, quantity }: UpdateCartItem) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId.toString()
  );

  if (!existsInCart) {
    return { data: "Product not found in cart", status: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found", status: 404 };
  }

  if (product.stock < quantity) {
    return { data: "No enough stock", status: 400 };
  }

  // تحديث الكمية ثم إعادة حساب الإجمالي مباشرة
  existsInCart.quantity = quantity;
  cart.totalAmount = calculateCartTotalItems({ cartItems: cart.items });

  const updatedCart = await cart.save();

  return { data: updatedCart, status: 200 };
};

interface DeleteItemFromCart {
  userId: string;
  productId: any;
}

const deleteItemFromCart = async ({ userId, productId }: DeleteItemFromCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId.toString()
  );

  if (!existsInCart) {
    return { data: "Product not found in cart", status: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId.toString()
  );

  cart.items = otherCartItems;
  cart.totalAmount = calculateCartTotalItems({ cartItems: otherCartItems });

  const updatedCart = await cart.save();

  return { data: updatedCart, status: 200 };
};

interface ClearCart {
  userId: string;
}

const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId });

  cart.items = [];
  cart.totalAmount = 0;

  const updatedCart = await cart.save();

  return { data: updatedCart, status: 200 };
};


interface Checkout {
  userId: string;
  address: string;
}


const checkout = async ({ userId, address }: Checkout) => {

  if(!address){
    return {data : "Please, Enter the address", status :400}
  }

  const cart = await getActiveCartForUser({ userId });

  const orderItems: IOrderItem[] = [];

  for (const item of cart.items) {
    const product: any = await productModel.findById(item.product);

    if (!product) {
      return { data: "Product not found", status: 404 };
    }

    const orderItem: IOrderItem = {
      productTitle: product.title,
      productImage: product.image,
      unitPrice: product.price,
      quantity: item.quantity,
    };

    orderItems.push(orderItem);
  }

  const order = await orderModel.create({
    orderItems,
    total: cart.totalAmount,
    address,
    userId,
  });

  cart.status = "completed";

  await order.save()

  await cart.save();

  return { data: order, status: 200 };
};




export default {
  createCartforUser,
  getActiveCartForUser,
  addItemToCart,
  updateCartItem,
  deleteItemFromCart,
  clearCart,
  checkout,
};




