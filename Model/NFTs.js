const mongoose = require("mongoose");   

const NFTs = new mongoose.Schema({
    // AccountId: {
    //     type: String
    // },
    // Price: {
    //     type: String
    // },
    Metadata: {
        type: Array
    }
})

module.exports = mongoose.model("NFTs", NFTs);