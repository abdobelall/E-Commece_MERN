import express from "express";
import validateJWT from "../middlewares/validateJWT.js";
import cartService, { getActiveCartForUser } from "../service/cartService.js";
import deleteItemFromCart from "../service/cartService.js";
import clearCart from "../service/cartService.js";
import { extendedRequest } from "../types/extendedRequest.js";

const router = express.Router();

router.get("/", validateJWT, async (req, res) => {
    
    const userId = req.user._id;

    const cart = await getActiveCartForUser({ userId });

    res.status(200).send(cart);
})

router.post("/items", validateJWT, async (req, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await cartService.addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
})

router.put("/items", validateJWT, async (req, res) => {
    const userId = req.user._id;
    const {productId, quantity} = req.body;
    const response = await cartService.updateCartItem({userId, productId, quantity});
    res.status(response.statusCode).send(response.data);
})

router.delete("/items/:productId", validateJWT, async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;
    const response = await cartService.deleteItemFromCart({ userId, productId });
    res.status(response.statusCode).send(response.data);
})

router.delete("/", validateJWT, async (req, res) => {
    const userId = req.user._id;
    const response = await cartService.clearCart({ userId });
    res.status(response.statusCode).send(response.data);
})

router.post("/checkout", validateJWT, async (req : extendedRequest , res) => {
    const userId = req.user._id;
    const { address } = req.body
    const response = await cartService.checkout({ userId, address });
    res.status(response.statusCode).send(response.data);
});


export default router;

function addItemToCart(arg0: { userId: any; productId: any; quantity: any; }) {
    throw new Error("Function not implemented.");
}
