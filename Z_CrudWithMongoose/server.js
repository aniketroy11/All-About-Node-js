const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = 6600;

// connecting with mongoose

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Company');
  console.log('Database is connected');
}

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));

