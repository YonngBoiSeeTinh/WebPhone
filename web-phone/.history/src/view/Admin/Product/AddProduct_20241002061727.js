import React, { useState, useEffect } from "react";
import './ProductDetail.css'; // Đảm bảo bạn đã tạo và liên kết file CSS
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const [imageLink, setImageLink] = useState('');
    const [product, setProduct] = useState({
        name: '',
        company: '',
        image: '',
        price: '',
        rating: '',
        rateCount: '',
        countInstock: '',
        description: '',
        promo: {
            name: '',
            value: '',
            oldPrice: ''
        },
        detail: {
            screen: '',
            os: '',
            camera: '',
            cameraFront: '',
            cpu: '',
            ram: '',
            rom: '',
            microUSB: '',
            battery: ''
        },
        colors: []
    });
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setImageLink(imageUrl);
                setProduct((prev) => ({
                    ...prev,
                    image: imageUrl // Cập nhật đường dẫn hình ảnh vào sản phẩm
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           // const response = await axios.post('http://localhost:3001/api/product/create', product);
            console.log(product);
            setProduct({}); // Reset form after submission
            setImageLink(''); // Reset image link
        } catch (error) {
            console.error("There was an error adding the product!", error);
        }
    };

    return (
        <div className="product-container">
            <ProductGallery imageLink={imageLink} handleFileChange={handleFileChange} />
            <ProductUpdateForm product={product} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    );
}

function ProductGallery({ imageLink, handleFileChange }) {
    return (
        <section>
            <div className="product-detail">
                <div className="product-image">
                    <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    <div className="product-gallery" onClick={() => document.getElementById('fileInput').click()}>
                        <img src={imageLink ? imageLink : ""} alt="Sản phẩm" className="main-image" />
                    </div>
                    <div className="thumbnail-gallery">
                        <img src={imageLink ? imageLink : ""} className="thumbnail" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProductUpdateForm({ product, handleChange, handleSubmit }) {
    const details = [
        { key: "Màn hình", name: "screen", value: product.detail.screen || "" },
        { key: "Hệ điều hành", name: "os", value: product.detail.os || "" },
        { key: "Camera sau", name: "camera", value: product.detail.camera || "" },
        { key: "Camera trước", name: "cameraFront", value: product.detail.cameraFront || "" },
        { key: "CPU", name: "cpu", value: product.detail.cpu || "" },
        { key: "RAM", name: "ram", value: product.detail.ram || "" },
        { key: "ROM", name: "rom", value: product.detail.rom || "" },
        { key: "MicroSD", name: "microUSB", value: product.detail.microUSB || "" },
        { key: "Pin", name: "battery", value: product.detail.battery || "" },
    ];
    
    const promoOptions = ['moi', 'giamgia', 'tragop'];

    return (
        <form className="product-update-form" onSubmit={handleSubmit}>
            <div className="product-update-form_item">
                <div>Tên sản phẩm</div>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Công ty</div>
                <input
                    type="text"
                    name="company"
                    value={product.company}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Giá</div>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>Màu</div>
            <ProductOptions colors={product.colors} />
            <div className="info_product promo">
                <h2>Khuyến mãi</h2>
                <select
                    name="promoName"
                    onChange={handleChange}
                >
                    {promoOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="promoValue"
                    onChange={handleChange}
                    placeholder="Giá trị khuyến mãi"
                />
                <input
                    type="text"
                    name="promoOldPrice"
                    onChange={handleChange}
                    placeholder="Giá gốc"
                />
            </div>
            <div className="info_product">
                <h2>Thông số kỹ thuật</h2>
                <ul className="info">
                    {details.map((item, index) => (
                        <li key={index}>
                            <p>{item.key}:</p>
                            <input
                                type="text"
                                name={item.name}
                                value={item.value}
                                onChange={handleChange}
                              
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <button type="submit">Thêm sản phẩm</button>
        </form>
    );
}

function ProductOptions({ colors }) {
   
    const [isDialogAddOpen, setDialogAddOpen] = useState(false);
    const [newColor, setNewColor] = useState('');
    const [newColorCode, setNewColorCode] = useState('');
    const [newColorCount, setNewColorCount] = useState(0);

    
    const handleAddColorClick = () => {
        setDialogAddOpen(true); // Mở dialog thêm màu
    };

    const handleDialogAddClose = () => {
        setDialogAddOpen(false); // Đóng dialog thêm màu
    };

    return (
        <div className="options">  
            <div className="color-options">
                {colors.map((colorItem, index) => (
                    <div 
                        key={index} 
                        className={`color ${colorItem.color.toLowerCase()}`} 
                        style={{ backgroundColor: colorItem.code }} 
                        title={colorItem.color}
                    >
                    </div>
                ))}
                <div className="btn-add_color" onClick={handleAddColorClick}>Thêm</div>
            </div>

        
            {/* Dialog thêm màu mới */}
            {isDialogAddOpen && (
                <div className="dialog-color">
                    <div className="dialog_color-content" style={{ display: 'block' }}>
                        <p>Thêm màu</p>
                        <input 
                            type="text" 
                            placeholder="Nhập tên màu" 
                            value={newColor} 
                            onChange={(e) => setNewColor(e.target.value)} 
                        /><br />
                        <input 
                            type="text" 
                            placeholder="Nhập mã màu" 
                            value={newColorCode} 
                            onChange={(e) => setNewColorCode(e.target.value)} 
                        /><br />
                        <input 
                            type="number" 
                            placeholder="Nhập số lượng" 
                            value={newColorCount} 
                            onChange={(e) => setNewColorCount(e.target.value)} 
                        />
                        <div style={{ display: 'flex' }}> 
                            <div className="btn btnOK">OK</div>
                            <div className="btn btnCancle" onClick={handleDialogAddClose}>Đóng</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
