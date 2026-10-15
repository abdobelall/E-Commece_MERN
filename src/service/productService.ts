import productModel from '../models/productModel.js';

export const getAllProducts = async () => {
    return await productModel.find();
}

export const seedInitialProducts = async () => {
    const products = [
        { name: "Dell Laptop", image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXNvkM2yAsKO0wEGPA8cZU9CL59hCa32L2CofYYatE4M3Rj2_ZFNX_ihU&s=10", price: 10000, stock: 10 },
    ];

    const product2 = await getAllProducts();

    if (product2.length === 0) {
        await productModel.insertMany(products);
    }

};