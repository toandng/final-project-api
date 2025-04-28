const express = require("express");
const router = express.Router();

const commentRouter = require("./comments.route");

router.use("/products", commentRouter);
module.exports = router;
