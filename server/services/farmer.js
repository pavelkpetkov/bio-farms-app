const Farmer = require('../models/Farmer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config');

async function registerFarmer(username, email, farmName, farmLocation, products, password) {

    const existing = await Farmer.findOne({ email });

    if (existing) {
        const err = new Error('Email is taken!');
        err.status = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const farmer = new Farmer({
        username,
        email,
        farmName,
        farmLocation,
        products,
        hashedPassword
    })
    await farmer.save();
    return {
        _id: farmer._id,
        username: farmer.username,
        email: farmer.email,
        farmName: farmer.farmName,
        farmLocation: farmer.farmLocation,
        products: farmer.products,
        accessToken: generateToken(farmer)
    }
}

function generateToken(userData) {
    const token = jwt.sign({
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        farmName: userData.farmName,
        farmLocation: userData.farmLocation,
        products: userData.products
    }, TOKEN_SECRET);

    return token;
}

async function loginFarmer(username, password) {

    const farmer = await Farmer.findOne({ username });

    if (!farmer) {
        const err = new Error('No such farmer!');
        err.status = 401;
        throw err;
    }

    const hasMatch = await bcrypt.compare(password, farmer.hashedPassword);

    if (!hasMatch) {
        const err = new Error('Incorect password');
        err.status = 401;
        throw err;
    }

    return {
        _id: farmer._id,
        username: farmer.username,
        email: farmer.email,
        farmName: farmer.farmName,
        farmLocation: farmer.farmLocation,
        products: farmer.products,
        accessToken: generateToken(farmer)
    }
}

async function getFarmerByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i');
    const farmer = await Farmer.findOne({ email: { $regex: pattern } }).lean();
    return farmer;
}

async function getFarmerByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i');
    const farmer = await Farmer.findOne({ username: { $regex: pattern } }).lean();
    return farmer;
}

async function getFarmerById(id) {
    const farmer = await Farmer.findById(id).lean();
    return farmer;
}

module.exports = {
    registerFarmer,
    loginFarmer,
    getFarmerByEmail,
    getFarmerByUsername,
    getFarmerById
}