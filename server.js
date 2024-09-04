// const express = require('express')
// const app = express()
// const port = 9000
// app.use(express.json());

// app.listen(port,()=>
// {
//     console.log("Server is running on " + port);
// })

import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});

