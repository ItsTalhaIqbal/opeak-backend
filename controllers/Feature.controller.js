import FeatureProduct from "../models/Feature.model.js";

const createFeatureProduct = async (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  try {
    const product = await FeatureProduct.create({ product: _id });
    res.status(200).json({ message: "Product added as a Feature Product", product });
  } catch (error) {
    res.status(400).json({ message: "Error featuring product", error });
  }
};

const getFeatureProduct = async (req, res) => {
  try {
    const products = await FeatureProduct.find().populate('product');
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "Error finding Feature products", error });
  }
};

const removeFeatureProduct = async (req, res) => {
  const { id } = req.params; 
  try {
    const product = await FeatureProduct.findByIdAndDelete(id);
    res.status(200).json({ message: "Product removed from featured", product });
  } catch (error) {
    res.status(400).json({ message: "Error removing featured product", error });
  }
};

export { createFeatureProduct, removeFeatureProduct, getFeatureProduct };
