const mongoose = require ("mongoose")

const Products = mongoose.model("Products", {
    product_name: String, 
    product_image: Object,
    product_price: Number, 
    products: {
        type: mongoose.Schema.Types.objectId,
        ref: "products"
    }

})



module.exports = Products