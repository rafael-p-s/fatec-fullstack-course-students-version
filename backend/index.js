// const express = require("express");
import express from "express";
import { ininitializeDatabase } from "./config/database.js";
import { Products } from "./modules/products.js";

const app = express();
const port = 3000;
app.use(express.json());

await ininitializeDatabase();

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.post("/products", async (req, res) => {
  try {
    const product = await Products.create({
      name: req.body.name,
      ingredients: req.body.ingredients,
      price: req.body.price,
    });
    return res.status(201).json(product); // 201 irá retornar que o item foi criado.
  } catch (error) {
    res.status(500).json(error);
  }
});
//API de listagem
app.get("/products", async (req, res) => {
  try {
    const products = await Products.findAll();

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});
//API de listagem
//API UPDATE
app.put("/products/:id", async (req, res) => {
  try {
    const product = await Products.update(
      {
        name: req.body.name,
        ingredients: req.body.ingredients,
        price: req.body.price,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error);
  }
});
//API UPDATE
//API DELETE
app.delete("/products/:id", async (req, res) => {
  try {
    await Products.destroy({
      where: { id: req.params.id },
    })
    res.status(200).json()
  } catch (error) {
    res.status(500).json(error);
  }
});
//API DELETE
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
