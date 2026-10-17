import express from "express";
import { getActiveCartForUser } from "../service/cartService.js";

const router = express.Router();

router.get("/",async (req, res) => {
    //xxx
    const cart = await getActiveCartForUser({ userId : "xxx" });
    res.status(200).send(cart);
})

export default router;