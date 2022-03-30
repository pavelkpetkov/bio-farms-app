const Product = require('../models/Product');

async function getAll() {
    const products = await Product.find({}).lean();
    return products;
}

async function getById(id) {
    const product = await Product.findById(id);
    return product;
}

async function createProduct(data) {
    const product = new Product(data);
    await product.save();
    return product;
}

async function deleteProduct(id) {
    return Product.findByIdAndDelete(id);
}

async function updateProduct(original, updated) {
    Object.assign(original, updated);
    await original.save();
    return original;
}


module.exports = {
    getAll,
    getById,
    createProduct,
    updateProduct,
    deleteProduct
}
