const user = require("../models/User")

cons isAuthenticated = async (req, res, next) => {
    console.log("middle")
    try{
        if(!req.headers.authorization){
            return res.status(401).json({message: "Unauthorized"})
        }

        const token = req.headers.authorization.replace("Bearer ", "")

        const user = await User.findone({ token: token}).select("account")

        if (user === null) {
            return res.status(401).json({ message: "Unautorized" })
        }
        req.user = user
        next()

    }catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports = isAuthenticated 