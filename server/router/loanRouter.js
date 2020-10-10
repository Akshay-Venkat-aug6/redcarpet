const express = require('express');
const { requestLoantoAgent, updateLoan, createLoan, getAgentLoan, getCustomerloan, updateLoanStatus } = require('../controller/Loan');
const tokenAuth = require('../middleware/tokenAuthentication');
const { customerRole, agentRole } = require('../middleware/roleAuthentication');
const { checkAgent } = require('../middleware/agentCheck');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Customer Loan Side
router.post('/request/loan/:agentid', tokenAuth, customerRole, checkAgent , requestLoantoAgent);
router.get('/customer/view/loan', tokenAuth, customerRole, getCustomerloan);

// Agent Loan Part
router.post('/create/loan/:customerid', tokenAuth, agentRole, createLoan);
router.post('/update/loan/:loanid', tokenAuth, agentRole, updateLoan);
router.get('/agent/view/loan', tokenAuth, agentRole, getAgentLoan);

// Admin
router.post('/update/loan/status/:loanid', adminAuth, updateLoanStatus);

module.exports = router;