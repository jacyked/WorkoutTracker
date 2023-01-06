const mongoose = require("mongoose");

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
        required: false,
    },
    workoutList: {
        type: Array,
        default: []
    },
    workoutIDs: {
        type: Array,
        default: [],
    },
    gender: {
        type: String,
        default: "",
    },
    refreshToken: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        default: Date.now,
    }


});

module.exports = mongoose.model("User", userSchema);