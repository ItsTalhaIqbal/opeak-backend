import { Router } from "express";
import { createMessage,getMessage,deleteMessage } from "../controllers/message.controller.js";
const messageRoute = Router()

messageRoute.post('/message',createMessage)
messageRoute.get('/message',getMessage)
messageRoute.delete('/message:id',deleteMessage)


export default messageRoute;