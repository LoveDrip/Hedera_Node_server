const mongoose = require("mongoose");   

const NFTs = new mongoose.Schema({
    Metadata: {
        type: Array
    }
})

module.exports = mongoose.model("NFTs", NFTs);