const User = require('../model/User');
const LoanMessage = require('../model/LoanMessage');
const Loan = require('../model/Loan');

const customerHome = async(req, res) => {
  try {
    const agentlist = []
    const { username, email, role } = req.user;
    // console.log(req.user)
    const agentRole = await User.find({role: "agent"});
    agentRole.map( list => {
      let lists = {
        agentId: list._id,
        name: list.username,
        email: list.email,
        mobileno: list.phoneno
      }
      agentlist.push(lists)
    })
    let userdetails = {
      name: username,
      email: email
    }
    return res.json({message: "Page Loaded Successfully!!!", user: userdetails ,agent: agentlist, isAuthenticaed: true})
  } catch (error) {
    return res.json({message: error.message, isAuthenticaed: false})
  }
};

const agentHome = async(req, res) => {
  try {
    const userlist = []
    const { username, email, role, _id } = req.agent;
    const userRole = await User.find({role: "customer"});
    userRole.map( async(list) => {
      const pending = await Loan.find({ userid: list._id, status: "PENDING", agentid: _id });
      const rejected = await Loan.find({ userid: list._id, status: "REJECTED",  agentid: _id});
      const approved = await Loan.find({ userid: list._id, status: "APPROVED", agentid: _id});
      let lists = {
        userid: list._id,
        name: list.username,
        email: list.email,
        mobileno: list.phoneno,
        pending: pending.length,
        rejected: rejected.length,
        approved: approved.length,
        totalLoans: pending.length + rejected.length + approved.length
      };
      // console.log(lists)
      userlist.push(lists)
    });
    let agentDetails = {
      name: username,
      email: email
    }
    setTimeout( () => {
      return res.json({message: "Page Loaded Successfully!!!", agent: agentDetails ,user: userlist, isAuthenticaed: true})
    }, 1000)
    
  } catch (error) {
    return res.json({message: error.message, isAuthenticaed: false})
  }
};

const agentNotification = async(req, res) => {
  try {
    const { _id } = req.agent
    const loanMessage = await LoanMessage.find({agentid: _id});
    const listsofMessage = [];
    loanMessage.map( async(list) => {
      const customer = await User.findOne({_id: list.userid});
      let lists = {
        loanName: list.loanname,
        loanvalue: list.loanvalue,
        userid: customer._id,
        username: customer.username,
        email: customer.email,
        phoneno: customer.phoneno,
        userage: list.userage,
        durationMonths: list.emiMonths
      }
      listsofMessage.push(lists);
    })
    setTimeout(() => {
      return res.json({notifications: listsofMessage, isNotified: true}).status(200)
    }, 500)
  } catch (error) {
    return res.json({message: error.message, isNotified: false})
  }
}

const adminHome = async(req, res) => {
  try {
    const { _id } = req.admin;
    const loanlist = await Loan.find();
    var loans = [];
    loanlist.map( async(loan) => {
      const user = await User.findOne({_id: loan.userid})
      const agent = await User.findOne({_id: loan.agentid});
      let loanDetails = {
        agentid: loan.agentid,
        agentname: agent.username,
        emi: loan.EMI,
        InterestAmount: loan.InterestAmount,
        principleAmount: loan.principleAmount,
        TotalAmountPayable: loan.TotalAmountPayable,
        duration: loan.duration,
        rate: loan.rate,
        status: loan.status,
        userid: loan.userid,
        username: user.username,
        loanid: loan._id
      };
      loans.push(loanDetails)
    });
    setTimeout( () => {
      return res.json({loan: loans, isAuthenticaed: true})
    }, 1000)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  customerHome,
  agentHome,
  agentNotification,
  adminHome
}