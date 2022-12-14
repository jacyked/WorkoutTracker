const mongoose = require(mongoose);

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    locked: {
        type: Boolean,
        default: false
    },
    isActiveToken: {
        type: String,
        required: true,
    },
    workoutList: {
        type: Array,
        default: []
    },
    gender: {
        type: String
    },


});

module.exports = mongoose.model("User", userSchema);