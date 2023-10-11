const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/Hedera").then(() => {
    console.log("Database connected!");
}).catch((err) => {
    console.log(err, " error");
})