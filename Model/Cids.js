const mongoose = require("mongoose");   

const CIDS = new mongoose.Schema({
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

module.exports = mongoose.model("CIDS", CIDS);