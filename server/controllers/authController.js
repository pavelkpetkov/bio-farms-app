const router = require('express').Router();
const { register, login, getUserById } = require('../services/user');

router.post('/register', async (req, res) => {
    try {
        // console.log(req.body);
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
}
);

router.post('/login', async (req, res) => {
    try {
        const userData = await login(req.body.username, req.body.password);
        res.json(userData);

    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
});

router.get('/logout', (req, res) => {
    res.status(204).end();
});

router.get('/profile/:id', async (req, res) => {
    const owner = await getUserById(req.params.id);
    res.json(owner);
});

module.exports = router;