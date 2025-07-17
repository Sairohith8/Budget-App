const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    title : { type: String, require: true},
    amount : {type: Number, required: true},
    category : {type : String , required : true},
    date : {type : Date, required: true},
});

module.exports = mongoose.model('Budget',budgetSchema);