import { model, Schema } from "mongoose";
const messageSchema = new Schema({
  email:{
    type :String,
    required : true
  },
  name:{
    type: String,
    required:true
  },
  description:{
    type: String,
    required:true
  }
},{timestamps:true})

const Message = model("Message",messageSchema);
export default Message