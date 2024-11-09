import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Customer.scss'

const CustomerManagement = ({customer}) => {
  const navigate = useNavigate();
  const handelClickCustomer=()=>{
    
  }
  return (          
        <div className="customer_title customer_item">
            <div className="num">1</div>
            <div className="name"> <img src={customer.avatar}/> {customer.name} </div>
            <div className="email">{customer.email}</div>  
            <div className="phone">{customer.phone}</div>
            <div className="address">{customer.address}</div>
            <div className="action">Xem Chi tiết <button>X</button></div>
        </div> 
  );
};



const handleDelete = (id) => {
  console.log('Xóa khách hàng có ID:', id);
};

export default CustomerManagement;