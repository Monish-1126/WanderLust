const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});
const dburl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main(){
    await mongoose.connect(dburl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>({...obj,owner:"6a4c3bae9985d41c9f0bc679"}))
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();