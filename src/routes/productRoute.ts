import express from "express";
import { getAllProducts } from "../service/productService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const prodeucts = await getAllProducts();
    res.status(200).send(prodeucts)
});


export default router;