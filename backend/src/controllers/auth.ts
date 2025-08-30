import { Request,Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import TempUser from "../models/TempUser";
import { generateOTP } from '../utils/otpGenerator';
import { sendOTPEmail } from '../utils/emailSender';
import nodemailer from 'nodemailer';


// Signup - Send OTP
export const signup = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { name, email, dob } = req.body;

    // Check if user already exists (verified user)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if there's already a temporary user
    const existingTempUser = await TempUser.findOne({ email });
    
    // Generate OTP
    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 12);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (existingTempUser) {
      // Update existing temporary user with new OTP
      existingTempUser.otp = hashedOTP;
      existingTempUser.otpExpiry = otpExpiry;
      await existingTempUser.save();
    } else {
      // Create new temporary user
      await TempUser.create({
        name,
        email,
        dob,
        otp: hashedOTP,
        otpExpiry,
      });
    }

    // Send OTP email
    await sendOTPEmail(email, otp);

    res.status(201).json({
      message: 'OTP sent to your email',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Verify OTP and complete signup
export const verifySignup = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    console.log(email,otp)
    // Find the temporary user
    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) {
      return res.status(400).json({ message: 'No signup request found for this email' });
    }

    // Check if OTP is expired
    if (tempUser.otpExpiry < new Date()) {
      // Remove expired temporary user
      await TempUser.deleteOne({ email });
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // Verify OTP
    const isOTPValid = await tempUser.compareOTP(otp);
    if (!isOTPValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if user already exists (in case of race condition)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Clean up temporary user
      await TempUser.deleteOne({ email });
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create the actual user
    const user = await User.create({
      name:tempUser.name,
      email: tempUser.email,
      dob: tempUser.dob,
    });

    // Clean up temporary user
    await TempUser.deleteOne({ email });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Signup successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        dob: user.dob,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Signin - Send OTP
export const signin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 12);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with new OTP
    user.otp = hashedOTP;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP email
    await sendOTPEmail(email, otp);

    res.status(200).json({
      message: 'OTP sent to your email',
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Verify OTP and complete signin
export const verifySignin = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    // Check if OTP is expired
    if (user.otpExpiry && user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Verify OTP
    const isOTPValid = await user.compareOTP(otp);
    if (!isOTPValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Clear OTP fields
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d'}
    );

    res.status(200).json({
      message: 'Signin successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        dob: user.dob,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
