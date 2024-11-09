const Cart = require("../model/CartModel");

const createCart = async (newCart) => {
    try {
        // Tạo sản phẩm mới
        const createdCart = await Cart.create(newCart);
        return {
            status: 'OK',
            message: 'Cart created successfully',
            data: createdCart,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const updateCart = async (id, updatedData) => {
    try {
        const cart = await Cart.findById(id);
        if (!cart) {
            return {
                status: 'FAILED',
                message: 'Cart not found cart with id',
            };
        }

        const updatedCart = await Cart.findByIdAndUpdate(id, updatedData, { new: true });
        return {
            status: 'OK',
            message: 'Cart updated successfully',
            data: updatedCart,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const getAllCarts = async ( sort,filter) => {
  
    try {
        const totalCart = await Cart.countDocuments();
      
        if(filter){
            console.log('filter ok');
            const label = filter[0]; // Tên trường cần lọc
            const value = filter[1]; // Giá trị để lọc
        
            // Kiểm tra xem trường có trong sản phẩm không
            const CartFilter = await Cart.find({ [label]: { '$regex': value, '$options': 'i' } }) 
            return {
                status: 'OK',
                message: 'Carts retrieved successfully',
                data: CartFilter,
                total:totalCart
            };
        }
        if(sort){
            console.log('sort ok');
            const objectSort ={};
            objectSort[sort[0]] = sort[1];
            console.log('objectSort',objectSort);
            const CartSort = await Cart.find().sort(objectSort); 
            return {
                status: 'OK',
                message: 'Carts retrieved successfully',
                data: CartSort
            };
        }
        const Carts = await Cart.find();
        return {
            status: 'OK',
            message: 'Carts retrieved successfully',
            data: Carts
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while retrieving Carts',
            err: error.message,
        };
    }
};
const getByUserId = async (userId) => {
    try {
        const cartItems = await Cart.find({ userId }); 
        return {
            status: 'OK',
            data: cartItems,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};
const deleteCart = async (id) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(id);
        if (!deletedCart) {
            return {
                status: 'FAILED',
                message: 'Cart not found',
            };
        }

        return {
            status: 'OK',
            message: 'Cart deleted successfully',
            data: deletedCart,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while deleting the Cart',
            err: error.message,
        };
    }
};

module.exports = {
    createCart,
    updateCart,
    getAllCarts,
    deleteCart,
    getByUserId
};
