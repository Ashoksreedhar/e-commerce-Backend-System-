import userModel from "../models/userModels.js";


// All-users

export const allUser = async (req, res) => {
    const users = await userModel.find({})
    res.json({ users })
}


//user-profile

export const userUpdate = async (req, res) => {
    const { username, email } = req.body
    try {
        const userUpdate = await userModel.findByIdAndUpdate(
            req.params.id,
            { username, email },
            { returnDocument: "after" }
        )

        res.json({ message: "User upadate suscssfully", userUpdate })
    } catch (error) {
        res.json({ error: error.message })
    }
}

