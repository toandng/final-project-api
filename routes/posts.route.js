const express = require("express");
const { readDb, writeDb } = require("../utils/files.utils");

const router = express.Router();
const RESOURCE = "posts";

// [GET] /posts
router.get("/", async (req, res) => {
  const posts = await readDb(RESOURCE, []);
  res.json({ status: "success", data: posts });
});

// [GET] /posts/:id
router.get("/:id", async (req, res) => {
  const posts = await readDb(RESOURCE, []);
  const post = posts.find((item) => item.id === +req.params.id);

  if (!post) {
    return res.status(404).json({ status: "error", message: "Post not found" });
  }

  res.json({ status: "success", data: post });
});

// [POST] /posts
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const posts = await readDb(RESOURCE, []);

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content,
  };

  posts.push(newPost);
  await writeDb(RESOURCE, posts);

  res.status(201).json({ status: "success", data: newPost });
});

// [PUT] /posts/:id
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  const posts = await readDb(RESOURCE, []);
  const post = posts.find((p) => p.id === +req.params.id);

  if (!post) {
    return res.status(404).json({ status: "error", message: "Post not found" });
  }

  post.title = title;
  post.content = content;
  await writeDb(RESOURCE, posts);

  res.json({ status: "success", data: post });
});

// [DELETE] /posts/:id
router.delete("/:id", async (req, res) => {
  let posts = await readDb(RESOURCE, []);
  const originalLength = posts.length;

  posts = posts.filter((p) => p.id !== +req.params.id);

  if (posts.length === originalLength) {
    return res.status(404).json({ status: "error", message: "Post not found" });
  }

  await writeDb(RESOURCE, posts);

  res.status(204).send();
});

module.exports = router;
