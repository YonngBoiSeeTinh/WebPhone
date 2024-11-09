const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalPrice: { type: Number, required: false},
    amount: { type: Number, required: true },
    productId: { type: String, required: true },
    userId: { 
        type: String, required: true 
     },
     phone: { type: String, required: true },
     name: { type: String, required: false },
     address: { type: String, required: false },
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
