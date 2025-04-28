const express = require("express");
const router = express.Router();

const commentRouter = require("./comments.route");
const postRouter = require("./posts.route");

router.use("/comments", commentRouter);
router.use("/posts", postRouter);

module.exports = router;
