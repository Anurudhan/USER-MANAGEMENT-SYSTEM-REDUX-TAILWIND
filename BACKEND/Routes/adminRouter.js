const express = require('express');
const adminController = require('../Controller/adminController');
const router = express.Router();


router.post('/login',adminController.postLogin)
router.get('/fetch-admin-data',adminController.fetchAdminData)
router.get('/fetch-user-data',adminController.fetchUserData)
router.delete('/delete-user',adminController.deleteUser)
router.put('/update-user',adminController.updateUser)
router.post('/add-user',adminController.adduser)
router.get('/logout',adminController.isLogout)

module.exports = router