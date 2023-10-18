const express = require("express")
// const { Register, Login, Logout, WalletConnect, Test} = require("user.js")
const { NFTSGet, NFTSave, GetCids, GetMetadatas, GetInventory } = require("./nft")

const userRouter = express.Router();
console.log("NFTSAVe")
userRouter.get("/test", (req, res) => {
    console.log("test>>>>");
    res.send("test");
})
userRouter.post("/nftsave", NFTSave);
userRouter.post("/nftget", NFTSGet);
userRouter.post("/getcids", GetCids);
userRouter.get("/getmetadatas", GetMetadatas);
userRouter.post("/getinventory", GetInventory);

module.exports = userRouter;
