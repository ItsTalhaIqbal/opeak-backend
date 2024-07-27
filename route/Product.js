import express from "express";
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "../controllers/product.controller.js";

const productRoute= express.Router();
  

productRoute.post('/product', createProduct);
productRoute.get('/product',getAllProducts)
//single product get
productRoute.get('/product/:id',getOneProduct)

productRoute.put('/product/:id',updateProduct)
productRoute.delete('/product/:id',deleteProduct)

export default productRoute;
