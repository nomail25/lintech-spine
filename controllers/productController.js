const Product = require("../models/Product");

// ✅ Add a New Product
exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      modelNumber,
      description,
      category,
      vendor,
      stock,
      price,
      images,
      size,
      weight,
      rating,
      warrantyDetail,
    } = req.body;

    // Check if product with same modelNumber exists
    const existingProduct = await Product.findOne({ modelNumber });
    if (existingProduct) {
      return res.status(400).json({ message: "Product with this model number already exists" });
    }

    const newProduct = new Product({
      name,
      modelNumber,
      description,
      category,
      vendor,
      stock,
      price,
      images,
      size,
      weight,
      rating,
      warrantyDetail,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Products
exports.getAllProducts = async (req, res) => {
    try {
      let { category, vendor, minPrice, maxPrice, inStock, sort, page, limit } = req.query;
  
      let filter = {}; // Empty filter object
  
      if (category) filter.category = category;
      if (vendor) filter.vendor = vendor;
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice); // Greater than or equal to
        if (maxPrice) filter.price.$lte = Number(maxPrice); // Less than or equal to
      }
      if (inStock) filter.stock = { $gt: 0 }; // Only products in stock
  
      // Pagination defaults
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      const skip = (page - 1) * limit;
  
      // Sorting options (default: newest first)
      const sortOptions = {};
      if (sort) {
        const sortField = sort.startsWith("-") ? sort.substring(1) : sort;
        sortOptions[sortField] = sort.startsWith("-") ? -1 : 1;
      } else {
        sortOptions.createdAt = -1; // Default: sort by newest first
      }
  
      // Get total count of products
      const total = await Product.countDocuments(filter);
  
      // Fetch products with filter, pagination, and sorting
      const products = await Product.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);
  
      res.status(200).json({
        total,
        page,
        pages: Math.ceil(total / limit),
        products,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// ✅ Get a Single Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update a Product by ID
exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      modelNumber,
      description,
      category,
      vendor,
      stock,
      price,
      images,
      size,
      weight,
      rating,
      warrantyDetail,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        modelNumber,
        description,
        category,
        vendor,
        stock,
        price,
        images,
        size,
        weight,
        rating,
        warrantyDetail,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a Product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
