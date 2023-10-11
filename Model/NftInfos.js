const mongoose = require("mongoose");
const NFTSchema = new mongoose.Schema({
    AccountId: {
        type: String,
    },  
    metadata: {
        type: Array
    }, 
})

module.exports = mongoose.model("NFTInfo", NFTSchema);