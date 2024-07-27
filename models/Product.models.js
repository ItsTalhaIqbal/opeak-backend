import mongoose from "mongoose";

// Define the product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Ensure that every product has a name
    },
    description: {
      type: String,
      default: "", // Provide a default value to avoid undefined descriptions
    },
    price: {
      type: Number,
      required: true, // Ensure that every product has a price
    },
    images: {
      type: [String], // Array of strings for image URLs
      default: [], // Provide a default empty array
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
      required: true, // Ensure that every product belongs to a category
    },
    properties: [
      {
        name: {
          type: String,
          required: true, // Ensure every property has a name
        },
        value: {
          type: [String], // Array of strings for property values
          default: [], // Provide a default empty array
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the product model
export const Product = mongoose.model("Product", productSchema);
