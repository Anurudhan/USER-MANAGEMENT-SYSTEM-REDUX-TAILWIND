const express = require('express');
const router = express.Router();

const userController = require('../Controller/userController') ;
const user = require('../Model/userModel')
const upload = require('../View/Multer/Upload')

router.post('/signup',userController.postSignUp)
router.post('/login',userController.postLogin)
router.get('/fetch-user-data',userController.fetchUserData)
router.post('/change-password',userController.updatePassword)
router.put('/update-profile',userController.updateProfile)
router.post('/upload-profile-photo',upload.single('profile'),userController.updateImage)
router.get('/logout',userController.isLogOut)

module.exports = router