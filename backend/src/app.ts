import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongodbUrl = process.env.mongodb_url

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(mongodbUrl as string).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


export default app;