const jwt = require('jsonwebtoken');
const User = require('../Model/userModel')
require('dotenv').config();

const adminData = {
    _id : process.env['ADMIN_ID'],
    name : process.env.ADMIN_NAME,
    email : process.env.ADMIN_EMAIL,
    password : process.env.ADMIN_PASSWORD
}

console.log("Admin ID:", process.env.ADMIN_ID);
console.log("Admin Name:", process.env.ADMIN_NAME);
console.log("Admin Email:", process.env.ADMIN_EMAIL);
console.log("Admin Password:", process.env.ADMIN_PASSWORD);

module.exports = {
    postLogin : async (req, res) => {
        try {
            const { email, password } = req.body;
            if (adminData.email !== email) return res.json({ emailError: 'This email identity admin does not exist!' });
            if (adminData.password !== password) return res.json({ passwordError: 'Admin password is incorrect' });
            else {
                const token = jwt.sign({ admin: adminData._id }, process.env.JWT_SECRET);
                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24
                }).json({ success: true });
            }
        } catch (err) {
            console.log('Error occurring when admin is logging in', err);
        }
    },
    fetchAdminData : async (req, res) => {
        try {
            const token = req.cookies.token || req.headers.authorization;
            if (!token) {
                return res.status(401).json({ err: "Unauthorized: No token provided" });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                return res.status(401).json({ error: "Unauthorized: Invalid token" });
            }
            res.json(adminData);
        } catch (err) {
            console.log("Error occurring while fetching admin data", err);
        }
    },
    fetchUserData : async (req,res) => {
        try{
            const user = await User.find()
            res.json({ data: user });
        }
        catch(err){
            console.log("error occurring when user data fetching in admin",err)
        }
    },
    adduser: async(req,res) => {
        try{
            const {name,email,password} = req.body;
            console.log("hlo Iam here admin-adduser");
            const userExist = await User.findOne({email});
            if(userExist){
                return res.json({ emailError: 'This email identity all ready exist!' });
            }
            const newUser = new User({
                name:name.trim(),email:email.trim(),password
            })
            const addUser = await newUser.save()
            res.json({success:true})
        }
        catch(err){
            console.log('Admin user adding tym error',err);
        }
    },
    updateUser: async(req,res)=>{
        try{
            const {id,name,email} = req.body;
            await User.updateOne({_id:id},{email:email.trim(),name:name.trim()})
            res.json({success:true})
        }
        catch(err){
            console.log(err)
        }
    },
    deleteUser : async(req,res)=>{
        try{
            const {id} = req.body;
            console.log(id);
            const DeleteUser = await User.deleteOne({_id:id})
            res.json({success :true})
        }
        catch(err){
            console.log('error occuring when delete in data',err);
        }
    },
    isLogout : async(req,res) => {
        try{
            res.clearCookie("token").send({ something: "here" });
        }
        catch(err){
            console.log('error occuring when admin logout');
        }
    }
}
