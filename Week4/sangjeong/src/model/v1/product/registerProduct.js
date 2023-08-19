
//env
require('dotenv').config();

const {Product} = require(process.env.SERVER_PATH + "/mongoose/mongoose.js");

const register = async (content) => {
    try{
        const newProduct = new Product({
            ...content
        })
        await newProduct.save();
        return [null, "completed"];
    }catch(error){
        return [error, "error"];
    }
}
const getRandomProduct = async () => {
    try{
        const rows = await Product.aggregate([
            {$sample: {size:1}}
        ]);
        return [rows[0], "completed"];
    }catch(error){
        return [error, "error"];
    }
}

const getProductById = async (_id) => {
    try{
        const rows = await Product.find({_id});
        if(rows.length === 0){
            return [new Error("Product not found"), "failed"];
        }else{
            return [rows[0], "completed"];
        }
    }catch(error){
        return [error, "error"];
    }
}

module.exports.register = register;
module.exports.getRandomProduct = getRandomProduct;
module.exports.getProductById = getProductById;