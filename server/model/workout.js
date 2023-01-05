const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        
    },
    endDate:{
        type: Date,
    },
    default:{
        type: Boolean,
        default: true
    },
    exercises: {
        type: Array,
    },
    notes: {
        type: Array,
    },
    finalNotes: {
        type: String,
    },
    other: {
        type: String,
    },
    sleep: {
        type: Number,
    },
    targets: {
        type: Array,
    },

});
workoutSchema.index({'$**': 'text'});

module.exports = mongoose.model("Workout", workoutSchema);