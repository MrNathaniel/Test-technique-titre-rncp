const express = require("express")
const router = express.Router()
const uid2 = require("uid2")
const encbase64 = require("crypto-js/enc-base64")
const SHA256 = require("crypto-js/sha256")
const isAuthenticated = require("../middlewares/isAuthenticated")

const User = require("../models/User")

router.post("/user/signup", async (req, res) => {
    try {
        console.log("Sur la route!🚗")
        // const { username, email password, newsletter } = req.body

        // un paramètre est manquant
        if(!req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).json ("Tous les champs doivent être renseignés")
        }

        // l'email renseigné est déja dans la base de données
        const existingUser = await User.findOne({ email: req.body.email})
        if (!existingUser) {
            //créer un salt
            const salt = uid2(16)
            // créer un hash
            const hash = SHA256(req.body.password + salt).toString(encbase64)
            const token = uid2(32)

            const nexUser = new User({
                email: req.body.email,
                account: {
                    username: req.body.username,
                }
                newsletter: req.body.nexsletter,
                toker: token,
                hash: hash,
                salt: salt,
            })

            await newUser.save()

            const responseObject = {
                _id: newUser._id,
                token: newUser.token,
                account: {
                    username: newUser.account.username
                }
            }

            return res.status(201).json(responseObject)
        }else {
            return res.status(409).json("Cet email est déja utilisé")
        }

    }catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.post("/user/login",async (req, res) => {
    try {
        console.log(req.body)
        // Récupération du salt et du hash du user correspondant au mail :
        const userFound = await user.findOne({email: req.body.email})
        console.log(">>> userFound <<<")

        if(!userFound) {
            return res.status(401).json("Email ou Mot de passe incorrect")
        }
        // Rajout du salt récupéré dans la Base de données, et hashage du tout, puis comparaison entre le nouveau hash généré et celui stocké en base de données

        const newHash = SHA256(req.body.password + userFound.salt).toString(encbase64)
        if (newHash === userFound.hash) {

            const responseObject = {
                _id= userFound._id,
                token: userFound.token 
                account: {
                    username: userFound.account.username 
                }
            }
            return res.status(200).json (responseObject)
        }else {
            return res.status(401).json("Email ou Mot de passe incorrect")
        }
    } catch (error) {
        return res.status(500).json ({message: error.message})
    }
})

module.exports = router