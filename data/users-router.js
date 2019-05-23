const express = require("express");

const router = express.Router();
const db = require("../data/db.js");

router.get("/", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.json({ error: err, message: "Something broke" });
    });
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  db.findById(userId)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.json({ error: err, message: "Error finding the user" });
    });
});

router.post("/", (req, res) => {
  const userInfo = req.body;
  console.log("request body: ", userInfo);
  db.insert(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err, message: "Error adding the user" });
    });
});

router.put("/:id", async (req, res) => {
  const userInfo = req.body;
  try {
    const user = await db.update(req.params.id, userInfo);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "The user is something" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the user"
    });
  }
});

router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  db.remove(userId)
    .then(deleted => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ error: err, message: "Error deleting the user" });
    });
});

module.exports = router;
