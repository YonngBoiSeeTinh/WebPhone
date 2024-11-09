const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleWare = (req, res, next) => {

   
    const token = req.headers.token.split(" ")[1];
    if (!token) {
        return res.status(401).json({
          message: "Token không được cung cấp.",
          status: "Error"
        });
      }
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user){
       if(err){
        return res.status(404).json({
            message:"The auththentication 1",
            status:'Error'
        })
       }
       const {payload} =user;
       console.log(user.isAdmin)
       if(payload?.isAdmin){
        next()
       }else{
        return res.status(404).json({
            message:"The auththentication 2",
            status:'Error'
        })
       }
   })
};
const authUserMiddleWare = (req, res, next) => {

   
    const token = req.headers.token.split(" ")[1];
    const userId = req.params.id
    console.log(userId);
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user){
       if(err){
        return res.status(404).json({
            message:"The auththentication",
            status:'Error'
        })
       }
      
       if(user?.isAdmin || user?.id===userId){
        next()
       }else{
        return res.status(404).json({
            message:"The auththentication",
            status:'Error'
        })
       }
   })
};

// Export theo kiểu CommonJS
module.exports = {
    authMiddleWare,
    authUserMiddleWare
};
