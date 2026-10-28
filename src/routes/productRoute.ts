import express from "express";
import { getAllProducts } from "../service/productService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const prodeucts = await getAllProducts();
        res.status(200).send(prodeucts)
    } catch (err) {
        res.status(500).send ("Something went wrong")
    }
});


export default router;