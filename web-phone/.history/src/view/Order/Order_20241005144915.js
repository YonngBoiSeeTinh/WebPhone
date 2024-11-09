import React from "react";
import './Order.css';


function Order() {
    
    return (
        <div className="order-item">
        <div className="item-image">
          <img src={cart.image} alt={cart.name} />
        </div>
        <div className="item-details">
          <h3>{cart.name}</h3>
          <p>Màu: {cart.color}</p>
          <p className="item-price"> {totalItemPrice} đ</p>
        </div>
        <div className="quantity-control">  
          Số lượng {amount}
        </div>
       
        <button className="deleteItem" onClick={handleDelete}>Hủy</button>
      </div>
    );
}

export default Order;