import React, { useState }  from "react";
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Login from '../User/login';
import SignUp from '../User/register'; // Thêm compo
import { Link } from "react-router-dom";

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false); // State cho phần đăng ký
    const [isSignIn, setIsSignIn] = useState(false);
    const [id, setId] = useState("");
    const [access_token, setAccess_token] = useState('');
    const handleOpenLogin = () => {
        setShowLogin(true);
        setShowSignUp(false); // Đảm bảo tắt phần đăng ký khi mở đăng nhập
    };
  
    const handleOpenSignUp = () => {
        setShowSignUp(true);
        setShowLogin(false); // Đảm bảo tắt phần đăng nhập khi mở đăng ký
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
        setShowSignUp(false); // Đóng cả hai
    };

   

    return (
        <div className="header-container">
            <div className="header group">
                <div className="logo">
                    <Link to="/">
                        <img src="http://localhost:3000/img/logo.jpg" alt="Trang chủ Smartphone Store" title="Trang chủ Smartphone Store" /> 
                    </Link>
                </div>
                <div className="content">
                    <div className="search-header" style={{ position: 'relative', left: '162px', top: '1px' }}>
                        <form className="input-search" method="get" action="index.html">
                            <div className="autocomplete">
                                <input id="search-box" name="search" autoComplete="off" type="text" placeholder="Nhập từ khóa tìm kiếm..." />
                                <button type="submit">
                                    <i className="fa fa-search"></i>
                                    Tìm kiếm
                                </button>
                            </div>
                        </form> 
                        <div className="tags">
                            <strong>Từ khóa: </strong>
                        </div>
                    </div> 

                    <div className="tools-member">
                        <div className="member">
                            <Link to="#" onClick={handleOpenLogin}  style={{ display: isSignIn ? 'none' : 'flex' }}>
                                <FontAwesomeIcon icon={faUser} className="fa-user" />
                                <p>Tài khoản</p>              
                            </Link>
                            <Link to={`/userPage/${id}`}  style={{ display: isSignIn ? 'flex' : 'none' }}>
                                <FontAwesomeIcon icon={faUser} className="fa-user" />
                                <p>Tài khoản</p>              
                            </Link>
                        </div> 

                        <div className="cart">
                            <Link to="/cart">
                                <FontAwesomeIcon icon={faCartShopping} />
                                <p>Giỏ hàng</p>        
                            </Link>
                            <span className="cart-number"></span>
                        </div> 

                        <div className="check-order" style={{display:"none"}}> 
                            <Link to="/don-hang">    
                                <span>Đơn hàng</span>
                            </Link>
                        </div> 
                    </div>
                </div> 
            </div>

            {showLogin && (
                <div className="overlay">
                    <div className="login-modal">
                        <button className="close-button" onClick={handleCloseLogin}>
                            &times;
                        </button>
                        <Login handleOpenSignUp={handleOpenSignUp} handleCloseLogin={handleCloseLogin} setIsSignIn={setIsSignIn} setAccess_token ={setAccess_token} />
                    </div>
                </div>
            )}

            {showSignUp && (
                <div className="overlay">
                    <div className="signup-modal">
                        <button className="close-button" onClick={handleCloseLogin}>
                            &times;
                        </button>
                        <SignUp handleOpenLogin={handleOpenLogin} /> {/* Truyền hàm mở đăng nhap */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
