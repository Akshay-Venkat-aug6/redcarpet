const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const Admin = require('../model/Admin');

const userRegisteration = async (req, res) => {
  try {
    const { username, email, phoneno, password, role } = req.body;
    const findUserEmail = await User.findOne({email: email, role: role});
    if(findUserEmail){
      throw new Error('Email is already Registered!!!!!');
    }  
    const hashedPassword = await bcrypt.hash(password, 10);
    let registerData = {
      username: username,
      email: email,
      phoneno: parseInt(phoneno),
      password: hashedPassword,
      role: role
    }
    const registerUser = await User.create(registerData)
    return jwt.sign({id: registerUser._id}, process.env.PRIVATE_KEY, async (err, token)=>{
      await User.updateOne({_id: registerUser._id}, { $set: { token: token }})
      res.json({message: "Registeration Completed SuccssFully!!!",userid: registerUser._id ,token: token, role: role ,isRegistered: true}).status(200) 
    });
  } catch (error) {
    console.log(error.message)
    return res.json({message: error.message, isRegistered: false}).status(401)
  }
};

const userLogin = async (req, res) => {
  try {
    const { useremail, password, role } = req.body;
    if(!useremail || !password || !role){
      throw new Error('All details should be filled to Login')
    }
    const checkEmail = await User.findOne({email: useremail, role: role});
    if(!checkEmail){
      throw new Error('Email is not yet registered!!')
    }
    const confirmPassword = await bcrypt.compare(password, checkEmail.password);
    if(!confirmPassword){
      throw new Error('Password is Invalid')
    }
    return jwt.sign({id: checkEmail._id}, process.env.PRIVATE_KEY, async (err, token)=>{
      await User.updateOne({_id: checkEmail._id}, { $set: { token: token }})
      res.json({message: "Login Completed SuccssFully!!!", userid: checkEmail._id ,token: token, isLogined: true, role: role}).status(200) 
    });
  } catch (error) {
    return res.json({ message: error.message, isLogined: false}).status(401)
  }
}

const userlogout = async (req, res) => {
  try {
    const { _id, email, token } = req.user;
    await User.updateOne({_id: _id, email: email}, { $set: {token: null} })
    return res.json({ message: 'Logout SuccessfUlly!!', isLoggedOut: true })
  } catch (error) {
    return res.json({message: error.message, isLoggedOut: false})
  }
}

const adminLogin = async(req, res) => {
  try {
    const { username, password } = req.body;
    
    if(!username || !password){
      throw new Error('All details should be filled to Login')
    }
    const checkEmail = await Admin.findOne({username: username});
    if(!checkEmail){
      throw new Error('Email is not yet registered!!')
    }
    const confirmPassword = await bcrypt.compare(password, checkEmail.password);
    if(!confirmPassword){
      throw new Error('Password is Invalid')
    }
    return jwt.sign({id: checkEmail._id}, process.env.PRIVATE_KEY, async (err, token)=>{
      await Admin.updateOne({_id: checkEmail._id}, { $set: { token: token }})
      res.json({message: "Login Completed SuccssFully!!!", token: token, isLogined: true}).status(200) 
    });
  } catch (error) {
    return res.json({ message: error.message, isLogined: false}).status(401)
  }
}
module.exports = {
  userRegisteration,
  userLogin,
  userlogout,
  adminLogin
}