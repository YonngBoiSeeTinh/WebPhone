import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/SideBar'; // Import Sidebar
import './adminStyle.css'
const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar /> {/* Hiển thị Sidebar */}
      <main className="main-content">
        <Outlet /> {/* Đây là nơi mà các route con sẽ được render */}
      </main>
    </div>
  );
};

export default AdminLayout;
