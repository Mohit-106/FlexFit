const mongoose = require('mongoose'); //npm i mongoose
let planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "kindly pass the name"],
        unique: [true, "plan name should be unique"],
        maxlength: [40, "Your plan length is more than 40 characters"],
    },
    duration: {
        type: String,
        required: [true, "You Need to provide duration"]
    },
    price: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
        validate: {
            validator: function () {
                return this.discount < this.price;
            },
            // error
            message: "Discount must be less than actual price",
        },
    },
    averageRating: {
        type:String
    }
    // reviews -> buy 
})
const FoodplanModel = mongoose.model
    // name of the collection, the set of rules this collection should follow
    ('FoodplanModel', planSchema);
module.exports = FoodplanModel;