const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: false},
    amount: { type: Number, required: true },
    productId: { type: String, required: true },
    userId: { 
        type: String, required: true 
     },
     phone: { type: String, required: true },
     color: { type: String, required: true },
     accept: { type: Boolean, required: false,default: false},
     isPaid: { type: Boolean, required: false}
        },

    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;
