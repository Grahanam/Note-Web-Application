import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
var cors = require('cors')


import authRoutes from "./routes/auth";

const mongodbUrl = process.env.mongodb_url

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
}));
app.use(express.json());

app.use('/api/auth',authRoutes)

mongoose.connect(mongodbUrl as string).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


export default app;