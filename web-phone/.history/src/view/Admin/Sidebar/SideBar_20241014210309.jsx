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
import './sideBar.scss'
const Sidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    await logout();
    dispatch(resetUser());
    navigate('/');
};
  return (
    <aside className="">
      <div className="sidebar">
      <div className="top">
        <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">DesignMediaX</span>
        </Link>
      </div>
      <hr />
      <div className="bottom">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>

          <p className="title">LISTS</p>
          <Link to="/admin/customers" style={{ textDecoration: "none" }}>
            <li>
              <Person3OutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/admin/products" style={{ textDecoration: "none" }}>
            <li>
              <LocalGroceryStoreOutlinedIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/admin/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardOutlinedIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <p className="title">CHARTS</p>
          <li>
            <InsertChartOutlinedSharpIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsActiveOutlinedIcon className="icon" />
            <span>Notifications</span>
          </li>

          <p className="title">SERVICE</p>
          <li>
            <DnsOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <SettingsOutlinedIcon className="icon" />
            <span>Settings</span>
          </li>

          <p className="title">USER INTERFACE</p>
          <li>
            <ManageAccountsOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <CalendarMonthOutlinedIcon className="icon" />
            <span>Calendar</span>
          </li>
          <li>
            <DiamondOutlinedIcon className="icon" />
            <span>Helper</span>
          </li>

          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={handleLogOut}>
              <ExitToAppOutlinedIcon className="icon" />
              <i className="fa fa-arrow-left"></i> Đăng xuất (về Trang chủ)
            </Link>
        </li>
        </ul>
      </div>
    </div>
    </aside>
  );
};

export default Sidebar;


