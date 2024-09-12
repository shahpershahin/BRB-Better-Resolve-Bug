const mongoose = require('mongoose');

const dummyDataSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const DummyData = mongoose.model('DummyData', dummyDataSchema);

module.exports = DummyData;