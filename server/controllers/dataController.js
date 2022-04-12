const router = require('express').Router();
const { isAuth, isOwner, isAuthFarmer } = require('../middlewares/guards');
const { getAll, createProduct, updateProduct, deleteProduct } = require('../services/product');
const preload = require('../middlewares/preload');

router.get('/', async (req, res) => {
    const data = await getAll();
    res.json(data);
});

router.post('/create', isAuthFarmer(), async (req, res) => {

    const data = {
        title: req.body.title,
        productImage: req.body.productImage,
        description: req.body.description,
        farmer: req.body.farmer_id,
    }
    console.log(`This is the data from client: ${req.body.farmer_id}`);

    try {
        const result = await createProduct(data);
        res.status(201).json(result);
    } catch(err) {
        res.status(err.status || 400).json({ message: err.message });
    }   
});

router.get('/details/:id', preload(), async (req, res) => {

    const item = req.data.toObject();
    item._ownerId = item.farmer.toString();
    res.json(item);
});

router.put('/edit/:id', isAuthFarmer(), preload(), isOwner(), async (req, res) => {

    const updated = {
        title: req.body.title,
        productImage: req.body.productImage,
        description: req.body.description,
    }

    try {
        const result = await updateProduct(req.data, updated);
        res.json(result);
    } catch(err) {
        res.status(err.status || 400).json({ message: err.message });
    } 
});

router.delete('/delete/:id', isAuthFarmer(), preload(), isOwner(), async (req, res) => {

    try {
        await deleteProduct(req.params.id);
        res.status(204).end();
    } catch(err) {
        res.status(err.status || 400).json({ message: err.message });
    } 
});

module.exports = router;
