const mongoose  = require("mongoose");
const {Schema} = mongoose;
const Product = new Schema({
    price: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model("products",Product);