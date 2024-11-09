const express = require("express");
const router= express.Router();
const timekeepingController = require('../controllers/TimeKeepingController');

router.post('/create', timekeepingController.createOrder);
router.put('/update/:id', timekeepingController.updateOrder);
router.get('/get', timekeepingController.getAllOrders);
router.get('/getByUserId/:userId', timekeepingController.getByUserId);
router.delete('/delete/:id', timekeepingController.deleteOrder);
module.exports = router;