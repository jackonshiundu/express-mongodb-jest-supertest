const express = require("express");
const ProductRoutes = require("./routes/product.route");
let app = express();

/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ server: "Active" });
});
//
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging
  res.status(500).send("Something went wrong!");
});
/* Telling the server to use the routes in the ProductRoutes file. */
app.use("/api", ProductRoutes);
module.exports = app;
