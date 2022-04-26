const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config');

async function register(username, email, password) {

    const existing = await User.findOne({ email });

    if (existing) {
        const err = new Error('Email is taken!');
        err.status = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        email,
        hashedPassword
    })
    await user.save();
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        accessToken: generateToken(user)
    }
}

function generateToken(userData) {
    const token = jwt.sign({
        _id: userData._id,
        username: userData.username,
        email: userData.email
    }, TOKEN_SECRET);

    return token;
}

async function login(username, password) {

    const user = await User.findOne({ username });

    if (!user) {
        const err = new Error('No such user!');
        err.status = 401;
        throw err;
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!hasMatch) {
        const err = new Error('Incorrect password');
        err.status = 401;
        throw err;
    }

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        accessToken: generateToken(user)
    }
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i');
    const user = await User.findOne({ email: { $regex: pattern } }).lean();
    return user;
}

async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({ username: { $regex: pattern } }).lean();
    return user;
}

async function getUserById(id) {
    const user = await User.findById(id).lean();
    return user;
}

module.exports = {
    register,
    login,
    getUserByEmail,
    getUserByUsername,
    getUserById
}