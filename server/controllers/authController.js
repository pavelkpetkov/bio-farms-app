const router = require('express').Router();
const { register, login, getUserById } = require('../services/user');
const { registerFarmer, loginFarmer, getFarmerById } = require('../services/farmer');

router.post('/registerUser', async (req, res) => {
    try {
        if (!req.body.username.trim()) {
            throw new Error('Username is required!');
        }
        if (!req.body.email.trim()) {
            throw new Error('Email is required!');
        }
        if (req.body.password.trim().length < 3) {
            throw new Error('Password must be at least 3 characters!');
        }

        const userData = await register(req.body.username.trim(), req.body.email.trim(), req.body.password.trim());
        res.json(userData);

    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
});


router.post('/registerFarmer', async (req, res) => {
    try {
        if (!req.body.username.trim()) {
            throw new Error('Username is required!');
        }
        if (!req.body.email.trim()) {
            throw new Error('Email is required!');
        }
        if (req.body.password.trim().length < 3) {
            throw new Error('Password must be at least 3 characters!');
        }

        const farmerData = await registerFarmer(req.body.username.trim(), req.body.email.trim(), req.body.farmName.trim(),
        req.body.farmLocation.trim(), req.body.products.trim(), req.body.password.trim());
        res.json(farmerData);

    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
});

router.post('/loginUser', async (req, res) => {
    try {
        const userData = await login(req.body.username, req.body.password);
        res.json(userData);

    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
});

router.post('/loginFarmer', async (req, res) => {
    try {
        const farmerData = await loginFarmer(req.body.username, req.body.password);
        res.json(farmerData);

    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
});

router.get('/logout', (req, res) => {
    res.status(204).send({ message: 'Logged out!' });;
});

router.get('/profileClient/:id', async (req, res) => {
    const client = await getUserById(req.params.id);
    res.json(client);
});

router.get('/profileFarmer/:id', async (req, res) => {
    const farmer = await getFarmerById(req.params.id);
    res.json(farmer);
});

module.exports = router;