import { Product } from "../models/Product.models.js";

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single product by ID
const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: "Product does not exist" });
    }
    res.status(200).json({ message: "Updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ message: "Could not update product", error: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product does not exist" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(400).json({ message: "Could not delete product", error: error.message });
  }
};

export { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct };
