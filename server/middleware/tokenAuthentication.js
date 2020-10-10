const User = require('../model/User');

module.exports = async(req, res, next) => {
  try {
    const token = req.headers['authorization'];
    // console.log(token)
    const checkUser = await User.findOne({token: token});
    // console.log(checkUser)
    if(!checkUser){
      throw new Error('Token is Invalid!!!')
    }
    req.user = checkUser;
    next();
  } catch (error) {
    return res.json({message: error.message, isTokenVerified: false})
  }
}