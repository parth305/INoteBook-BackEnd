const express=require("express");
const { createuser, note ,login,getuser } = require("../routefunctions/allfucntion");
const { body, validationResult } = require('express-validator');
const fetchuser=require("../middleware/fetchuser")

const router=express.Router()

router.route("/createuser").post([
    body('username',"Enter valid username").isLength({ min: 4 }),
    body('email',"Enter valid email").isEmail(),
    body('password',"Enter valid password").isLength({ min: 8 }),
    body('password',"password can not be blank").exists()
],createuser)
router.route("/notes").get(note)
router.route("/login").post([
    body('email',"Enter valid email").isEmail(),
    body('password',"password can not be blank").exists()
],login)
router.use(fetchuser)
router.route("/getuser").post(getuser)
// router.use()

module.exports=router