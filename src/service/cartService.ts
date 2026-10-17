import { Cart } from "../models/cartModel.js";

interface CreateCartForUser {
    userId: string;
}

const createCartforUser = async ({ userId }: CreateCartForUser) => {

    const cart = await Cart.create({ userId });
}