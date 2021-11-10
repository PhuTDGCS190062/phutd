const mongoose = require("mongoose");


const AccountSchema = new mongoose.Schema({
    UserName : {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    Password : {
        type: String,
        required: true,
        trim: true,
    },
    FullName : {
        type: String,
        required: true,
        trim: true,
    },
    Role : {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    imglink : {
        type: String,
        required: true,
        trim: true,
    },
    

});

const Account = mongoose.model("Account", AccountSchema,"Account");
module.exports = Account;