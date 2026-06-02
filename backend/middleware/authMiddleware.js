import userModel from "../models/userModels.js";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()
export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.json({ error: "No token provided" })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.userId).select("-password");

        if (!user) {
            return res.json({ error: "User not found" })
        }

        req.user = user
        next()
    } catch (error) {
        res.json({ error:"Invalid token"})
    }
}