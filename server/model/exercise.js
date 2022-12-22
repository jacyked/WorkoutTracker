const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    stringName: {
        type: String,
        required: true,
    },
    fullName:{
        type: String,
        required: true,
    },
    altName:{
        type: String,
        required: false,
        default: null
    },
    aka: {
        type: Array,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    relatedExercises: {
        type: Array,
        required: false,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    benefits: {
        type: String,
        required: false,
    },
    shortDesc: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    exerciseType: {
        type: Number,
        required: false,
    },
    level: {
        type: Number,
        required: false,
    },
    mainMuscle:  {
        type: Number,
        required: false,
    },
    mainMuscleName: {
        type: String,
        required: false,
    },
    otherMuscles: {
        type: Array,
        required: false,
    },
    isSport: {
        type: Boolean,
        required: false,
    },
    mechanicType: {
        type: Number,
        required: false,
    },
    force: {
        type: String,
        required: false,
    },
    equipment: {
        type: Array,
        required: false,
    },
    equipmentType:  {
        type: Array,
        required: false,
    },
    equipmentTypes: {
        type: Array,
        required: false,
    },

});
exerciseSchema.index({'$**': 'text'});

module.exports = mongoose.model("Exercise", exerciseSchema);