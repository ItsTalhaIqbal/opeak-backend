import express from 'express';
import { orderCreate,ordersGet } from '../controllers/order.controller.js';

const orderRoute = express.Router();

orderRoute.post('/checkout', orderCreate);
orderRoute.get('/orders', ordersGet);


export default orderRoute;
