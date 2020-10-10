const User = require('../model/User');
const LoanRequest = require('../model/LoanMessage');
const Loan = require('../model/Loan');
const EMIDetail = require('../model/EMI');
const { emiDetails } = require('../helpers/Emidetails');
const moment = require('moment');
const { InterestDetails } = require('../helpers/InteresetDetails');


const requestLoantoAgent = async(req, res) => {
  try {
    const { loanname, loanvalue,  duration } = req.body;
    const { agentid } = req.params
    let loanData = {
      agentid: agentid,
      userid: req.user._id,
      loanname: loanname,
      loanvalue: parseInt(loanvalue),
      duration: parseInt(duration),
    };
    const loanMessage = await LoanRequest.create(loanData);
    return res.json({message: "Loan message Sended SuccessFully", loanDetails: loanMessage, isMessage: true})
  } catch (error) {
    return res.json({message: error.message, isMessage: false})
  }
};

const getCustomerrequesttoAgent = async(req, res) => {
  try {
    const { _id } = req.user;
    const customerLoanRequestlist = await LoanRequest.find({userid: _id});
    const listOfLoanRequest = [];
    customerLoanRequestlist.map( async(list) => {
      const agentDetails = await User.findOne({_id: list.agentid})
      let lists = {
        agentName: agentDetails.username,
        mobileNo: agentDetails.phoneno,
        loanname: list.loanname,
        loanvalue: list.loanvalue,
        duration: list.duration
      }
      listOfLoanRequest.push(lists)
    });
    setTimeout(() => {
      return res.json({lists: listOfLoanRequest}).status(200)
    }, 500)
  } catch (error) {
    return res.json({message: error.message})
  }
}

const createLoan = async(req, res) => {
  try {
    const { _id } = req.agent;
    const { customerid } = req.params
    const checkID = await User.find({ _id : customerid });
    const { interestRate, principleValue, duration } = req.body;
    const loanDetails = await emiDetails(interestRate, principleValue, duration);
    let loanDetail = {
      agentid: _id,
      userid: customerid,
      ...loanDetails,
      status: "PENDING",
      applicationDate: moment().format()
    }
    const loadAdd = await Loan.create(loanDetail)
    const loanDetailss = await InterestDetails(loanDetails);
    let EMIDetails = {
      agentid: _id,
      userid: customerid,
      loanid: loadAdd._id,
      emiDetails: loanDetailss
    }
    await EMIDetail.create(EMIDetails)
    return res.json({
        EMIDetails: loanDetailss, 
        emiAMount: loanDetails.EMI, 
        interestAmount: loanDetails.InterestAmount, 
        principleAmount: loanDetails.principleAmount, 
        totalAmount: loanDetails.TotalAmountPayable,
        duration: loanDetails.duration,
        rate: loanDetails.rate
      })
  } catch (error) {
    return res.json({message: error.message})
  }
}

const updateLoan = async(req, res) => {
  try {
    const { _id } = req.agent;
    const { loanid } = req.params
    const checkLoan = await Loan.findOne({ _id : loanid });
    if(checkLoan.status === "PENDING"){
      const { interestRate, principleValue, duration } = req.body;
      const loanDetails = await emiDetails(interestRate, principleValue, duration);
      let loanDetail = {
        ...loanDetails,
        status: "PENDING",
        applicationDate: moment().format()
      }
      const loadAdd = await Loan.updateOne({_id: loanid},{ $set : { 
        EMI: loanDetails.EMI,
        InterestAmount: loanDetails.InterestAmount,
        principleAmount: loanDetails.principleAmount,
        TotalAmountPayable: loanDetails.TotalAmountPayable,
        duration: loanDetails.duration,
        rate: loanDetails.rate,
        applicationDate: loanDetail.applicationDate
       }})
      const loanDetailss = await InterestDetails(loanDetails);
      await EMIDetail.updateOne({loanid: loanid}, { $set : { emiDetails: loanDetailss } })
      return res.json({EMIDetails: loanDetailss})
    }
    return res.json({message: "Loan is already Approved or Rejected"})
  } catch (error) {
    console.log(error)
    return res.json({message: error.message})
  }
}

const getAgentLoan = async(req, res) => {
  try {
    const { _id } = req.agent;
    const loanDetail = await Loan.find({agentid: _id});
    let loanDatas = []
    loanDetail.map( async(loan) => {
      const user = await User.findOne({_id: loan.userid})
      let loanDetails = {
        // ...loan,
        userid: loan.userid,
        emi: loan.EMI,
        InterestAmount: loan.InterestAmount,
        principleAmount: loan.principleAmount,
        TotalAmountPayable: loan.TotalAmountPayable,
        duration: loan.duration,
        rate: loan.rate,
        status: loan.status,
        username: user.username
      }
      loanDatas.push(loanDetails)
    })
    setTimeout(() => {
      return res.json({loanDetail: loanDatas, isVerified: true})
    }, 500)
  } catch (error) {
    console.log('error')
  }
}

const getCustomerloan = async(req, res) => {
  try {
    const { _id } = req.user;
    const loanDetail = await Loan.find({userid: _id});
    let loanDatas = [];
    loanDetail.map( async(loan) => {
      const user = await User.findOne({_id: loan.agentid})
      let loanDetails = {
        agentid: loan.agentid,
        emi: loan.EMI,
        InterestAmount: loan.InterestAmount,
        principleAmount: loan.principleAmount,
        TotalAmountPayable: loan.TotalAmountPayable,
        duration: loan.duration,
        rate: loan.rate,
        status: loan.status,
        username: user.username
      }
      loanDatas.push(loanDetails)
    });

    setTimeout(() => {
      return res.json({loanDetail: loanDatas, isVerified: true})
    }, 500)
  } catch (error) {
    return res.json({message: error.message})
  }
}

const updateLoanStatus = async(req, res) => {
  try {
    const { loanid } = req.params;
    const Checkloan = await Loan.findOne({_id: loanid});
    const { status } = req.body
    if(!Checkloan){
      throw new Error('Loan ID is invalid')
    }
    console.log(status)
    const updateLoan = await Loan.updateOne({_id: loanid }, { status: status });
    console.log(updateLoan)
  } catch (error) {
    return res.json({isSuccess: false})
  }
}

module.exports = {
  requestLoantoAgent,
  createLoan,
  updateLoan,
  getAgentLoan,
  getCustomerloan,
  updateLoanStatus
}