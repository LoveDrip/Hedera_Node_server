const { v4 } = require('uuid');
const { Low, JSONFile  } = require('lowdb');
const express = require("express")
const sessions = require("./sessions")

const router = express.Router();

const adapter = new JSONFile('db.json');
const db = new Low(adapter);
db.read();
db.data = db.data || { users: [] }

router.post(`/create`, async(req, res) => {
  // Is user connected ?
  if(!req.body.token || !sessions[req.body.token]) {
    res.status(401).json({"message": "Please login first"});
    return;
  }

  // Does user exists ?
  let user = sessions[req.body.token];
  user = db.data.users.find( u => u.uuid === user.uuid);
  if(!user) {
    res.status(400).json({"message": "Undefined user"});
    return;
  }

  // Mandatory fields
  if(
    !req.body.name || !req.body.gender || !req.body.color || 
    req.body.name === '' || req.body.gender === '' || req.body.color === ''
    ) {
    res.status(400).json({"message": "Invalid character request"});
    return;
  }

  // Character already exists ?
  if(user.characters.find( c => c.name === req.body.name)) {    
    res.status(400).json({"message": "Character already exists"});
    return;
  }

  const character = {
    "uuid": v4(),
    "name": req.body.name,
    "gender": ['m', 'f'].includes(req.body.gender) ? req.body.gender : 'm', // force one gender by default
    "color": req.body.color,
    "level": "1",
  }
  user.characters.push(character);
  await db.write();

  res.status(200).json({"message": "Character created", "character": character});
});

router.get(`/`, async(req, res) => {
  await db.read();
  // Is user connected ?
  if(!req.query.token || !sessions[req.query.token]) {
    res.status(401).json({"message": "Please login first"});
    return;
  }

  // Does user exists ?
  let user = sessions[req.query.token];
  user = db.data.users.find( u => u.uuid === user.uuid);
  if(!user) {
    res.status(400).json({"message": "Undefined user"});
    return;
  }

  res.status(200).json({"characters": user.characters});
});

router.delete(`/:cuuid`, async(req, res) => {
  // Is user connected ?
  if(!req.query.token || !sessions[req.query.token]) {
    res.status(401).json({"message": "Please login first"});
    return;
  }

  // Does user exists ?
  let user = sessions[req.query.token];
  user = db.data.users.find( u => u.uuid === user.uuid);
  if(!user) {
    res.status(400).json({"message": "Undefined user"});
    return;
  }

  const characters = user.characters.filter(function( c ) {
      return c.uuid !== req.params.cuuid;
  });

  user.characters = characters;
  await db.write();

  res.sendStatus(200);
});

/*
PUT /characters:cuuid (replace with his uniq id like for the delete route)
{  
  "level": "2",
  "color": "(R=0.241626,G=0.000000,B=0.000000,A=1.000000)"
} 
*/
router.put(`/:cuuid`, async(req, res) => {
  // Is user connected ?
  if(!req.body.token || !sessions[req.body.token]) {
    res.status(401).json({"message": "Please login first"});
    return;
  }

  // Does user exists ?
  let user = sessions[req.body.token];
  user = db.data.users.find( u => u.uuid === user.uuid);
  if(!user) {
    res.status(400).json({"message": "Undefined user"});
    return;
  }

  // Update the character
  user.characters.filter(function( c ) {
    if(c.uuid === req.params.cuuid) {
      c.level = req.body.level ? req.body.level : c.level;
      c.color = req.body.color ? req.body.color : c.color;
      // so on...
    }
  });

  await db.write();

  res.sendStatus(200);
  res.status(200).json({"message": "Character updated"});
});

module.exports = router