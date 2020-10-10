const Admin = require('../model/Admin');

module.exports = async(req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const checkUser = await Admin.findOne({token: token});
    if(!checkUser){
      throw new Error('Token is Invalid!!!')
    }
    req.admin = checkUser;
    next();
  } catch (error) {
    return res.json({message: error.message, isTokenVerified: false})
  }
}