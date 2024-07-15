const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
    Profile : {
        type : String,
        default : 'def_profile.jpg'
    }
},
{
    timestamps: true
});

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash( this.password, salt)
})

const user = mongoose.model('User',userSchema);
module.exports = user;