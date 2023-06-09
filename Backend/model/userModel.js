const mongoose = require('mongoose'); //npm i mongoose
// db server link -> mongodb atlas ka link
let secrets = require("../secrets");
const bcrypt = require('bcrypt');

// db  server connect -> mongodbAtlas connect 
mongoose
    .connect(secrets.DB_LINK)
    .then(function () {
        console.log("connected");
    })
    .catch(function (err) {
        console.log("error", err);
    })
// how to create a schema-> only entries written will be added to your db no one else 
let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is not send"],
    },
    email: {
        type: String,
        required: [true, "email is missing"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is missing"]
    },
    confirmPassword: {
        type: String,
        required: [true, "confirmPassword is missing "],
        //custom validator
        validate: {
            validator: function () {
                return this.password == this.confirmPassword;
            },

            message: "password miss match"
        },
    },
    profileImage: {
        type: String,
        default: "dp.png",
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    role :{
        type:String,
        enum:['admin','user','restaurantowner'],
        default:'user'
    }
})

//We will use posthook to remove confirm password becoause it is a redundant data and we dont want to keep this in db
// userSchema.pre('save',function(next){
//     this.confirmPassword=undefined;
//     next();
// })


// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const FooduserModel = mongoose.model('FooduserModel', userSchema);
module.exports = FooduserModel;
