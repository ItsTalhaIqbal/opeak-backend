import { Router } from "express";
import { createFeatureProduct ,getFeatureProduct,removeFeatureProduct } from "../controllers/Feature.controller.js";

const featureProduct = Router()

featureProduct.post('/feature',createFeatureProduct)
featureProduct.get('/feature',getFeatureProduct)
featureProduct.delete('/feature/:id',removeFeatureProduct)


export default featureProduct;