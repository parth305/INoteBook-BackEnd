const express=require("express");
const { createuser,login,getuser } = require("../routefunctions/userfucntions");

const { body, validationResult } = require('express-validator');
const fetchuser=require("../middleware/fetchuser")

const router=express.Router()

//user function
router.route("/createuser").post([
    body('username',"Enter valid username").isLength({ min: 4 }),
    body('email',"Enter valid email").isEmail(),
    body('password',"Enter valid password").isLength({ min: 8 }),
    body('password',"password can not be blank").exists()
],createuser)


router.route("/login").post([
    body('email',"Enter valid email").isEmail(),
    body('password',"password can not be blank").exists()
],login)

//middleware for authenticating user
router.use(fetchuser)
router.route("/getuser").post(getuser)


module.exports=router