import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { logout } from "../../../Service/UserService";
import { useDispatch } from 'react-redux';
import { resetUser } from "../../../Redux/sliders/userSlide";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import InsertChartOutlinedSharpIcon from "@mui/icons-material/InsertChartOutlinedSharp";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import './sideBar.css'
const Sidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    await logout();
    dispatch(resetUser());
    navigate('/');
};
  return (
    <aside className="sidebar">
      <ul className="nav">
        <li className="nav-title">MENU</li>
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link"><i className="fa fa-home"></i> Trang Chủ</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/products" className="nav-link"><i className="fa fa-th-large"></i> Sản Phẩm</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/customers" className="nav-link"><i className="fa fa-address-book-o"></i> Khách Hàng</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/employee" className="nav-link"><i className="fa fa-address-book-o"></i> Nhân viên</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/orders" className="nav-link"><i className="fa fa-file-text-o"></i> Đơn Hàng</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/orders" className="nav-link"><i className="fa fa-file-text-o"></i> Tồn kho</Link>
        </li>
       
        <li className="nav-item">
          <hr />
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={handleLogOut}>
            <i className="fa fa-arrow-left"></i> Đăng xuất (về Trang chủ)
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
