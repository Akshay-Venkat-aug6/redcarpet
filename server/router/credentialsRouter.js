const express = require('express');
const { userRegisteration, userLogin, userlogout, adminLogin } = require('../controller/Credentials');
const tokenAuth = require('../middleware/tokenAuthentication');

const router = express.Router();

router.post('/register', userRegisteration);

router.post('/login', userLogin);

router.post('/logout', tokenAuth, userlogout);

router.post('/admin/login', adminLogin)
module.exports = router