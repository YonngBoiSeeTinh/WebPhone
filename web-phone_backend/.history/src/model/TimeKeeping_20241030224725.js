const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {   
        userId: { type: String, required: true },
        name: { type: String, required: true },
        status: { type: String, required: true, unique: true },
        date:{type: timestamps, required: true, unique: true}
    },{
        timestamps: true
    }
);

const User = mongoose.model("User",userSchema);
module.exports = User;