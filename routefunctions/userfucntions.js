const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT = require("jsonwebtoken");

const JWT_SECERET = "thisissecerate";

let createuser = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    let salt = await bcrypt.genSaltSync(10);
    let securepass = await bcrypt.hash(req.body.password, salt);
    let user = await User.create({
      username: req.body.username,
      password: securepass,
      email: req.body.email
    })
    // .then(user => res.json(user))
    // .catch(err=>{
    //     console.log(err)
    //     res.json({message:"pelase enter uniq value",err:err.message})
    //   });
    let data = {
      id: user.id
    }
    let token = JWT.sign(data, JWT_SECERET);
    res.send({
      token,
      fun: "createuser", user: user
    })
  } catch (error) {
    console.log("internal server error")
  }
}

let login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let { email, password } = req.body

    let userdata = await User.findOne({ "email": email });
    if (!userdata) {
      res.status(400).json({ error: "please enter correct user cradentials" });
    }

    let passwordcomapare = await bcrypt.compare(password, userdata.password);

    if (!passwordcomapare) {
      res.status(400).json({ error: "please enter correct user cradentials" })
    }

    let data = {
      id: userdata.id
    }
    let token = JWT.sign(data, JWT_SECERET);
    res.send({
      token,
      fun: "login"
    })
  } catch (err) {
    console.log(err.message)
  }

}

let getuser = async (req, res) => {
  try {
    let id = req.user.id;

    let user = await User.find({ "_id": id });
    if (!user) {
      res.status(400).json({ error: "bad request" })
    }
    res.json(user)
  } catch (error) {
    res.status(400).send("internal error occured");
  }
}

module.exports = { createuser, login, getuser }