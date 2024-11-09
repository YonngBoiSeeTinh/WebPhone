const UserService = require("../service/UserService");
const JwtService = require("../service/JwtService");


const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;

        // Regex để kiểm tra email
        const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email);

        // Kiểm tra các trường nhập liệu
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Tất cả các trường là bắt buộc'
            });
        } 

        // Kiểm tra email hợp lệ
        if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'vui lòng nhập đúng định dạng email'
            });
        } 

        // Kiểm tra mật khẩu
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Mật khẩu không khớp'
            });
        }

        // Gọi UserService để tạo user
        const response = await UserService.createUser(req.body);
        return res.status(200).json(response);
        
    } catch (e) {
        return res.status(500).json({
            err: e.message || 'Internal server error',
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra thông tin đăng nhập
        if (!email || !password) {
            return res.status(400).json({
                err: 'Email và mật khẩu không được để trống',
            });
        }

        // Gọi UserService 
        const response = await UserService.loginUser(req.body);

        // Nếu đăng nhập thành công, lấy refresh_token và lưu vào cookie
        const { refresh_token, ...newResponse } = response.data;

        // Lưu refresh_token vào cookie 
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,  
            secure: false, 
            sameSite: 'Strict',
        });

        return res.status(200).json(newResponse);

    } catch (e) {
        return res.status(500).json({
            err: e.message || 'Internal server error',
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ tham số đường dẫn
        const { name, email, password, confirmPassword, phone, isAdmin, address, avatar,role } = req.body;

        // Regex để kiểm tra email
        const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email);


        // Kiểm tra email hợp lệ
        if (email &&!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'vui lòng nhập đúng định dạng email'
            });
        } 

        // Kiểm tra mật khẩu nếu có thay đổi
        if (password && password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Mật khẩu không khớp'
            });
        }

        // Tạo đối tượng cập nhật
        const updatedData = { name, email, phone,password,confirmPassword, isAdmin ,address,avatar,role};

        // Gọi UserService để cập nhật thông tin người dùng
        const response = await UserService.updateUser(id, updatedData);
        return res.status(200).json(response);
        
    } catch (e) {
        return res.status(500).json({
            err: e.message || 'Internal server error',
        });
    }
};
// Hàm lấy danh sách người dùng
const getAllUsers = async (req, res) => {
    try {
        const {page,limit,sort,filter } = req.query
        const response = await UserService.getAllUsers(Number(limit) , Number(page)||0,sort,filter); // Gọi hàm getAllUsers từ UserService
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving users',
            err: error.message,
        });
    }
};
const getDetailUser = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params

    try {
        const response = await UserService.getDetailUser(id); // Gọi hàm getDetailUser từ UserService
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving the user detail',
            err: error.message
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const token  = req.cookies.refresh_token; 
        if(!token){
            return res.status(404).json({
                status: 'ERROR',
                message: 'An error occurred while retrieving the user detail',
                err: error.message
            });
        }
        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving the user detail',
            err: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
   
    try {
        const response = await Jw.deleteUser(id); // Gọi hàm deleteUser từ UserService
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            status: 'ERROR',
            message: 'An error occurred while deleting the user',
            err: error.message
        });
    }
};
const logout = async (req, res) => {
    try {
        res.clearCookie('refresh_token'); // Xóa cookie
        return res.status(200).json({
            status: 'OK',
            message: "Log out success"
        });
    } catch (e) {
        return res.status(500).json({ message: "Error logging out" });
    }
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    getAllUsers,
    deleteUser,
    getDetailUser,
    refreshToken,
    logout
};
