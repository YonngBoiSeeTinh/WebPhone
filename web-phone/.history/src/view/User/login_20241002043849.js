import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; // Import axios để gọi API
import './log.css';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../Redux/sliders/userSlide'; // Import action từ userSlice
import { GetDetailUser } from "../../Service/UserService";


const Login = ({ handleOpenSignUp,handleCloseLogin,setIsSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    

    // Hàm xử lý khi người dùng nhấn "Login"
    const handleLogin = async (e) => {
        e.preventDefault();

        const user = { email, password };
        
        try {
            // Gọi API loginUser từ backend
            const response = await axios.post('http://localhost:3001/api/User/sign-in', user); // URL API của bạn
          
            //Kiểm tra phản hồi từ backend
            if (response.data.status === 'FAILED') {
                setError(response.data.message); // Hiển thị lỗi nếu đăng nhập thất bại
            } else if (response.data.status === 'OK') {
                console.log('Đăng nhập thành công:');
                const access_token = response.data.data.accessToken;   
             
                localStorage.setItem('accessToken', JSON.stringify(access_token));
                if(access_token){
                    const decode = jwtDecode(access_token)
                  
                    if(decode?.id){
                        try {
                            await handelGetDetailUser(decode.id, access_token);
                        } catch (error) {
                            console.error('Lỗi khi tải chi tiết người dùng:', error);
                        }
                    }
                }
                
                setIsSignIn(true);
                handleCloseLogin();            
            }
        } catch (error) {
            setError('Đã xảy ra lỗi khi đăng nhập');
            console.error(error);
        }
    };

    const dispatch = useDispatch();
    const handelGetDetailUser = async (id, access_token) =>{
        const res = await GetDetailUser(id, access_token)
        console.log('res', res);
        dispatch(updateUser({ ...res?.data, access_token: access_token })); // Gửi action để cập nhật user
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group-log">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group-log">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                {error && <p className="error-message">{error}</p>} {/* Hiển thị lỗi nếu có */}
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? 
                <Link to="#" onClick={handleOpenSignUp}>
                    Sign up here
                </Link>
            </p>
        </div>
    );
};

export default Login;
