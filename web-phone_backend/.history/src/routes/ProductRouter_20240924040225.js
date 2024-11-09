const express = require("express");
const router= express.Router();
const productController = require('../controllers/ProductController');

router.post('/create', productController.createProduct);
router.put('/update/:id', productController.updateProduct);
router.get('/get', productController.getAllProducts);
router.delete('/delete/:id', productController.deleteProduct);
module.exports = router;