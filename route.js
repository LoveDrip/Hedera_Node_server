const express = require("express")
// const { Register, Login, Logout, WalletConnect, Test} = require("user.js")
const { NFTSGet, NFTSave, GetCids, GetMetadatas} = require("./nft")

const userRouter = express.Router();
console.log("NFTSAVE")
userRouter.post("/nftsave", NFTSave);
userRouter.post("/nftget", NFTSGet);
userRouter.get("/getcids", GetCids);
userRouter.get("/getmetadatas", GetMetadatas);

module.exports = userRouter;
