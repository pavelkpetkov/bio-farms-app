const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: [true, 'Title is required'], minLength: [3, 'Title has to be at least 3 characters long'] },
    productImage: { type: String, required: [true, 'Image is required'] },
    description: { type: String, required: [true, 'Description is required'], minLength: [5, 'Description has to be at least 5 characters long'] },
    farmer: { type: Schema.Types.ObjectId, ref: 'Farmer' },
    orders: []
})

module.exports = model("Product", schema);
