import express from "express";
import validateJWT from "../middlewares/validateJWT.js";
import { getActiveCartForUser, addItemToCart } from "../service/cartService.js";

const router = express.Router();

router.get("/", validateJWT, async (req, res) => {
    
    const userId = req.user._id;

    const cart = await getActiveCartForUser({ userId });

    res.status(200).send(cart);
})

router.post("/items", validateJWT, async (req, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.status).send(response.data);
})

export default router;

function addItemToCart(arg0: { userId: any; productId: any; quantity: any; }) {
    throw new Error("Function not implemented.");
}
