import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name:string;
  email: string;
  dob: Date;
  otp?: string;
  otpExpiry?: Date;
  createdAt: Date;
  compareOTP(enteredOTP: string): Promise<boolean>;
}

const userSchema: Schema = new Schema({
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
  },
  otpExpiry: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.compareOTP = async function (enteredOTP: string): Promise<boolean> {
  return await bcrypt.compare(enteredOTP, this.otp || '');
};

export default mongoose.model<IUser>('User', userSchema);