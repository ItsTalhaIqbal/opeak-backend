import express from "express";
import {  createCategory,getCategories,updateCategory,deleteCategory } from "../controllers/category.controller.js";
createCategory

const router = express.Router()
const categoryRoute = router;

categoryRoute.post('/category',createCategory)
categoryRoute.get('/category',getCategories)
categoryRoute.put('/category/:id',updateCategory)
categoryRoute.delete('/category/:id',deleteCategory)




export default categoryRoute;