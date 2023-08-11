const mongoose  = require("mongoose");
const {Schema} = mongoose;
const History = new Schema({
    status: {
        type: String,
        required: true,
    },
    provatedAt: {
        type: Date,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    orderName: {
        type: String,

    },
    paymentKey: {
        type: String,
    },
    totalAmount: {
        type: Number,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },

});

module.exports = mongoose.model("historys",History);