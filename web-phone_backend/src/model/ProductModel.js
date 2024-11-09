const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
    name: { type: String, required: false },
    value: { type: Number, required: false },
    oldPrice: { type: Number, required: false }
});

const detailSchema = new mongoose.Schema({
    screen: { type: String, required: false },
    os: { type: String, required: false },
    camera: { type: String, required: false },
    cameraFront: { type: String, required: false },
    cpu: { type: String, required: false },
    ram: { type: String, required: false },
    rom: { type: String, required: false },
    microUSB: { type: String, required: false },
    battery: { type: String, required: false }
});
const colorSchema = new mongoose.Schema({
    color: { type: String, required: false },
    code: { type: String, required: false },
    countInstock: { type: Number, required: false }
});
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        company: { type: String, required: false },
        image: { type: String, required: false },
        price: { type: Number, required: false },
        rating: { type: Number, required: false },
        rateCount: { type: Number, required: false },
        countInstock: { type: Number, required: false },
        description: { type: String, required: false },
        promo: { type: promoSchema, required: false },
        detail: { type: detailSchema, required: false },
        colors: { type: [colorSchema], required: false }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
