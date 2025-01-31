const Product = require("../models/product.model");
/*
 * Utility function for handling error responses
 * @param res - The response object.THis is the objects the we will define the details to be send back to the user.
 * @param error - This is the error OBject that will be passes from the parameters in the CAtch Block

*/
const handleErrorResponse = (res, error, message = "An error occurred") => {
  console.error(error); // Log the error for debugging
  res.status(500).json({ error: message, details: error.message });
};
/**
 * It's an asynchronous function that uses the await keyword to wait for the result of the find()
 * method on the Product model.
 *
 * The find() method returns a promise, which is why we can use the await keyword.
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
    res.status(200).json(products);
  } catch (error) {
    handleErrorResponse(res, error, "Failed to fetch products");
  }
};

/**
 * It's an asynchronous function that uses the Product model to find a product by its id, and then
 * sends a response with the product's data.
 * @param req - The request object.
 * @param res - The response object.
 */
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    handleErrorResponse(res, error, "Failed to fetch product");
  }
};

/**
 * It creates a new product using the data from the request body and returns the created product in the
 * response.
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
const createProduct = async (req, res) => {
  const { name, price, description } = req.body;

  // Validate required fields
  if (!name || !price || !description) {
    return res
      .status(400)
      .json({ message: "Name, price, and description are required." });
  }

  try {
    const newProduct = new Product({
      name,
      price,
      description,
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    handleErrorResponse(res, error, "Failed to create product");
  }
};

/**
 * It takes the id of the product to be updated from the request params, and the updated product data
 * from the request body, and then updates the product in the database with the new data, and returns
 * the updated product to the client.
 * @param req - The request object.
 * @param res - The response object.
 */
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated product
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    handleErrorResponse(res, error, "Failed to update product");
  }
};
/**
 * It finds a product by its id and deletes it.
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product successfully deleted", product });
  } catch (error) {
    handleErrorResponse(res, error, "Failed to delete product");
  }
};
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
