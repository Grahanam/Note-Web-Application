import mongoose, { Document, Schema } from 'mongoose';


export interface INote extends Document {
  title:string;
  user:mongoose.Types.ObjectId;
  createdAt: Date;
}

const userSchema: Schema = new Schema({
  title:{
    type:String,
    required:true,
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'User',
    require:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<INote>('Note', userSchema);