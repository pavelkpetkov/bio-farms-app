const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    farmName: { type: String, required: true },
    farmLocation: { type: String, required: true },
    products: { type: String, required: true },
    hashedPassword: { type: String, required: true }
})

module.exports = model("Farmer", schema);