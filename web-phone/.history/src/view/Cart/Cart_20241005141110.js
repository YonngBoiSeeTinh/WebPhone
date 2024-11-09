import React, { useState, useEffect } from "react";
import './Cart.css';
import CartItem from "./CartItem";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Loading from "../Loading/Loading";

const Cart = () => {
  const user = useSelector((state) => state.user);
  const [selectedCart, setSelectedCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = (cart) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };
  
  useEffect(() => {
    calculateTotalPrice(selectedCart);
  }, [selectedCart]);

  
  const fetchApi = async () => {
    try {
      const userID = await user.id;
      const res = await axios.get(`http://localhost:3001/api/cart/getByUserId/${userID}`);
      return res.data.data;  
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const query = useQuery({ queryKey: ['products'], queryFn: fetchApi });
  const listCart = query.data || []; 

  const handleSelectedCart = (cartItem, isChecked) => {
    if (isChecked) {    
      setSelectedCart((prevSelected) => [...prevSelected, cartItem]);
      
    } else {    
      setSelectedCart((prevSelected) =>
        prevSelected.filter((item) => item._id !== cartItem._id)  
      );    
    }
  };

  const handleOrder =()=>{
    if(selectedCart.length === 0 )
    {alert('Vui lòng chọn sản phẩm để đặt hàng')}
    console.log('selectedCart', selectedCart);
  }
    
  

  // Kiểm tra trạng thái của truy vấn
  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError) {
    return <div>Error fetching data: {query.error.message}</div>; // Hiển thị lỗi nếu có
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <a href="#" className="back-link">Về trang chủ </a>
        <a href="#" className="cart-link">Giỏ hàng của bạn</a>
      </div>
      {listCart.map((cart, index) => (
        <CartItem cart={cart} key={index} handleSelectedCart={handleSelectedCart}
               selectedCart={selectedCart} setSelectedCart={setSelectedCart}/>
      ))}
  
      <div className="cart-summary">
        <p>Tạm tính ({selectedCart.length} sản phẩm):</p>
        <p>{totalPrice}đ</p>
      </div>

      <div className="cart-form">
        <div className="customer-info">
          <input type="text" placeholder="Họ và Tên" />
          <input type="text" placeholder="Số điện thoại" />
          <input type="text" placeholder="Số nhà, tên đường" />
        </div>

        <div className="delivery-method">
          <h4>Chọn hình thức nhận hàng</h4>
          <label>
            <input type="radio" name="delivery" value="Giao tận nơi" defaultChecked /> Giao tận nơi
          </label>
          <label>
            <input type="radio" name="delivery" value="Nhận tại cửa hàng" /> Nhận tại cửa hàng
          </label>
        </div>
        <div className="total-section">
          <div className="total-price">
            <p>Tổng tiền:</p>
            <p>{totalPrice}đ</p>
          </div>
        </div>

        <div className="cart-agreement">
          <label>
            <input type="checkbox" /> Tôi đồng ý với <a href="#">Chính sách xử lý dữ liệu cá nhân</a> của TopZone
          </label>
        </div>

        <button className="order-button" onClick={handleOrder}>Đặt hàng</button>
      </div>
    </div>
  );
};

export default Cart;