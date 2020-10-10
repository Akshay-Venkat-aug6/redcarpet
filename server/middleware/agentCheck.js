const User = require('../model/User');

const checkAgent = async(req, res, next) => {
  try {
    const { agentid } = req.params;
    const agentCheck = await User.findOne({_id: agentid});
    if(!agentCheck){
      throw new Error('Agent is is Invalid')
    }
    req.agent = agentCheck;
    next();
  } catch (error) {
    return res.json({messgae: error.messgae})
  }
};

module.exports = {
  checkAgent
}