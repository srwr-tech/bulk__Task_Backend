// userModel.js

import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    
});
const User = mongoose.model('RegistrationUser_Task', userSchema);


// module.exports = User;
export default User;