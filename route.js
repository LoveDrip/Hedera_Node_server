const express = require("express")
// const { Register, Login, Logout, WalletConnect, Test} = require("user.js")
const { NFTSGet, NFTSave, GetCids, GetMetadatas, GetInventory } = require("./nft")

const userRouter = express.Router();
console.log("NFTSAVE")
userRouter.post("/test", (req, res) => {
    console.log("test>>>>");
})
userRouter.post("/nftsave", NFTSave);
userRouter.post("/nftget", NFTSGet);
userRouter.post("/getcids", GetCids);
userRouter.get("/getmetadatas", GetMetadatas);
userRouter.post("/getinventory", GetInventory);

module.exports = userRouter;
