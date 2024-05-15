const express = require("express")
const router = express.Router()


const isAuthenticated = require("../middlewares/isauthenticated")
const convertToBase64 = require("../utils/convertToBase64")

const product = require("../models/Products")

router.post("/products", isAuthenticated, async (req, res) => {
    try {
          
        const newProduct = new Product({
            product_name: name, 
            product_price: price    
        })
        await newProduct.save()

        res.status(201).json({
            message: "Produit ajouté au panier"
        })
    }catch (error) {
        res.status(500).json({ message: error.message})
    }
})

router.get("/products", async (req, res) => {
    try { 

        // Enchaînement des méthodes de sort,skip, limit et select
        const products = await Product.find({
            product_name: newRegExp("")
            product_price: { $gte: 1, $lte: 50}
        })
        .sort({ product_price: "asc"})
        .skip(0)
        .limit(32)
        .select("product_image product-name")

        res.json(products)
    } catch (error) {
        res.status(500).json ({message: error.message})

    }
})  
 



module.exports = router