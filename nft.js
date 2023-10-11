const NFTInfo = require("./Model/NftInfos.js");
const CIDS = require("./Model/Cids.js");
const fetch = require("node-fetch")


const NFTSave = async (req, res) => {
  // console.log(req.body)
  // console.log("Get NFT infos from ", req.body.accountId)
  // console.log("------------------------------NFT Infos------------------------------", req.body.metadata)
  try {
    const existNFT = await NFTInfo.find({ AccountId: req.body.accountId });

    if (existNFT.length > 0) {
      const updateNFT = await NFTInfo.findOneAndUpdate(
        { AccountId: req.body.accountId },
        { $set: { metadata: req.body.metadata } },
        { new: true }
      );
      res.send("successful");
    } else {
      const Nfts = new NFTInfo({
        AccountId: req.body.accountId,
        metadata: req.body.metadata,
      });

      await Nfts.save();
      res.send("success");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occured");
  }
};

const NFTSGet = async (req, res) => {
  console.log("-----------Rsequest from Unreal with user accountId ", req.body, "-----------")
  console.log(`Send NFTs of ${req.body.data} to Unreal `)
  try {
    const existNft = await NFTInfo.find({
      AccountId: req.body.data.trim(),
    });
    res.send(existNft[0]);
  } catch (err) {
    console.log(err);
  }
};

const GetCids = async (req, res) => {
  // console.log("CIDS");
  // const cids = [
  //   "bafkreieoyfefyak7xzarvwojuljsigqkjja2clawycsb2y77smcwj6u25e",
  //   "bafkreibywazlivhx3tvkpxllcrjxmlihqp4ch7yl34qh3i5vp53mzsxfmy",
  //   "bafkreidad2mopo5nz2ziz44dmp4axxjscbr65rsbcjnnsw4tye4y53dnfm",
  //   "bafkreifzs4sfs6s2wjeeaq7sxce4u5icyty47kgmrs4kazqycrz4nicnfi",
  //   "bafkreign4fovo6zbtagj6zupiemetyxijkej3jxy5z2ysg4j377jphvu4u",
  //   "bafkreigyueqf44odnkjhi7zl4up4s74ui6wi5amzlcv7bptznps74f67ei",
  //   "bafkreieg33hdavuz63l6q3dvnjqh6myf4z2fskri46upj745xdax7i7s4u",
  // ];

  // const CID = new CIDS({
  //   Metadata: cids
  // })

  // CID.save()

  CIDS.find().then(async (cids) => {
    const arr = cids[0].Metadata;
    const metadata = [];
    for (var i = 0; i < arr.length; i++) {
      const newValue = Buffer.from(arr[i]);
      let cid = arr[i]
      const res = await fetch(`https://ipfs.io/ipfs/${newValue}`);
      const meta = await res.json();
      meta.cid = cid
      metadata[i] = meta;
    }
    // console.log(metadata)
    res.send(metadata)
  })

}

const GetMetadatas = async (req, res) => {
  console.log("aaa")
  CIDS.find().then(async (cids) => {
    const arr = cids[0].Metadata;
    const metadata = [];
    for (var i = 0; i < arr.length; i++) {
      const newValue = Buffer.from(arr[i]);
      let cid = arr[i]
      const res = await fetch(`https://ipfs.io/ipfs/${newValue}`);
      const meta = await res.json();
      // console.log(meta)
      meta.imagecid = meta.image.slice(7);
      meta.cid = cid
      metadata[i] = meta;
    }
    const alldata = {
      Alldata: metadata
    }
    // console.log(alldata)
    res.send(alldata)
    // res.send(metadata)
  })
}
// const GetCids = async (req, res) => {
//   console.log("CIDS")
//   CIDS.find().then(cids => {
//     res.send(cids[0].CIDS);
//   })
// }

module.exports = { NFTSave, NFTSGet, GetCids, GetMetadatas };
