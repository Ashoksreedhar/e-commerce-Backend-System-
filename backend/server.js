import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
import userRouter from "./routes/userRouter.js"
import authRouter from "./routes/authRouter.js"
import productRouter from "./routes/productRouter.js"
import orderRouter from "./routes/orderRouter.js"
import recommendatRouter from "./routes/analyticsRouter.js"


dotenv.config()
const app = express()
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/profile', userRouter)
app.use('/api/products', productRouter)
app.use('/api/order', orderRouter)
app.use('/api/analytics', recommendatRouter)

const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`================DATABASE IS CONNECTED================`);
        app.listen(port, () => {
            console.log(`SERVER RUNNING http://localhost:${port}`);
        })
    })
    .catch((error) => {
        console.log(error);

    })