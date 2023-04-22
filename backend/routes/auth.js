const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const jwtSecret = "autheniNotebook"


//ROUTE 1: checking whether the details are valid, so sending an array of checking middlewares for creating a new user account
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name of atleast 5 characters").isLength({
      min: 5,
    }),
    body("password", "Password should be oof atleast 3 characters").isLength({
      min: 3,
    }),
  ],

  //validator will check from the resoponse if there are any errors if there are it will send a response with error message
  async (req, res) => {
    let success = true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({success, errors: errors.array() });
    }

    //checking if the user exists or not using the User.findOne if it exist it sends a response of 400
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Sorry, a user with that email already exists" });
      }

      //hashing the password using bcrypt 
      const salt = await bcrypt.genSaltSync(10);
      let secPass = await bcrypt.hashSync(req.body.password, salt);

      //it will create a new user with the verified details in the /user/auth/NoteVault
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass ,
      });

      //creating an authtoken for the user
      const data = {
        user:{
            id:user.id
        }
      }
      const authToken = jwt.sign(data , jwtSecret);
      res.json({success, authToken });
      
    } catch (err) {
      success = false;
      console.error(err);
      res.status(500).send("An error occured");
    }
  }
)


  //ROUTE 2: checking whether the details are valid, so sending an array of checking middlewares for login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],

  //validator will check from the resoponse if there are any errors if there are it will send a response with error message
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
    const {email, password}= req.body;
    //checking if the user exists or not using the User.findOne if it exist it sends a response of 400
    
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res
          .status(400)
          .json({ success, error: "Sorry, try logging in with correct credentials" });
      }

      //checking if the password matches the password stored in the datatbase by matching hashes
      const passcheck = await bcrypt.compare(password, user.password)
      if (!passcheck) {
        success = false
        return res
        .status(400)
        .json({ success, error: "Sorry, try logging in with correct credentials" });
      }

      //creating an authtoken for the user
      const data = {
        user:{
            id:user.id
        }
      }
      const authToken = jwt.sign(data , jwtSecret);
      let success = true
      res.json({success, authToken });
      
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);



  //ROUTE 3: 
router.post('/getuser', fetchuser , async (req, res) => {
  try {
  userid=req.user.id
  const user = await User.findById(userid).select("-password")
  // console.log(json(user));
  res.send(user)
  
  }
  catch (err) {
    console.log(err);
    res.status(500).send({"error": "Internal server error"})
  }
});
module.exports = router;
