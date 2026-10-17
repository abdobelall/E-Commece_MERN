import { cartModel } from "../models/cartModel.js";

interface CreateCartForUser {
    userId: string;
}

const createCartforUser = async ({ userId }: CreateCartForUser) => {

    const cart = await cartModel.create({ userId });
}