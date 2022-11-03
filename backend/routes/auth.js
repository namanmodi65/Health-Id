const express = require('express')
const User = require('../models/User')
const fetchuser = require('../middleware/fetchuser')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Thisishealthidwebapp'

const router = express.Router()

router.post('/signup', [
  body('name').isLength({ min: 5 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  try {

    let user = await User.findOne({ email: req.body.email })
    if (user) {
      success = false
      return res.status(400).json({success,error: "sorry the user is already exist" })
    }
    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
      blood_group:req.body.blood_group,
      phone:req.body.phone
    })
    const data ={
      user:{
        id : user.id
      }
    }

    const authToken = jwt.sign(data,JWT_SECRET) 
    success = true
    res.json({success,authToken})
  } catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured")
  }
})


//ROUTE-2:Authanticate a user using POST:/api/auth/login
router.post('/login', [
  body('email',"enter a valid email").isEmail(),
  body('password','Password can not be blank').exists()
], async (req, res) => {
  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} = req.body
  try {
    let user =await User.findOne({email})
    if(!user){
      success = false
      return res.status(400).json({success,error:"Uncorrect passward"})
    }

    const passwordCompare =await bcrypt.compare(password,user.password)
    if(!passwordCompare){
      success = false
      return res.status(400).json({success,error:"Uncorrect passward"}) 
    }
    const data ={
      user:{
        id : user.id
      }
    }

    const authToken = jwt.sign(data,JWT_SECRET) 
    success = true
    res.json({success,authToken})
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }

})

//ROUTE-3:Get Login detail of user using POST:/api/auth/getinfo

router.post('/getinfo',fetchuser, async (req, res) => {
  
  try {
    const userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user) 
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
})


module.exports = router