import express from "express";
import {signup,verifySignup,signin,verifySignin} from "../controllers/auth"


const router=express.Router();

router.post('/signup',signup);
router.post('/verify-signup',verifySignup);
router.post('/signin',signin);
router.post('/verify-signin',verifySignin);

export default router;

