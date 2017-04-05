
const mongoose = require('mongoose');

exports = module.exports = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  elo: { type: Number, required: true },
  handsWon: { type: Number, required: true },
  handsLost: { type: Number, required: true },
  chipsWon: { type: Number, required: true },
  chipsLost: { type: Number, required: true }
});
