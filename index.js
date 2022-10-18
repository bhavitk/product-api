import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

import product from "./routes/product.js";
app.use("/product", product);

app.listen(PORT);
