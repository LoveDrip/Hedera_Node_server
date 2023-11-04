const NFTInfo = require("./Model/NftInfos.js");
const CIDS = require("./Model/Cids.js");
const NFTs = require("./Model/NFTs.js")
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
  console.log("CIDS");
  //   const cids = [
  //     "bafkreib5nezjz65tzgmozo64fl2vnnexsq4n7viwizzwnmu62t4qtr2qxy",
  // "bafkreic6wtr7vgs6774ghrc6jbjcj4vmkkftcsmrunt4k45ahmz5da52la",
  // "bafybeibchealxhfebtun7oc6lqq3kyt5bcpuvstsitu2pyqevtsl2usaly",
  // "bafybeibqn4fnfbbr622ltqjgsucr3pd35ftcvnpd6pmdjdbjwwil4hp3cy",
  // "bafybeiba4lfjkzqkkmy7ri52qcd3jpuwe75vcyn6qo5knewh72po7qcndq",
  // "bafybeiceexupu72a77gyoeyzvbaxhwenyfctnrsrme3gq4rzdksqv7qbva",
  // "bafkreic6oaowvec3sfn23pai2dh777cufktvwbyhgeoglc2tpcva7sbbfe"
  //   ];

  //   const cid = new CIDS({
  //     Metadata: cids
  //   })

  //   cid.save();
  // const metadatas = [
  //   {
  //     "image": "bafybeic4sogfb52n3j743iciq7vxx5b5f6kyhzsdlzlawlvtq7hqolhbn4",
  //     "tokenId": "0.0.2792760",
  //     "name": "Knife",
  //     "description": "The Sawtooth Combat Knife, produced by Kastak Arms, is a 16 cm combat knife that embodies the manufacturer's aggressive styling. The blade is designed to perform multiple functions, including stabbing, slicing, and sawing. It features a strong tip for piercing, a straight edge for slicing, and a unique serrated edge with microblades for enhanced cutting ability. The blade is coated with a special ceramic polymer that enhances its strength and overall wear resistance. The Sawtooth is a formidable weapon that should be handled with care to avoid injury. Its design and construction make it a reliable tool for combat situations",
  //     "price": "400",
  //     "weaponType": "Melee",
  //     "Control": "2.54",
  //     "XRecoil": "2.5",
  //     "YRecoil": "1.6",
  //     "Range": "10",
  //     "RPM": "10",
  //     "cid": "bafkreieoyfefyak7xzarvwojuljsigqkjja2clawycsb2y77smcwj6u25e",
  //     "serial_number": "1"
  //   },
  //   {
  //     "image": "bafkreihg4kavwifir2onyqfgtuxnztux6oififtplggvwhd4xf4rvsxafm",
  //     "tokenId": "0.0.2792760",
  //     "name": "Frag",
  //     "description": "Found my self interested in an artwork of Sci-Fi grenades and decided why not make one! Seems hard at first look but believe me it’s all made from simple blender meshes. If you like it do leave a like. Patrick San Peace Out :)",
  //     "price": "2000",
  //     "weaponType": "Explosive",
  //     "Control": "2.34",
  //     "XRecoil": "1.5",
  //     "YRecoil": "1.5",
  //     "Range": "100",
  //     "cid": "bafkreibywazlivhx3tvkpxllcrjxmlihqp4ch7yl34qh3i5vp53mzsxfmy",
  //     "RPM": "100",
  //     "serial_number": "2"
  //   },
  //   {
  //     "image": "bafybeibb7ol6yzqibbj37fgbhpxckhvlqowtyygnjw576djrorjfvlyuae",
  //     "tokenId": "0.0.2792760",
  //     "name": "Shotgun",
  //     "description": "This product contains a code plugin, complete with pre-built binaries and all its source code that integrates with Unreal Engine, which can be installed to an engine version of your choice then enabled on a per-project basis.",
  //     "price": "5000",
  //     "weaponType": "Primary",
  //     "Control": "2.5",
  //     "XRecoil": "3.5",
  //     "YRecoil": "3.5",
  //     "Range": "500",
  //     "cid": "bafkreidad2mopo5nz2ziz44dmp4axxjscbr65rsbcjnnsw4tye4y53dnfm",
  //     "RPM": "500",
  //     "serial_number": "3"
  //   },
  //   {
  //     "image": "bafybeia7j2wp5hxsvz4fvyupd6v24boowzcd5fsoagqfrwr7v7mw4vaiee",
  //     "tokenId": "0.0.2792760",
  //     "name": "Sniper",
  //     "description": "AB3DX - Weapons Includes skeletal structure and animation. Compatible with FPS and TPS character arm animations.",
  //     "price": "56000",
  //     "weaponType": "Primary",
  //     "Control": "2.5",
  //     "XRecoil": "4.5",
  //     "YRecoil": "4.5",
  //     "cid": "bafkreifzs4sfs6s2wjeeaq7sxce4u5icyty47kgmrs4kazqycrz4nicnfi",
  //     "Range": "500",
  //     "RPM": "600",
  //     "serial_number": "4"
  //   },
  //   {
  //     "image": "bafybeigcoidvramzewz6ym2c7ci2rqpbdv5lm3nw75l6wgs7o76oietqaq",
  //     "tokenId": "0.0.2792760",
  //     "name": "Pistol",
  //     "description": "Highly detailed Pistol 3D model with realistic appearance.A high quality model built with game development in mind.",
  //     "price": "4000",
  //     "weaponType": "Secondary",
  //     "Control": "2.5",
  //     "XRecoil": "4.5",
  //     "cid": "bafkreign4fovo6zbtagj6zupiemetyxijkej3jxy5z2ysg4j377jphvu4u",
  //     "YRecoil": "3.5",
  //     "Range": "300",
  //     "RPM": "300",
  //     "serial_number": "5"
  //   },
  //   {
  //     "image": "bafybeiccpiszadorb3lo3cnmdcdqz5ujjoxhe2gpoiogu2fvdp37mfaiaa",
  //     "tokenId": "0.0.2792760",
  //     "name": "SMG",
  //     "description": "3D model with realistic appearance.A high quality model built with game development in mind.",
  //     "price": "4000",
  //     "weaponType": "Primary",
  //     "Control": "2.5",
  //     "XRecoil": "4.5",
  //     "YRecoil": "3.5",
  //     "cid": "bafkreigyueqf44odnkjhi7zl4up4s74ui6wi5amzlcv7bptznps74f67ei",
  //     "Range": "300",
  //     "RPM": "300",
  //     "serial_number": "6"
  //   },
  //   {
  //     "image": "bafkreigzzkcbobgtgbcy3poz4ifchk42pdsu7taqnasaqpijcwnqd62jg4",
  //     "tokenId": "0.0.2792760",
  //     "name": "Special",
  //     "description": "Advanced Muscle Builders, Anabolic & Extreme Nitric Oxide Upregulator, Brands, Christmas, StarPharma",
  //     "price": "550.00",
  //     "weaponType": "Special",
  //     "Control": "2.5",
  //     "XRecoil": "4.5",
  //     "YRecoil": "3.5",
  //     "cid": "bafkreieg33hdavuz63l6q3dvnjqh6myf4z2fskri46upj745xdax7i7s4u",
  //     "Range": "100",
  //     "RPM": "100",
  //     "serial_number": "7"
  //   }
  // ]

  // const nft = new NFTs({
  //   Metadata: metadatas
  // })
  // nft.save()


  // console.log("sdsdsd")
  // NFTs.find().then((nfts) => {
  //   res.send(nfts[0])
  // })

  console.log("getcids");
  CIDS.find().then((cids) => {
    res.send(cids[0].Metadata)
  })

}

const GetCid = async (req, res) => {
  console.log(req.body)
  const name = req.body.name
  const tokenId = req.body.tokenId;
  console.log(name, tokenId)
  NFTs.find().then((nfts) => {
    const nft = nfts[0].Metadata;
    for(var i = 0; i < nft.length; i++ ) {
      if(nft[i].name == name) {
        res.send(nft[i])
      }
    }
  })
}

const UpdateMetadata = async (req, res) => {
  const metas = req.body
  // const drop = await NFTs.deleteMany();


  // if(drop.acknowledged) {
  //   const nfts = new NFTs ({
  //     Metadata: metas
  //   })

  //   nfts.save();


  // }
  

}

const GetInventory = async (req, res) => {
  console.log("GetInventory: ", req.body)
  const tokenId = req.body.tokenId;
  const name = req.body.name;
  const nfts = [];
  const inventory = await NFTInfo.find({ AccountId: req.body.accountId.trim() })
  if (inventory.length > 0) {
    console.log("inventory.length")
    const inven = inventory[0]
    for (var i = 0; i < inven.metadata.length; i++) {
      if (inven.metadata[i].tokenId == tokenId && inven.metadata[i].name == name) {
        console.log("inven")
        const nft = {
          accountId: inven.AccountId,
          metadata: inven.metadata[i]
        }
        nfts.push(nft);
      }
    }
  }
  console.log(nfts);
  res.send(nfts);
}

const GetMetadatas = async (req, res) => {
  console.log("aaa")
  // CIDS.find().then(async (cids) => {
  //   const arr = cids[0].Metadata;
  //   const metadata = [];
  //   for (var i = 0; i < arr.length; i++) {
  //     const newValue = Buffer.from(arr[i]);
  //     let cid = arr[i];
  //     const res = await fetch(`https://ipfs.io/ipfs/${newValue}`);
  //     const meta = await res.json();
  //     meta.imagecid = meta.image.slice(7);
  //     meta.cid = cid
  //     metadata[i] = meta;
  //   }
  //   const alldata = {
  //     Alldata: metadata
  //   }
  //   res.send(alldata)
  // })
  NFTs.find().then((metadatas) => {
    const metadata = metadatas[0].Metadata;
    const alldata = {
      Alldata: metadata
    }
    res.send(alldata)
  } )
}

module.exports = { NFTSave, NFTSGet, GetCids, GetMetadatas, GetInventory, GetCid, UpdateMetadata };
/*  */