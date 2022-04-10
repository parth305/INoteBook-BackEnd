const express=require("express");
const { login, note } = require("../routefunctions/allfucntion");
const { body, validationResult } = require('express-validator');
const router=express.Router()

router.route("/login").post([
    body('username',"Enter valid username").isLength({ min: 4 }),
    body('email',"Enter valid email").isEmail(),
    body('password',"Enter valid password").isLength({ min: 8 })
],login)
router.route("/notes").get(note)

module.exports=router