const User = require("../models/User");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT = require("jsonwebtoken");

const JWT_SECERET = "thisissecerate";

let createuser = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg, success: false, code: 400 });
  }
  try {

    let salt = await bcrypt.genSaltSync(10);
    let securepass = await bcrypt.hash(req.body.password, salt);
    let user = await User.create({
      username: req.body.username,
      password: securepass,
      email: req.body.email
    })
    let data = {
      id: user.id
    }
    let token = JWT.sign(data, JWT_SECERET);
    return res.status(200).json({
      token: token,
      success: true, code: 200, user: user
    })
  } catch (error) {
    return res.status(400).json({ error: "email already exist try to login", success: false, code: 400 })
  }
}

let login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg, success: false, code: 400 });
  }

  try {
    let { email, password } = req.body
    // console.log("hey");
    let userdata = await User.findOne({ "email": email });
    if (!userdata) {
      return res.status(400).json({ error: "account does not exist create new account", success: false, code: 400 });
    }

    let passwordcomapare = await bcrypt.compare(password, userdata.password);

    if (!passwordcomapare) {
      return res.status(400).json({ error: "incorrect password", success: false, code: 400 })
    }

    let data = {
      id: userdata.id
    }
    let token = JWT.sign(data, JWT_SECERET);
    return res.status(200).json({
      token,
      success: true,
      code: 200
    })
  } catch (err) {
    return res.status(400).json({ error: "internal server error", success: false, code: 400 })
  }

}

let getuser = async (req, res) => {
  try {
    let id = req.user.id;

    let user = await User.find({ "_id": id });
    if (!user) {
      return res.status(400).json({ error: "bad request", success: false, code: 400 })
    }
    return res.json(user)
  } catch (error) {
    return res.status(400).json({ error: "internal error occured", success: false, code: 400 });
  }
}

module.exports = { createuser, login, getuser }