const User = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

module.exports ={
    postSignUp : async (req,res) => {
        try{
         
            const {username,email,password}  = req.body;
            const userExist = await User.findOne({email:email});

            if(userExist){
                return res.json({err:'User already exists'});
            }
            else{
                const newUser = new User({
                    name:username.trim(),
                    email:email.trim(),
                    password
                })
                const savedUser = await newUser.save();

                const token = jwt.sign({user:savedUser._id},process.env.JWT_SECRET);
                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 
                }).json({ success: true });
            }
        }
        catch(err){
            console.log('error occuring during sign-up',err);
            return res.status(500).json({err : 'Internal server error'})
        }
    },
    postLogin : async (req,res) => {
        try{
            const { email,password } = req.body;
            const userExist = await User.findOne({ email: email })
            if(!userExist) return res.json({emailError:'user does not exist, Please sign up!'})
            const passwordMatch = await bcrypt.compare(password,userExist.password)
            if(!passwordMatch) return res.json({passwordError:'user password is incorrect'})
            else{
                const  token = jwt.sign({user : userExist._id},process.env.JWT_SECRET)
                res.cookie('token',token,{
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 
                }).json({ success: true });
            }
        }
        catch(err){
            console.error("Error during login:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    fetchUserData : async (req,res) => {
        try{
            const token = req.cookies.token || req.headers.authorization;
            if(!token){
                return res.status(401).json({err:"unauthorized : No token provided "})
            }
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            if (!decoded) {
                return res.status(401).json({ error: "Unauthorized: Invalid token" });
            }
            const user = await User.findById(decoded.user);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);
        }
        catch(err){
            console.error("Error while fetching user data:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    updateImage: async(req,res) => {
        try{
            const token = req.cookies.token;
            const verified = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(verified.user)
            console.log(user);
            if(user.Profile != 'def_profile.jpg'){
                const imagePath = path.join(__dirname, '../View/Public/', user.Profile); 
                if(fs.existsSync(imagePath)) fs.unlinkSync(imagePath)
            }
            const path_image = req.file.filename
            console.log(path);
            await User.updateOne({ _id: verified.user }, { $set: { Profile: path_image } });
            res.json({ success : true })

        }
        catch(err){
            console.log("Profile image upload error",error);
        }
    },
    isLogOut: async (req,res) => {
        try{
            res.clearCookie("token").send({ something: "here" });
        }
        catch(err){
            console.error("Error while logout the user :", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}