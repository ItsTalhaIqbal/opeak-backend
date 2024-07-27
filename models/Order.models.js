import { model, Schema } from "mongoose";

const orderSchema=new Schema({
  line_items:Object,
  name:String,
  email:String,
  city:String,
  postalCode:String,
  streetAddress:String,
  country:String,
  Paid:Boolean

})

const Order = model("Order",orderSchema)
export default Order;