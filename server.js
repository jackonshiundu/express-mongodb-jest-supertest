const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const port = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, console.log(`Server started on port ${port}`)))
  .catch((err) => console.log(err.message));
