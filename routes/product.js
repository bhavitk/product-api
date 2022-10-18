import { Router } from "express";
import { Op } from "sequelize";

import Product from "../models/product.js";
import currency from "../helper/currency.js";

const router = new Router();

router.get("/mostviewed", async (req, res) => {
  const limit = Number(req.query.limit || 5);

  if (Number.isNaN(limit) === true) {
    res.status(400).send({ error: "Invalid limit" });
    return;
  }

  let products = await Product.findAll({
    where: {
      productViewed: {
        [Op.gt]: 0,
      },
    },
    order: [["productViewed", "DESC"]],
    limit,
  });
  if (req.query.currency) {
    if (req.query.currency !== "CAD") {
      res.send({ error: "Invalid currency" });
      return;
    }

    // Fetching currency conversion rate.
    const converted = await currency.convert(1, req.query.currency);
    if (converted === false) {
      res.status(500).send({ error: "Error converting currency." });
      return;
    }
    products = products.map((row) => {
      row.price = Number.parseFloat(
        Number(row.price * converted.conversion_rate).toFixed(2)
      );
      return row;
    });
  }
  res.send(products);
});

router.get("/:productId", async (req, res) => {
  const productId = Number(req.params.productId);

  // Checking if productId is number
  if (Number.isNaN(productId) === true) {
    res.status(400).send({ error: "Invalid product ID." });
    return;
  }
  const product = await Product.findByPk(productId);

  // Product not found
  if (product === null) {
    res.status(404).send({ error: "Product not found." });
    return;
  }

  // Incrementing view count.
  product.productViewed += 1;
  await product.save();

  // If client requesting price to be converted to requested currency
  if (req.query.currency) {
    if (req.query.currency !== "CAD") {
      res.status(400).send({ error: "Invalid currency" });
      return;
    }
    // Converting price to requested currency
    const converted = await currency.convert(product.price, req.query.currency);

    // Unable to convert to requested currency, API returned failure response.
    if (converted === false) {
      res.status(500).send({ error: "Error converting currency." });
      return;
    }
    product.price = Number.parseFloat(converted.conversion_result.toFixed(2));
  }
  res.send(product);
});

export default router;
