import { cartModel } from "../models/cartModel.js";
import productModel from "../models/productModel.js";

interface CreateCartForUser {
    userId: string;
}

export const createCartforUser = async ({
    userId,
}: CreateCartForUser) => {
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

    const existsInCart = cart.items.find((p) => p.product === productId);

    if(existsInCart){
        return {data : "Product already exists in cart", status : 400};
    }

    const product = await productModel.findById(productId);

    if (!product) {
        return {data : "Product not found", status : 404};
    }

    if(product.stock < quantity){
        return {data : "No enough stock", status : 400};
    }

    cart.items.push({
        product: productId,
        unitPrice: product.price,
        quantity,
    });

    cart.totalAmount += product.price * quantity;

    const updatedCart = await cart.save();
    
    return {data : updatedCart, status : 200};
}   

interface UpdateCartItem {
    userId: string;
    productId: any;
    quantity: number;
}

const updateCartItem = async ({ userId, productId, quantity }: UpdateCartItem) => {

    const cart = await getActiveCartForUser({ userId });
    const existsInCart = cart.items.find((p) => p.product === productId);

    if(!existsInCart){
        return {data : "Product not found in cart", status : 400};
    }

    const product = await productModel.findById(productId);

    if (!product) {
        return {data : "Product not found", status : 404};
    }

    if(product.stock < quantity){
        return {data : "No enough stock", status : 400};
    }


    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);

    let total = otherCartItems.reduce((sum, product) =>{
        sum += product.unitPrice * product.quantity ;
        return sum ;
    },0)

    existsInCart.quantity = quantity; 

    total += existsInCart.unitPrice * existsInCart.quantity;

    cart.totalAmount = total;

    const updatedCart = await cart.save();

    return {data : updatedCart, status : 200};

};

export default {
    createCartforUser,
    getActiveCartForUser,
    addItemToCart,
    updateCartItem
};



