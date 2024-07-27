import Category from '../models/Categorey.model.js'

const createCategory = async (req, res) => {
  const h= req.body
  console.log(h.value);
  const {name} =req.body;
  try {
    const category = await Category.create({ name });
    res.status(201).json(category); // 201 indicates resource created
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Backend: error creating category", error: error.message });
  }

};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parent');
    res.status(200).json(categories); 
  } catch (error) {
    res.status(500).json({ message: "Backend: error finding categories", error: error.message });
  }
};



const updateCategory = async (req, res) => {
  const {id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Backend: error updating category", error: error.message });
  }
};



const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Backend: error deleting category", error: error.message });
  }
};



export { createCategory, getCategories,updateCategory,deleteCategory };
