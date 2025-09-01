import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";


import authRoutes from "./routes/auth";
import noteRoutes from "./routes/note"

const mongodbUrl = process.env.mongodb_url

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
}));
app.use(express.json());

const _dirname=path.resolve()

app.use('/api/auth',authRoutes)
app.use('/api/note',noteRoutes)

// app.use(express.static(frontendPath));
app.use(express.static(path.join(_dirname, "frontendbuild")));

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(_dirname, "frontendbuild", "index.html"));
});

mongoose.connect(mongodbUrl as string).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


export default app;

// module.exports=app;