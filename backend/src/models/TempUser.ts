import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ITempUser extends Document {
  name:string;
  email: string;
  dob: Date;
  otp: string;
  otpExpiry: Date;
  createdAt: Date;
  compareOTP(enteredOTP: string): Promise<boolean>;
}

const tempUserSchema: Schema = new Schema({
  name:{
     type:String,
     required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otpExpiry: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

tempUserSchema.methods.compareOTP = async function (enteredOTP: string): Promise<boolean> {
  return await bcrypt.compare(enteredOTP, this.otp);
};

export default mongoose.model<ITempUser>('TempUser', tempUserSchema);