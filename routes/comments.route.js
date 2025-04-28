const express = require("express");
const { readDb, writeFile } = require("../utils/files.utils");
const router = express.Router();

let unitqId = 0;

// [GET] / comment
router.get("/", async (req, res) => {
  const comments = await readDb(RESOURCE, []);
  res.json({
    status: "success",
    data: comments,
  });
});

// [GET] / comment/:id
router.get("/:id", async (req, res) => {
  const comments = await readDb(RESOURCE);

  const comment = comments.find((item) => item.id === +req.params.id);
  if (!comment) {
    res.json({
      status: "error",
      message: "Resource not found",
    });
    return;
  }
  res.json({
    status: "success",
    data: comment,
  });
});

// [POST] / comments

router.post("/", async (req, res) => {
  const comments = await readDb(RESOURCE);

  const newComment = {
    id: (comments[comments.length - 1].id ?? 0) + 1,
    name: req.body.comment,
  };

  comments.push(newComment);
  await writeFile(RESOURCE, comments);

  res.json({
    status: "success",
    data: newComment,
  });
});

// [PUT] / comment/:id
router.put("/:id", async (req, res) => {
  const comments = await readDb(RESOURCE);

  const comment = comments.findIndex((item) => item.id === +req.params.id);

  if (!comment) {
    res.json({
      status: "error",
      message: "Resource not found",
    });
    return;
  }
  comment.comment = req.body.comment;
  await writeFile(RESOURCE, comments);

  res.json({
    status: "success",
    data: comment,
  });
});

// [DELETE] / comment/:id

router.delete("/:id", async (req, res) => {
  const comments = await readDb(RESOURCE);

  const index = comments.findIndex((item) => item.id === +req.params.id);

  if (index === -1) {
    res.json({
      status: "success",
      message: "Resource not found",
    });
    return;
  }
  comments.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
