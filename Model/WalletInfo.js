const mongoose = require('mongoose');
const WalletInfoSchema = new mongoose.Schema({
    WalletAddress: {
        type: String,
        required: true
    },
    WalletNet: {
        type: String,
        required: true
    },
    WalletBalance: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('WalletInfo', WalletInfoSchema);
