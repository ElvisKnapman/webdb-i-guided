const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  // gte data from database and return it to the client

  // all database operations return a promise
  db("posts")
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("posts")
    .where({ id: id })
    .first()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  const postData = req.body;
  // validate data before inserting

  // then insert
  db("posts")
    .insert(postData, "id")
    .then(([id]) => {
      res.status(200).json(id);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("posts")
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json({ message: `Updated ${count} records` });
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete posts from where ...
  const { id } = req.params;
  db("posts")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ message: `deleted ${count} records` });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
