const mongoose  = require("mongoose");
const {Schema} = mongoose;
const Session = new Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    expires: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    }
});

module.exports = mongoose.model("sessions",Session);