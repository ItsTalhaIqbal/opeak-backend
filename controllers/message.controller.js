import Message from "../models/Message.model.js";

 const createMessage=async (req,res)=>{
  const data= req.body
  console.log(data);
  try {
    const response= await Message.create(data)
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json("message creating error",error);
  }

 }


 const getMessage=async(req,res)=>{
  try {
    const messages = await Message.find()
    res.status(200).json(messages)
  } catch (error) {
    res.status(400).json("error getting messages from dataBase")
  }

 }
 const deleteMessage=async(req,res)=>{
  const {id} = req.params
  try {
    const response = await Message.findByIdAndDelete(id)
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json("error deleting message",error)
  }
 }

 export {createMessage, getMessage,deleteMessage}