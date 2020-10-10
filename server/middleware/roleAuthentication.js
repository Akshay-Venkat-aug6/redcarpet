const User = require('../model/User');

const customerRole = async(req, res, next) => {
  try {
    const { _id } = req.user;
    // console.log(_id)
    const findRole = await User.findOne({_id: _id});
    if(findRole.role != 'customer'){
      throw new Error("Your are not a authorized person to access this page")
    }
    req.user = findRole;
    // console.log(req.user)
    next();
  } catch (error) {
    return res.json({message: error.message});
  }
}

const agentRole = async(req, res, next) => {
  try {
    const { _id } = req.user;
    const findRole = await User.findOne({_id: _id, role: 'agent'});
    if(!findRole){
      throw new Error("Your are not a authorized person to access this page")
    }
    req.agent = findRole;
    next();
  } catch (error) {
    return res.json({message:error.message});
  }
}

module.exports = {
  customerRole,
  agentRole
}