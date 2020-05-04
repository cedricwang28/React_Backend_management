const mongoose = require("mongoose");
const { Book, BookCategory } = require("./models");

mongoose
  .connect("mongodb://localhost:27017/cat-shop", {
    useNewUrlParser: true
  })
  .then(res => {
    // console.log(res);
    console.log("db connected successfully");
  })
  .catch(err => {
    console.log(err);
  });
