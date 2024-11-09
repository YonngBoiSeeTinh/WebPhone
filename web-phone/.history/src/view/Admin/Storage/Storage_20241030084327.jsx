import React,{useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import './Storage.scss'
const Storage = () => {
  
    return (

    <div className="storage_container">
        <h3>Tồn kho</h3>
      <div className="storage_title">
        <div>#</div>
      </div>
      <Pagination />
    </div> 
     );
}

export default Storage;
