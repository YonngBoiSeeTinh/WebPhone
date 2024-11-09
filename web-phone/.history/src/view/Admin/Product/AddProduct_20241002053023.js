import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
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
            name: 'moi',
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
        colors: [{
            color: '',
            image: '',
            countInstock: ''
        }]
    });

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
            const response = await axios.post('http://localhost:3001/api/product/create', product);
            console.log(response.data);
           
            setProduct({}); // Reset form after submission
        } catch (error) {
            console.error("There was an error adding the product!", error);
        }
    };

    return (
        <form className=' from-container' onSubmit={handleSubmit}>
            <div className='form-add'>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="company" placeholder="Company" onChange={handleChange} required />
                <input type="file" id="fileInput" accept="image/*" style="display:none;" />
                    <button id="uploadBtn">Chọn Ảnh</button>
                    <p id="imageLink"></p>
                <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
                <input type="number" name="rating" placeholder="Rating" onChange={handleChange} required />

                <button type="submit">Add Product</button>
               { console.log(product)}
            </div>
         
        </form>
    );
};

export default AddProduct;