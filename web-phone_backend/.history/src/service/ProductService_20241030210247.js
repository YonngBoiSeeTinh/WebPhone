const Product = require("../model/ProductModel");

const createProduct = async (newProduct) => {
    try {
        // Kiểm tra xem tên sản phẩm đã tồn tại chưa 
        const existingProduct = await Product.findOne({ name: newProduct.name });
        if (existingProduct) {
            return {
                status: 'ERR',
                message: 'Tên sản phẩm đã được đăng ký!',
            };
        }

        // Tạo sản phẩm mới
        const createdProduct = await Product.create(newProduct);
        return {
            status: 'OK',
            message: 'Product created successfully',
            data: createdProduct,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const updateProduct = async (id, updatedData) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return {
                status: 'FAILED',
                message: 'Product not found',
            };
        }

        // Cập nhật thông tin sản phẩm
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
        return {
            status: 'OK',
            message: 'Product updated successfully',
            data: updatedProduct,
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const getAllProducts = async (limit =20,page=0, sort,filter) => {
  
    try {
        const totalProduct = await Product.countDocuments();
      
        if(filter){
            console.log('filter ok');
            const label = filter[0]; // Tên trường cần lọc
            const value = filter[1]; // Giá trị để lọc
        
            // Kiểm tra xem trường có trong sản phẩm không
            const productFilter = await Product.find({ [label]: { '$regex': value, '$options': 'i' } }) // '$options': 'i' để không phân biệt chữ hoa chữ thường
                .limit(limit)
                .skip(page * limit);
            return {
                status: 'OK',
                message: 'Products retrieved successfully',
                data: productFilter,
                total:totalProduct,
                pageCurrent :Number(page)+1,
                totalPage : Math.ceil(totalProduct/limit),
            };
        }
        if(sort){
            console.log('sort ok');
            const objectSort ={};
            objectSort[sort[0]] = sort[1];
            console.log('objectSort',objectSort);
            const productSort = await Product.find().limit(limit).skip(page*limit).sort(objectSort); 
            return {
                status: 'OK',
                message: 'Products retrieved successfully',
                data: productSort,
                total:totalProduct,
                pageCurrent :Number(page)+1,
                totalPage : Math.ceil(totalProduct/limit),
            };
        }
        const products = await Product.find().limit(limit).skip(page*limit);
        return {
            status: 'OK',
            message: 'Products retrieved successfully',
            data: products,
            total:totalProduct,
            pageCurrent :Number(page)+1,
            totalPage : Math.ceil(totalProduct/limit),
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while retrieving products',
            err: error.message,
        };
    }
};
const getDetail = async (limit =20,page=0, sort,filter) => {
  
    try {
       
    } catch (error) {
        
    }
};


const deleteProduct = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return {
                status: 'FAILED',
                message: 'Product not found',
            };
        }

        return {
            status: 'OK',
            message: 'Product deleted successfully',
            data: deletedProduct,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while deleting the product',
            err: error.message,
        };
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
};
