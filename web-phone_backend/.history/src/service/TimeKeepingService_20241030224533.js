const TimeKeeping = require("../model/TimeKeeping");
//order service
const createTimeKeeping = async (newOrder) => {
    try {
        // Tạo sản phẩm mới
        const createdOrder = await TimeKeeping.create(newOrder);
        return {
            status: 'OK',
            message: 'Order created successfully',
            data: createdOrder,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const updateTimeKeeping = async (id, updatedData) => {
    try {
        const order = await TimeKeeping.findById(id);
        if (!order) {
            return {
                status: 'FAILED',
                message: 'Order not found Order with id',
            };
        }

        const updatedOrder = await TimeKeeping.findByIdAndUpdate(id, updatedData, { new: true });
        return {
            status: 'OK',
            message: 'Order updated successfully',
            data: updatedOrder,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const getTimeKeeping = async ( sort,filter) => {
  
    try {
        const totalOrder = await Order.countDocuments();
      
        if(filter){
            console.log('filter ok');
            const label = filter[0]; // Tên trường cần lọc
            const value = filter[1]; // Giá trị để lọc
        
            // Kiểm tra xem trường có trong sản phẩm không
            const OrderFilter = await Order.find({ [label]: { '$regex': value, '$options': 'i' } }) 
            return {
                status: 'OK',
                message: 'Orders retrieved successfully',
                data: OrderFilter,
                total:totalOrder
            };
        }
        if(sort){
            console.log('sort ok');
            const objectSort ={};
            objectSort[sort[0]] = sort[1];
            console.log('objectSort',objectSort);
            const OrderSort = await Order.find().sort(objectSort); 
            return {
                status: 'OK',
                message: 'Orders retrieved successfully',
                data: OrderSort
            };
        }
        const Orders = await Order.find();
        return {
            status: 'OK',
            message: 'Orders retrieved successfully',
            data: Orders
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while retrieving Orders',
            err: error.message,
        };
    }
};
const getByUserId = async (userId) => {
    try {
        const OrderItems = await TimeKeeping.find({ userId }); 
        return {
            status: 'OK',
            data: OrderItems,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};
const deleteTimeKeeping = async (id) => {
    try {
        const deletedOrder = await TimeKeeping.findByIdAndDelete(id);
        if (!deletedOrder) {
            return {
                status: 'FAILED',
                message: 'Order not found',
            };
        }

        return {
            status: 'OK',
            message: 'Order deleted successfully',
            data: deletedOrder,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while deleting the Order',
            err: error.message,
        };
    }
};

module.exports = {
    createTimeKeeping,
    updateTimeKeeping,
    getTimeKeeping,
    deleteTimeKeeping,
    getByUserId
};