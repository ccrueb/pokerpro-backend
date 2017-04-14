
const mongoose = require('mongoose');

exports = module.exports = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  elo: { type: Number, required: true },
  avatarId: { type: Number, required: true }, //0 is facebook pic, 1 and up correspond to pre-made avatars
  handsWon: { type: Number, required: true },
  handsLost: { type: Number, required: true },
  chipsWon: { type: Number, required: true },
  chipsLost: { type: Number, required: true }
});
