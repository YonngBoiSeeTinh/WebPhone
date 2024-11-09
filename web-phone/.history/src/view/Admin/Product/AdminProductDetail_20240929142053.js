import React from "react";
import './ProductDetail.css'; // Đảm bảo bạn đã tạo và liên kết file CSS
import { useEffect } from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { name } = useParams();

    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/product/get?filter=name&filter=${name}`);
            console.log('API Response:', res.data);
            return res.data.data[0];
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const query = useQuery({
        queryKey: ['products', name],
        queryFn: fetchApi
    });


    const product = query.data;

    // Kiểm tra xem product có tồn tại không
    if (!product) {
        return <div>Product not found.</div>;
    }
   

    function ProductUpdateForm({ product }) {
        const [updatedProduct, setUpdatedProduct] = useState({ ...product });
    
        // Hàm xử lý thay đổi input
        const handleChange = (e) => {
            const { name, value } = e.target;
            setUpdatedProduct((prev) => ({
                ...prev,
                [name]: value
            }));
        };
    
        // Hàm gửi yêu cầu cập nhật sản phẩm
        const handleUpdate = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.put(`http://localhost:3001/api/product/update`, updatedProduct);
                console.log("Update response:", response.data);
                alert("Product updated successfully!");
            } catch (error) {
                console.error("Error updating product:", error);
            }
        };
    
        return (
        <div className="product-container">
            <ProductGallery img={product.image} />
            <ProductInfo product={product} />
        </div>
    );
    
}

function ProductGallery({ img }) {
    return (
        <section>
            <div className="produc-detail">
            <div className="product-image">
            <div className="product-gallery">      
                <img src={img} alt="Sản phẩm" className="main-image" />            
            </div>
                <div className="thumbnail-gallery">
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                </div>
            </div>
            </div>
            
        </section>
              
    );
}

function ProductInfo({ product }) {
    const details = [
        { key: "Màn hình", value: product.detail?.screen || "Không có thông tin" },
        { key: "Hệ điều hành", value: product.detail?.os || "Không có thông tin" },
        { key: "Camera sau", value: product.detail?.camara || "Không có thông tin" },
        { key: "Camera trước", value: product.detail?.camaraFront || "Không có thông tin" },
        { key: "CPU", value: product.detail?.cpu || "Không có thông tin" },
        { key: "RAM", value: product.detail?.ram || "Không có thông tin" },
        { key: "ROM", value: product.detail?.rom || "Không có thông tin" },
        { key: "MicroSD", value: product.detail?.microUSB || "Không có thông tin" },
        { key: "Pin", value: product.detail?.battery || "Không có thông tin" },
    ];
    
    return (
        <div className="product-info">
            <h1>{product.name}</h1>
          
            <ProductOptions />
            
            <form className="product-update-form" onSubmit={handleUpdate}>
            <div>
                <label>Tên sản phẩm</label>
                <input
                    type="text"
                    name="name"
                    value={updatedProduct.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Công ty</label>
                <input
                    type="text"
                    name="company"
                    value={updatedProduct.company}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Giá</label>
                <input
                    type="number"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Mô tả</label>
                <textarea
                    name="description"
                    value={updatedProduct.description}
                    onChange={handleChange}
                    required
                />
            </div>
            {/* Thêm các trường cần cập nhật */}
            <button type="submit">Cập nhật sản phẩm</button>
        </form>
            
        </div>
    );
}


function ProductOptions() {
    return (
        <div className="options">
            <label>Dung lượng</label>
            <div className="capacity-options">
                <button className="capacity active">128GB</button>
                <button className="capacity">256GB</button>
            </div>
            <label>Màu</label>
            <div className="color-options">
                <button className="color active blue"></button>
                <button className="color white"></button>
                <button className="color black"></button>
                <button className="color pink"></button>
            </div>
        </div>
    );
}

function ProductPrice({ price, oldPrice }) {
    return (
        <div className="price-box">
            <div><div className="price">{price}₫</div>
            {oldPrice && <div className="old-price">{oldPrice}₫ (-17%)</div>}</div>    
           
        </div>
        
    );
}

function PromoBox() {
    return (
        <>

        </>
    );
}

export default ProductDetail;
