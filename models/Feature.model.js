import mongoose, { Schema } from "mongoose";

const featureProductSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
});

const FeatureProduct = mongoose.model('FeatureProduct', featureProductSchema);

export default FeatureProduct;
