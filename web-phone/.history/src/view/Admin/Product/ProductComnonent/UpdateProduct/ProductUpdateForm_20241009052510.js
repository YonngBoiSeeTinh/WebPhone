import React, { useState } from 'react';
import axios from 'axios';
import ProductOptions from './ProductOptions'; // Nhập component ProductOptions
import ProductDetailForm from '../UpdateProduct/ProductDetailsForm';
function ProductUpdateForm({ product, imageLink, setProduct }) {
    const [updatedProduct, setUpdatedProduct] = useState({ ...product });

    // Hàm xử lý thay đổi của input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Hàm xử lý cập nhật sản phẩm
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedProductCopy = { ...updatedProduct };
        if (imageLink) {
            updatedProductCopy.image = imageLink; // Cập nhật link hình ảnh nếu có thay đổi
        }

        delete updatedProductCopy._id;  // Xóa trường _id
        
        try {
            const response = await axios.put(`http://localhost:3001/api/product/update/${product._id}`, updatedProductCopy);
            console.log('update product copy',updatedProductCopy);
          
           
            alert("Product updated successfully!");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
    const promoOptions = ['moi', 'giamgia', 'tragop'];
    const handlePromoChange = (e) => {
        const { name, value } = e.target;

        setUpdatedProduct((prev) => ({
            ...prev,
            promo: {
                ...prev.promo,
                [name]: value // Cập nhật thông tin khuyến mãi
            }
        }));
    };

    return (
        <form className="product-update-form" onSubmit={handleUpdate}>
            <div className="product-update-form_item">
                <div>Tên sản phẩm</div>
                <input
                    type="text"
                    name="name"
                    value={updatedProduct.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Công ty</div>
                <input
                    type="text"
                    name="company"
                    value={updatedProduct.company}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Giá</div>
                <input
                    type="number"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>Màu</div>
            <ProductOptions colors={product.colors} setUpdatedProduct = {setUpdatedProduct}></ProductOptions>
            <div className="info_product promo">
                <h2>Khuyến mãi</h2>
                <ul className="info">
                    <li>
                    <p>Tên Khuyến mãi</p>
                        <select
                            name="name"
                            onChange={handlePromoChange}
                        >
                            {promoOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </li>
                    <li>
                        <p>Giá trị:</p>
                        <input
                            type="text"
                            name="value"
                            style={{ width: '300px' }}
                            defaultValue={updatedProduct.promo.value}
                            onChange={handlePromoChange}
                        />
                    </li>
                    <li>
                        <p>Giá gốc:</p>
                        <input
                            type="text"
                            name="oldPrice"
                            style={{ width: '300px' }}
                            defaultValue={updatedProduct.promo.oldPrice}
                            onChange={handlePromoChange}
                        />
                    </li>
                </ul>
            </div>
            <ProductDetailForm setUpdatedProduct={setUpdatedProduct} />
           
            <button className="btnSubmit" type="submit">Cập nhật sản phẩm</button>
        </form>
    );
}

export default ProductUpdateForm;