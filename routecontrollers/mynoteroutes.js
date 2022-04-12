const express=require("express");
const fetchuser = require("../middleware/fetchuser");
const {getnote,addnote,updatenote, deleatenote} =require("../routefunctions/notesfunctions")

const { body, validationResult } = require('express-validator');

const router=express.Router();


router.use(fetchuser)

//notes functions
router.route("/getnotes").get(getnote)
router.route("/addnote").post([
            body("title","enter valid title").isLength({min:3}),
            body("description","enter valid description").isLength({min:5})],addnote)

router.route("/updatenote/:id").put(updatenote)
router.route("/deletenote/:id").delete(deleatenote)

module.exports=router