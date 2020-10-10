const express = require('express');
const { customerHome ,  agentNotification, agentHome, adminHome} = require('../controller/Home');
const tokenAuth = require('../middleware/tokenAuthentication');
const adminAuth = require('../middleware/adminAuth');

const { customerRole, agentRole } = require('../middleware/roleAuthentication');

const router = express.Router();

router.get('/customer/home', tokenAuth, customerRole, customerHome)

router.get('/agent/home', tokenAuth, agentRole, agentHome)

router.get('/admin/home', adminAuth, adminHome)

router.get('/agent/notifications', tokenAuth, agentRole, agentNotification)

module.exports = router;