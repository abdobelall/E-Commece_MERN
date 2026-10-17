import { cartModel } from "../models/cartModel.js";

interface CreateCartForUser {
    userId: string;
}

const createCartforUser = async ({ userId }: CreateCartForUser) => {

    const cart = await cartModel.create({ userId });
    await cart.save();
    return cart;
}

interface GetActiveCartForUser {
    userId: string;
}

const getActiveCartForUser = async ({ userId }: GetActiveCartForUser) => {
    let cart = await cartModel.findOne({ userId, status: "active" })

    if (!cart) {
        cart = await createCartforUser({ userId });
    }

    return cart;
}

export default {
    createCartforUser,
    getActiveCartForUser
}