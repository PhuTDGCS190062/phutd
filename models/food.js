const mongoose = require("mongoose");


const FoodSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    calories : {
        type: Number,
        default : 0,
        validate: {
            validator: function(value) {
                return (value>0);
            },
            message: "Negative calories !",
        },

    },

});

const Food = mongoose.model("Food", FoodSchema,"Food");
module.exports = Food;