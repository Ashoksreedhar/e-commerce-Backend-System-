import bcrypt from "bcryptjs"
import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()
//Registeration
export const userRegister = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const userEmail = await userModel.findOne({ email })
        if (userEmail) {
            return res.json({ error: "Email is alerdy taken" })
        }
        const hashedPassword = await bcrypt.hash(password, 5)
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        })
        res.json({ message: "user create sucessfully", user })

    } catch (error) {
        res.json({ error: message })
    }
}

//Login

export const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ message: "User is not registered" })
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.json({ message: "Invalid password" })
        }

        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET
        )
        res.json({ message: "Login successfully", token })
    } catch (error) {
        res.json({ error: message })
    }
}
