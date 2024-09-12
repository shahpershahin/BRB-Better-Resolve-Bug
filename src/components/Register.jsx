import React from 'react'

function Register() {
  const mongoose = require('mongoose');

// Define a simple schema for dummy data
const dummySchema = new mongoose.Schema({
  name: "Shahper",
  description: "String"
});

// Create a model based on the schema
const DummyData = mongoose.model('DummyData', dummySchema);

module.exports = DummyData;
  return (
    <>
    </>
  )
}

export default Register