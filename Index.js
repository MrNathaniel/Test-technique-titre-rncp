const express = require("express"); //import du package express
const mongoose = require("mongoose") // import du package mongoose


const app = express(); // création du serveur
app.use(express.json())

//Connexion à la base de données
mongoose.connect("mongodb://localhost:27017/Burger-King")



//Déclaration du modèle "products"
//const User = mongoose.model('Products', {
    //description: [String, Number],

//})

app.get("/", async(req, res) => { //route en GET dont le chemin est /
   
    try {
        const products = await products.find()
       res.json({message : "Bienvenue chez Burger King"}); // réponse du serveur

        
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})


//import des routes
const productsRoutes = require("./routes/products")
app.use(productsRoutes)

app.all("*", function(req, res){
    res.json({message : "Page not found"})
})

app.listen(3000, () => { // Mon serveur va écouter le port 3000
    console.log("Server has been 🚀🚀🚀 "); // Quand je vais lancer ce serveur, la callback va être appelée
})