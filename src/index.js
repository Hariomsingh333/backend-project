const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverRide = require("method-override");
const mongoose = require("mongoose");
const items = require("./modules/modules");
mongoose
  .connect("mongodb://localhost:27017/shopApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGOOSE CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engin", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverRide("_method"));

app.get("/", (req, res) => {
  res.render("Home.ejs");
});
app.get("/new", (req, res) => {
  res.render("Form.ejs");
});
app.get("/items", async (req, res) => {
  const findProduct = await items.find({});
  res.render("products.ejs", { findProduct });
});
app.post("/items", async (req, res) => {
  const newItems = new items(req.body);
  await newItems.save();
  const findProduct = await items.find({});
  res.redirect("/items");
});
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const foundProduct = await items.findById(id);
  res.render("product.ejs", { foundProduct });
});
app.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const foundProduct = await items.findById(id);
  res.render("edit.ejs", { foundProduct });
});
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const foundAndUpdate = await items.findByIdAndUpdate(id, req.body, {
    runValidators: true,
  });
  res.redirect("/items");
});
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const Delete = await items.findByIdAndDelete(id);
  res.redirect("/items");
});
app.listen(3000, () => {
  console.log("YOUR SERVER IS ON");
});
